import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePRDto, UpdatePrDto } from 'src/dto/pr/create-pr.dto';
import { ECAPEXBudgetRefCodeDto } from 'src/dto/pr/ecapex-budget-ref-code.dto';
import { ECAPEXFADNoDto } from 'src/dto/pr/ecapex-fad-number.dto';
import { PRApproverDto } from 'src/dto/pr/pr-approver.dto';
import { PRListDto } from 'src/dto/pr/pr-list.dto';
import { PRApproverStatus } from 'src/enum/pr/pr-approver-status.enum';
import { PrStatus } from 'src/enum/pr/pr-status.enum';
import { PrType, ViewerType } from 'src/enum/prTemplate/prTemplates.enum';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { PRRepository } from 'src/repos/pr_Repos/pr.repository';
import { PrApprovalRouteRepository } from 'src/repos/pr_Repos/pr_approver.repository';
import { PrECAPEXApprovalRouteRepository } from 'src/repos/pr_Repos/pr_ecapex_approver.repository';
import { Workbook } from 'exceljs';
import { isEmpty } from 'class-validator';
import { Response } from 'express';
import { PrECAPEXApprovalRouteEntity } from 'src/entities/pr/pr-capex-approval.entity';
import { PrApprovalRouteEntity } from 'src/entities/pr/pr-approval-route.entity';
import { MailService } from '../mail/mailservice.service';
const moment = require('moment');

@Injectable()
export class PrService {
  constructor(
    @InjectRepository(PRRepository)
    private readonly prRepo: PRRepository,
    @InjectRepository(PrECAPEXApprovalRouteRepository)
    private readonly prECAPEXApprovalRouteRepo: PrECAPEXApprovalRouteRepository,
    @InjectRepository(PrApprovalRouteRepository)
    private readonly prApprovalRouteRepo: PrApprovalRouteRepository,
    private mailService: MailService,
  ) { }

  async createPr(user: JwtPayload, createPrDto: CreatePRDto) {
    createPrDto.createdBy = user.userId;
    let pr = await this.prRepo.createPr(createPrDto);
    return pr;
  }

  async updatePr(user: JwtPayload, updatePrDto: UpdatePrDto) {
    let pr = await this.prRepo.findOne(updatePrDto.id);
    let isPrTeamMember = false;
    if (pr.teamMembers) {
      isPrTeamMember = pr.teamMembers
        .filter(x => x.viewStatus == ViewerType.ASSOCIATE_OWNER)
        .map(x => x.userId)
        .includes(user.userId);
    }
    if (pr.createdBy == user.userId) {
      isPrTeamMember = true;
    }
    if (!isPrTeamMember) {
      throw new UnauthorizedException();
    }

    if (pr.prStatus == PrStatus.ECAPEX_PENDING) {
      let ecapexFirstLevelApprover = pr.ecapexApprovalRoute.find(x => x.level == 1);
      if (ecapexFirstLevelApprover) {
        if (ecapexFirstLevelApprover.status == PRApproverStatus.Approved) {
          throw new BadRequestException(`PR is approved by first ecapex approver. So PR can't be updated`);
        }
      }
    } else if (pr.prStatus == PrStatus.PR_PENDING) {
      let prFirstLevelApprover = pr.approvalRoute.find(x => x.level == 1);
      if (prFirstLevelApprover) {
        if (prFirstLevelApprover.status == PRApproverStatus.Approved) {
          throw new BadRequestException(`PR is approved by first approver. So PR can't be updated`);
        }
      }
    } else {
      let isAllowedToEdit = false;
      if (pr.prStatus == PrStatus.ECAPEX_DRAFT) {
        isAllowedToEdit = true;
      }
      if (pr.prStatus == PrStatus.PR_DRAFT) {
        isAllowedToEdit = true;
      }
      if (!isAllowedToEdit) {
        throw new BadRequestException('PR cannot be editable');
      }
    }

    updatePrDto.updatedBy = user.userId;
    pr = await this.prRepo.updatePr(updatePrDto);
    return pr;
  }

  async getPrDetails(user: JwtPayload, prId: number) {
    let pr = await this.prRepo.findOne(prId);
    let isPrTeamMember = false;
    if (pr.teamMembers) {
      isPrTeamMember = pr.teamMembers
        .filter(x => x.viewStatus == ViewerType.ASSOCIATE_OWNER)
        .map(x => x.userId)
        .includes(user.userId);
    }
    if (pr.createdBy == user.userId) {
      isPrTeamMember = true;
    }
    if (!isPrTeamMember) {
      throw new UnauthorizedException();
    }
    return pr;
  }

