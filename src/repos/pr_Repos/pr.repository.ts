import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { CreatePRDto, UpdatePrDto } from "src/dto/pr/create-pr.dto";
import { PREntity } from "src/entities/pr/pr.entity";
import { PrStatus } from "src/enum/pr/pr-status.enum";
import { ViewerType } from "src/enum/prTemplate/prTemplates.enum";
import { JwtPayload } from "src/interface/user/jwt.payload.interface";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PREntity)
export class PRRepository extends Repository<PREntity> {

  constructor() {
    super();
  }

  async createPr(dto: CreatePRDto) {
    let pr = this.create(dto);
    return await pr.save();
  }

  async updatePr(updateDto: UpdatePrDto) {
    let updatePr = this.create(updateDto);
    return await updatePr.save();
  }

  async changeFADNo(user: JwtPayload, prId: number, fadNumber: string) {
    let pr = await this.findOne(prId);
    if (pr.prStatus == PrStatus.ECAPEX_PENDING) {
      let ecapexApprover = pr.ecapexApprovalRoute.find(x => x.users.map(x => x.userId).includes(user.userId));
      if (!ecapexApprover) {
        throw new UnauthorizedException();
      }
      if (!ecapexApprover.allowToEditPR) {
        throw new UnauthorizedException(`You are not allowed to edit PR`);
      }
    } else if (pr.prStatus == PrStatus.PR_PENDING) {
      let prApprover = pr.approvalRoute.find(x => x.users.map(x => x.userId).includes(user.userId));
      if (!prApprover) {
        throw new UnauthorizedException();
      }
      if (!prApprover.allowToEditPR) {
        throw new UnauthorizedException(`You are not allowed to edit PR`);
      }
    } else {
      throw new UnauthorizedException();
    }
    pr.fadNumber = fadNumber;
    return await this.save(pr);
  }

  async changeBudgetRefCodeNo(user: JwtPayload, prId: number, budgetRefCode: string) {
    let pr = await this.findOne(prId);
    if (pr.prStatus == PrStatus.ECAPEX_PENDING) {
      let ecapexApprover = pr.ecapexApprovalRoute.find(x => x.users.map(x => x.userId).includes(user.userId));
      if (!ecapexApprover) {
        throw new UnauthorizedException();
      }
      if (!ecapexApprover.allowToEditPR) {
        throw new UnauthorizedException(`You are not allowed to edit PR`);
      }
    } else if (pr.prStatus == PrStatus.PR_PENDING) {
      let prApprover = pr.approvalRoute.find(x => x.users.map(x => x.userId).includes(user.userId));
      if (!prApprover) {
        throw new UnauthorizedException();
      }
      if (!prApprover.allowToEditPR) {
        throw new UnauthorizedException(`You are not allowed to edit PR`);
      }
    } else {
      throw new UnauthorizedException();
    }
    pr.budgetRefCode = budgetRefCode;
    return await this.save(pr);
  }

  async changePRStatus(prId: number, prStatus: PrStatus) {
    let pr = await this.findOne(prId);
    pr.prStatus = prStatus;
    return await this.save(pr);
  }

  async createPrFromECAPEX(user: JwtPayload, prId: number) {
    let pr = await this.findOne(prId);

    // check is user pr team member.
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

    // check if ecapex is approved.
    if (pr.prStatus != PrStatus.ECAPEX_APPROVED) {
      throw new BadRequestException('ECAPEx is not approved yet');
    }

    let newPrIds: number[] = [];
    for (let index = 0; index < pr.rfxSupplier.length; index++) {
      const element = pr.rfxSupplier[index];
      element.id = null;
      let newPr = this.create(pr);
      newPr.prStatus = PrStatus.PR_DRAFT;
      newPr.id = null;
      newPr.rfxSupplier = [element];

      if (newPr.justificationDocuments) {
        for (let index = 0; index < newPr.justificationDocuments.length; index++) {
          newPr.justificationDocuments[index].id = null;
        }
      }

      if (newPr.excoDocument) {
        for (let index = 0; index < newPr.excoDocument.length; index++) {
          newPr.excoDocument[index].id = null;
        }
      }

      if (newPr.otherDocument) {
        for (let index = 0; index < newPr.otherDocument.length; index++) {
          newPr.otherDocument[index].id = null;
        }
      }

      if (newPr.approvalRoute) {
        for (let index = 0; index < newPr.approvalRoute.length; index++) {
          newPr.approvalRoute[index].id = null;
          for (let i = 0; i < newPr.approvalRoute[index].users.length; i++) {
            newPr.approvalRoute[index].users[i].id = null;
          }
        }
      }

      if (newPr.ecapexApprovalRoute) {
        for (let index = 0; index < newPr.ecapexApprovalRoute.length; index++) {
          newPr.ecapexApprovalRoute[index].id = null;
          for (let i = 0; i < newPr.ecapexApprovalRoute[index].users.length; i++) {
            newPr.ecapexApprovalRoute[index].users[i].id = null;
          }
        }
      }

      if (newPr.teamMembers) {
        for (let index = 0; index < newPr.teamMembers.length; index++) {
          newPr.teamMembers[index].id = null;
        }
      }

      newPr.createdBy = user.userId;
      newPr.updatedBy = 0;
      newPr = await this.save(newPr);
      newPrIds.push(newPr.id);
    }
    return newPrIds;
  }
}