  async ecapexForApproval(user: JwtPayload, prId: number) {
    let pr = await this.prRepo.findOne(prId);
    if (pr.prType != PrType.CAPEX) {
      throw new BadRequestException();
    }
    let isPrTeamMember = false;
    if (pr.teamMembers) {
      isPrTeamMember = pr.teamMembers
        .filter(x => x.viewStatus == ViewerType.ASSOCIATE_OWNER)
        .map(x => x.userId)
        .includes(user.userId);
    }
    if (pr.createdBy == user.userId) {
      isPrTeamMember = true;
    }
    if (!isPrTeamMember) {
      throw new UnauthorizedException();
    }

    //TODO: send mail to first approver
    pr.ecapexApprovalRoute[0].users.forEach(x => {
      this.mailService.sendMailToEcapexApprover(x.user.email_address, '', x.user.name, pr.id, `${pr.id}`);
    });
    return this.prRepo.changePRStatus(prId, PrStatus.ECAPEX_PENDING);
  }

  async prForApproval(user: JwtPayload, prId: number) {
    let pr = await this.prRepo.findOne(prId);
    if (pr.prType == PrType.CAPEX && isEmpty(pr.parentPRId)) {
      throw new BadRequestException();
    }
    let isPrTeamMember = false;
    if (pr.teamMembers) {
      isPrTeamMember = pr.teamMembers
        .filter(x => x.viewStatus == ViewerType.ASSOCIATE_OWNER)
        .map(x => x.userId)
        .includes(user.userId);
    }
    if (pr.createdBy == user.userId) {
      isPrTeamMember = true;
    }
    if (!isPrTeamMember) {
      throw new UnauthorizedException();
    }
    return this.prRepo.changePRStatus(prId, PrStatus.PR_PENDING);
  }

  async ecapexApproval(
    user: JwtPayload,
    ecapexApprovalRouteId: number,
    prId: number,
    prApproverDto: PRApproverDto) {
    let pr = await this.prRepo.findOne(prId);

    if (pr.prStatus == PrStatus.ECAPEX_CANCELLED) {
      throw new BadRequestException('ECAPEx PR is cancelled');
    } else if (pr.prStatus == PrStatus.ECAPEX_DRAFT) {
      throw new BadRequestException('ECAPEx is in draft state');
    } else if (pr.prStatus == PrStatus.ECAPEX_APPROVED) {
      throw new BadRequestException('ECAPEx is already approved');
    } else if (pr.prStatus != PrStatus.ECAPEX_PENDING) {
      throw new BadRequestException();
    }

    let approvalRoute: PrECAPEXApprovalRouteEntity;
    if (prApproverDto.approve) {
      approvalRoute = await this.prECAPEXApprovalRouteRepo.approveECAPEX(user.userId, ecapexApprovalRouteId, prApproverDto.approverRemarks);

      //TODO: send mail to next approver.
      let currentApprovalRouteIndex = pr.ecapexApprovalRoute.findIndex(x => x.id == ecapexApprovalRouteId);
      if (currentApprovalRouteIndex != -1 && currentApprovalRouteIndex < (pr.ecapexApprovalRoute.length - 1)) {
        let nextApproverRoute = pr.ecapexApprovalRoute[currentApprovalRouteIndex + 1];
        nextApproverRoute.users.forEach(x => {
          this.mailService.sendMailToEcapexApprover(x.user.email_address, '', x.user.name, pr.id, `${pr.id}`);
        });
      }

      //TODO: send mail to requester/creator for current approver action.
      this.mailService.sendMailToCreatorAfterEcapexApproval(pr.creator.email_address, '', pr.creator.name, pr.id, `${pr.id}`);

      // if last approver approve the eCapex change status automatically.
      let sortECAPExApproverRoute = pr.ecapexApprovalRoute.sort((a, b) => {
        return a.level - b.level;
      });
      let isLastApprover = sortECAPExApproverRoute[sortECAPExApproverRoute.length - 1].users.map(x => x.userId).includes(user.userId);
      if (isLastApprover) {
        await this.prRepo.changePRStatus(prId, PrStatus.ECAPEX_APPROVED);
      }
    } else {
      approvalRoute = await this.prECAPEXApprovalRouteRepo.rejectECAPEX(user.userId, ecapexApprovalRouteId, prApproverDto.approverRemarks);

      //TODO: send mail to requester approver.
      this.mailService.sendMailToCreatorAfterEcapexRejection(pr.creator.email_address, '', pr.creator.name, pr.id, `${pr.id}`);

      // reset approval route status to pending
      for (let index = 0; index < pr.ecapexApprovalRoute.length; index++) {
        const element = pr.ecapexApprovalRoute[index];
        element.status = PRApproverStatus.PENDING;
      }
      await this.prRepo.save(pr);
    }
    return approvalRoute;
  }

  async prApproval(
    user: JwtPayload,
    prApprovalRouteId: number,
    prId: number,
    prApproverDto: PRApproverDto
  ) {
    let pr = await this.prRepo.findOne(prId);
    if (pr.prStatus == PrStatus.PR_CANCELLED) {
      throw new BadRequestException('PR is cancelled');
    } else if (pr.prStatus == PrStatus.PR_DRAFT) {
      throw new BadRequestException('PR is in draft state');
    } else if (pr.prStatus == PrStatus.PR_FINISHED) {
      throw new BadRequestException('PR is already approved');
    } else if (pr.prStatus != PrStatus.PR_PENDING) {
      throw new BadRequestException();
    }

    let approvalRoute: PrApprovalRouteEntity;
    if (prApproverDto.approve) {
      approvalRoute = await this.prApprovalRouteRepo.approvePR(user.userId, prApprovalRouteId, prApproverDto.approverRemarks);

      //TODO: send mail to second approver.
      let currentApprovalRouteIndex = pr.approvalRoute.findIndex(x => x.id == prApprovalRouteId);
      if (currentApprovalRouteIndex != -1 && currentApprovalRouteIndex < (pr.approvalRoute.length - 1)) {
        let nextApproverRoute = pr.approvalRoute[currentApprovalRouteIndex + 1];
        nextApproverRoute.users.forEach(x => {
          this.mailService.sendMailToPRApprover(x.user.email_address, '', x.user.name, pr.id);
        });
      }

      //TODO: send mail to requester for current approver action.
      this.mailService.sendMailToCreatorAfterPRApproval(pr.creator.email_address, '', pr.creator.name, pr.id, `${pr.id}`);

      // if last approver changes PR Status automatically.
      let sortPRApproverRoute = pr.approvalRoute.sort((a, b) => {
        return a.level - b.level;
      });
      let isLastApprover = sortPRApproverRoute[sortPRApproverRoute.length - 1].users.map(x => x.userId).includes(user.userId);
      if (isLastApprover) {
        await this.prRepo.changePRStatus(prId, PrStatus.PR_FINISHED);
      }
    } else {
      approvalRoute = await this.prApprovalRouteRepo.rejectPR(user.userId, prApprovalRouteId, prApproverDto.approverRemarks);

      //TODO: send mail to requester approver.
      this.mailService.sendMailToCreatorAfterPRRejection(pr.creator.email_address, '', pr.creator.name, pr.id, `${pr.id}`);

      // reset approval route status to pending
      for (let index = 0; index < pr.approvalRoute.length; index++) {
        const element = pr.approvalRoute[index];
        element.status = PRApproverStatus.PENDING;
      }
      await this.prRepo.save(pr);
    }
    return approvalRoute;
  }

  async changeFADNo(user: JwtPayload, prId: number, ecapexFADNoDto: ECAPEXFADNoDto) {
    let pr = await this.prRepo.changeFADNo(user, prId, ecapexFADNoDto.fadNumber);
    return pr;
  }

  async changeBudgetRefCode(user: JwtPayload, prId: number, budgetRefCodeDto: ECAPEXBudgetRefCodeDto) {
    let pr = await this.prRepo.changeBudgetRefCodeNo(user, prId, budgetRefCodeDto.budgetRefCode);
    return pr;
  }

  async getPrList(userId: number, pagingDto: PRListDto, withoutPaging?: boolean) {
    const searchKey: string = pagingDto.keyword || '';
    let fromDate: Date;
    let toDate: Date;
    if (pagingDto.fromDate) {
      fromDate = new Date(pagingDto.fromDate)
    }
    if (pagingDto.toDate) {
      toDate = new Date(pagingDto.toDate)
    }
    let data = this.prRepo
      .createQueryBuilder('pr')
      .leftJoinAndSelect('pr.approvalRoute', 'aprvl')
      .leftJoinAndSelect('aprvl.users', 'aprvlusers')
      .leftJoinAndSelect('aprvlusers.user', 'approvalUser')
      .leftJoinAndSelect('pr.ecapexApprovalRoute', 'ecapexRouteAprvl')
      .leftJoinAndSelect('ecapexRouteAprvl.users', 'ecapexaprvlusers')
      .leftJoinAndSelect('ecapexaprvlusers.user', 'ecapexapprovalUser')
      .leftJoinAndSelect('pr.teamMembers', 'tm')
      .leftJoinAndSelect('pr.creator', 'creator')
      .leftJoinAndSelect('pr.rfxSupplier', 'supplier')
      .where("(pr.referenceNumber ilike :q)  OR (pr.prStatus ilike :q)", { q: `%${searchKey}%` })
      .andWhere(`(pr.createdBy=:userId) OR (tm.userId=:tmUser)`, {
        userId: userId,
        tmUser: userId
      })
      .select([
        "pr.referenceNumber",
        "aprvl",
        "ecapexRouteAprvl",
        "tm",
        "creator",
        "pr.prStatus",
        "pr.created_At",
        "pr.baseCurrency",
        "pr.urgentJob",
        "pr.description",
        "pr.id",
        "supplier",
        "aprvlusers",
        "approvalUser.name",
        "approvalUser.user_id",
        "ecapexaprvlusers",
        "ecapexapprovalUser.name",
        "ecapexapprovalUser.user_id",
      ])
      .orderBy('pr.created_At', 'DESC')
    if (pagingDto.fromDate) {
      data.where("(pr.created_At >= :startDate) AND (rfx.created_At <= :endDate)", { startDate: fromDate, endDate: toDate })
    }
    const total = await data.getCount();
    const page: number = pagingDto.page || 1;
    const limit: number = pagingDto.size || 5;
    if (!withoutPaging) {
      data.offset((page - 1) * limit).limit(limit);
    }
    const result = await data.getMany();
    // return result
    return {
      total: total,
      data: result
    };
  }

  async exportPRList(user: JwtPayload, prListDto: PRListDto, res: Response) {
    const workbook = new Workbook();
    workbook.creator = 'P2P Admin';
    workbook.created = new Date();
    const sheet = workbook.addWorksheet('Users');
    sheet.columns = [
      { header: 'Urgent Job', key: 'urgent_job' },
      { header: 'Reference Number', key: 'ref_no' },
      { header: 'Title', key: 'title' },
      { header: 'Supplier Name', key: 'supplier_name' },
      { header: 'eCAPEX No', key: 'ecapex_no' },
      { header: 'PR ID', key: 'pr_id' },
      { header: 'Created By', key: 'created_by' },
      { header: 'Created Date', key: 'created_date' },
      { header: 'Status', key: 'status' },
      { header: 'Pending Approver', key: 'pending_approver' },
      { header: 'Approved Data', key: 'approved_date' },
      { header: 'Currency', key: 'currency' },
      { header: 'Grand Total', key: 'grand_total' },
    ];
    const prList = await this
      .getPrList(user.userId, prListDto);
    prList.data.forEach((pr) => {
      let pendingApprover = '';
      if (pr.prType == PrType.CAPEX) {
        let sortECAPExApproverRoute = pr.ecapexApprovalRoute.sort((a, b) => {
          return a.level - b.level;
        });
        let nextApprover = sortECAPExApproverRoute
          .find(x => isEmpty(x.status) || x.status == PRApproverStatus.PENDING);
        if (nextApprover) {
          pendingApprover = nextApprover.users.map(x => x.userId).toString(); // populate names
        }
      } else if (pr.prType == PrType.OPEX) {
        let sortPrApproverRoute = pr.approvalRoute.sort((a, b) => {
          return a.level - b.level;
        });
        let nextApprover = sortPrApproverRoute
          .find(x => isEmpty(x.status) || x.status == PRApproverStatus.PENDING);
        if (nextApprover) {
          pendingApprover = nextApprover.users.map(x => x.userId).toString(); // populate names
        }
      }

      let grandTotal = 0;
      grandTotal = pr.rfxSupplier.map(x => x.totalAmount).reduce((a, b) => a + b);

      sheet.addRow({
        urgent_job: pr.urgentJob,
        ref_no: pr.referenceNumber,
        title: pr.description,
        supplier_name: "[]",
        ecapex_no: pr.id,
        pr_id: pr.id,
        created_by: pr.creator.name,
        created_date: moment(pr.created_At)
          // .utcOffset(prListDto.offset)
          .format('YYYY/MM/DD hh:mm:ss a'),
        status: pr.prStatus,
        pending_approver: pendingApprover,
        approved_date: moment(pr.prApprovedDate)
          // .utcOffset(prListDto.offset)
          .format('YYYY/MM/DD hh:mm:ss a'),
        grand_total: grandTotal,
      });
    });
    sheet.columns.forEach((column) => {
      column.width = column.header.length < 20 ? 20 : column.header.length;
    });
    sheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        bgColor: { argb: 'fdf731' },
        fgColor: { argb: 'fdf731' },
      };
    });

    res.attachment('Department.xlsx');
    await workbook.xlsx.write(res);
  }

  async createPRFromECAPEx(user: JwtPayload, prId: number) {
    let newPrIds = await this.prRepo.createPrFromECAPEX(user, prId);
    return newPrIds;
  }
}
