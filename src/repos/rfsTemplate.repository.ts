import { InjectRepository } from '@nestjs/typeorm';
import { CreateRFSDto } from 'src/dto/rfs/create-rfs.dto';
import { CreateRFSTemplateDto } from 'src/dto/rfsTemplate/create-rfsTemplate.dto';
import { PreprBillOfQuantityEntity } from 'src/entities/prepr/prepr-bill-of-quantity.entity';
import { RfsTemplateLevelsEntity } from 'src/entities/preprTemplate/preprTemplate_Level.entity';
import { RfsTemplateTeamMemberEntity } from 'src/entities/preprTemplate/preprTemplate_TeamMember.entity';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import {
  EntityRepository,
  getConnection,
  getManager,
  getRepository,
  Repository,
} from 'typeorm';
import { RFSTemplateEntity } from '../entities/preprTemplate/preprTemplate.entity';
import { RFSRepository } from './rfs.repository';
import { Response } from 'express';
import { GetFlatCostService } from 'src/services/flat/getFlatCost.service';
import { GetFlatPurchaseOrgService } from 'src/services/flat/getFlatPurchaseOrg.service';
import { GetFlatCurrencyService } from 'src/services/flat/getFlatCurrency.service';
import { GetFlatDepartmentService } from 'src/services/flat/getDepartment.service';
import { GetDepartmentService } from 'src/services/user/getDepartment.service';
import { Environment } from 'src/env/environment';
import { GetAllUsers } from 'src/services/user/getAllUser.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(RFSTemplateEntity)
export class RFSTemplateRepository extends Repository<RFSTemplateEntity> {
  constructor(private getDeparment: GetDepartmentService) {
    super();
  }

  async createRFSTemplate(
    user: JwtPayload,
    createRFSDto: CreateRFSTemplateDto,
    getDeparmentService: GetDepartmentService,
  ) {
    let rfsExists = await this.createQueryBuilder()
      .select('*')
      .where('LOWER(TRIM("templateName")) = Lower(Trim(:tname))', {
        tname: createRFSDto.templateName,
      })
      .getRawMany();
    console.log(rfsExists);

    if (rfsExists.length != 0) {
      throw new HttpException('Template Name Already Exists', HttpStatus.FOUND);
    }
    let rfs = new RFSTemplateEntity();
    rfs.templateName = createRFSDto.templateName;
    rfs.purchasingOrgId = createRFSDto.purchasingOrgId;
    rfs.purchasingOrg_readonly = createRFSDto.purchasingOrg_readonly;
    rfs.purchasingOrg_visible = createRFSDto.purchasingOrg_visible;
    rfs.departmentId = createRFSDto.departmentId;
    if (createRFSDto.departmentId)
      rfs.departmentName = await getDeparmentService.getDepartmentNameById(
        createRFSDto.departmentId,
      );
    rfs.department_readonly = createRFSDto.department_readonly;
    rfs.department_visible = createRFSDto.department_visible;
    rfs.baseCurrencyId = createRFSDto.baseCurrencyId;
    rfs.baseCurrency_readonly = createRFSDto.baseCurrency_readonly;
    rfs.baseCurrency_visible = createRFSDto.baseCurrency_visible;
    rfs.costCenterId = createRFSDto.costCenterId;
    rfs.costCenter_readonly = createRFSDto.costCenter_readonly;
    rfs.costCenter_visible = createRFSDto.costCenter_visible;
    rfs.status = createRFSDto.status;
    rfs.approvalRouting_readonly = createRFSDto.approvalRouting_readonly;
    rfs.approvalRouting_visible = createRFSDto.approvalRouting_visible;
    rfs.approvalRouting_optional = createRFSDto.approvalRouting_optional;
    rfs.reminderAlert = createRFSDto.reminderAlert;
    rfs.reminderFrequency = createRFSDto.reminderFrequency;
    rfs.reminderInterval = createRFSDto.reminderInterval;
    rfs.reminderAlert_visible = createRFSDto.reminderAlert_visible;
    rfs.notifyMe = createRFSDto.notifyMe;
    rfs.addApprovalRouting = createRFSDto.addApprovalRouting;
    rfs.urgentJobOption = createRFSDto.urgentJobOption;
    // rfs.urgent_job_readonly = createRFSDto.urgent_job_readonly;
    rfs.urgent_job_visible = createRFSDto.urgent_job_visible;
    rfs.reminderAlert_visible = createRFSDto.reminderAlert_visible;
    // rfs.createdBy = createRFSDto.createdBy;
    // rfs.updatedBy = createRFSDto.updatedBy;
    rfs.urgent_job_visible = createRFSDto.urgent_job_visible;
    rfs.createdBy = user.userName;
    // rfs.updatedBy = user.userName;

    if (createRFSDto.teamMembers) {
      let teamMembers = [];
      for await (const tItem of createRFSDto.teamMembers) {
        let teamMember = new RfsTemplateTeamMemberEntity();
        teamMember.userId = tItem.userId;
        teamMember.viewStatus = tItem.viewStatus;
        await getRepository(RfsTemplateTeamMemberEntity).save(teamMember);
        teamMembers.push(teamMember);
      }
      rfs.teamMembers = teamMembers;
    }

    if (createRFSDto.levels) {
      let levels = [];
      for await (const lItem of createRFSDto.levels) {
        let level = new RfsTemplateLevelsEntity();
        level.level = lItem.level;
        level.userRole = lItem.userRole;
        level.departmentId = createRFSDto.departmentId;
        level.userId = lItem.userId;
        level.levelName = lItem.levelName;
        await getRepository(RfsTemplateLevelsEntity).save(level);
        levels.push(level);
      }
      rfs.levels = levels;
    }

    console.log(rfs);
    const result = await this.save(rfs);
    return rfs;
  }

  async updateRFSTemplate(
    id: number,
    user: JwtPayload,
    createRFSDto: CreateRFSTemplateDto,
    getDeparmentService: GetDepartmentService,
  ) {
    let rfs = await this.findOne({ id: id });
    let rfsExists = await this.createQueryBuilder()
      .select('*')
      .where('LOWER(TRIM("templateName")) = Lower(Trim(:tname))', {
        tname: createRFSDto.templateName,
      })
      .getRawOne();
    console.log(rfsExists);
    if (rfsExists.id != id) {
      throw new HttpException('Template Name Already Exists', HttpStatus.FOUND);
    }

    rfs.templateName = createRFSDto.templateName;
    rfs.purchasingOrgId = createRFSDto.purchasingOrgId;
    rfs.purchasingOrg_readonly = createRFSDto.purchasingOrg_readonly;
    rfs.purchasingOrg_visible = createRFSDto.purchasingOrg_visible;
    rfs.departmentId = createRFSDto.departmentId;
    if (createRFSDto.departmentId)
      rfs.departmentName = await getDeparmentService.getDepartmentNameById(
        createRFSDto.departmentId,
      );
    rfs.department_readonly = createRFSDto.department_readonly;
    rfs.department_visible = createRFSDto.department_visible;
    rfs.baseCurrencyId = createRFSDto.baseCurrencyId;
    rfs.baseCurrency_readonly = createRFSDto.baseCurrency_readonly;
    rfs.baseCurrency_visible = createRFSDto.baseCurrency_visible;
    rfs.costCenterId = createRFSDto.costCenterId;
    rfs.costCenter_readonly = createRFSDto.costCenter_readonly;
    rfs.costCenter_visible = createRFSDto.costCenter_visible;
    rfs.status = createRFSDto.status;
    rfs.approvalRouting_readonly = createRFSDto.approvalRouting_readonly;
    rfs.approvalRouting_visible = createRFSDto.approvalRouting_visible;
    rfs.approvalRouting_optional = createRFSDto.approvalRouting_optional;
    rfs.reminderAlert = createRFSDto.reminderAlert;
    rfs.reminderFrequency = createRFSDto.reminderFrequency;
    rfs.reminderInterval = createRFSDto.reminderInterval;
    rfs.reminderAlert_visible = createRFSDto.reminderAlert_visible;
    rfs.notifyMe = createRFSDto.notifyMe;
    rfs.addApprovalRouting = createRFSDto.addApprovalRouting;
    rfs.urgentJobOption = createRFSDto.urgentJobOption;
    // rfs.urgent_job_readonly = createRFSDto.urgent_job_readonly;
    rfs.urgent_job_visible = createRFSDto.urgent_job_visible;
    rfs.reminderAlert_visible = createRFSDto.reminderAlert_visible;
    rfs.updatedBy = user.userName;
    // rfs.updated_At = new Date();
    rfs.urgent_job_visible = createRFSDto.urgent_job_visible;

    if (createRFSDto.teamMembers) {
      let teamMembers = [];
      for await (const tItem of createRFSDto.teamMembers) {
        let teamMember = new RfsTemplateTeamMemberEntity();
        teamMember.userId = tItem.userId;
        teamMember.viewStatus = tItem.viewStatus;
        await getRepository(RfsTemplateTeamMemberEntity).save(teamMember);
        teamMembers.push(teamMember);
      }
      rfs.teamMembers = teamMembers;
    }

    if (createRFSDto.levels) {
      let levels = [];
      for await (const lItem of createRFSDto.levels) {
        let level = new RfsTemplateLevelsEntity();
        level.level = lItem.level;
        level.userRole = lItem.userRole;
        level.departmentId = createRFSDto.departmentId;
        level.userId = lItem.userId;
        level.levelName = lItem.levelName;
        await getRepository(RfsTemplateLevelsEntity).save(level);
        levels.push(level);
      }
      rfs.levels = levels;
    }

    console.log(rfs);
    const result = await this.save(rfs);
    return rfs;
  }

  async copyRFSTemplate(
    id: number,
    user: JwtPayload,
    getDeparmentService: GetDepartmentService,
  ) {
    let rfsN = await this.findOne(
      { id: id },
      { relations: ['teamMembers', 'levels'] },
    );
    let rfs = new RFSTemplateEntity();
    rfs.templateName = rfsN.templateName;
    rfs.purchasingOrgId = rfsN.purchasingOrgId;
    rfs.purchasingOrg_readonly = rfsN.purchasingOrg_readonly;
    rfs.purchasingOrg_visible = rfsN.purchasingOrg_visible;
    rfs.departmentId = rfsN.departmentId;
    if (rfsN.departmentId)
      rfs.departmentName = await getDeparmentService.getDepartmentNameById(
        rfsN.departmentId,
      );
    rfs.department_readonly = rfsN.department_readonly;
    rfs.department_visible = rfsN.department_visible;
    rfs.baseCurrencyId = rfsN.baseCurrencyId;
    rfs.baseCurrency_readonly = rfsN.baseCurrency_readonly;
    rfs.baseCurrency_visible = rfsN.baseCurrency_visible;
    rfs.costCenterId = rfsN.costCenterId;
    rfs.costCenter_readonly = rfsN.costCenter_readonly;
    rfs.costCenter_visible = rfsN.costCenter_visible;
    rfs.status = rfsN.status;
    rfs.approvalRouting_readonly = rfsN.approvalRouting_readonly;
    rfs.approvalRouting_visible = rfsN.approvalRouting_visible;
    rfs.approvalRouting_optional = rfsN.approvalRouting_optional;
    rfs.reminderAlert = rfsN.reminderAlert;
    rfs.reminderFrequency = rfsN.reminderFrequency;
    rfs.reminderInterval = rfsN.reminderInterval;
    rfs.reminderAlert_visible = rfsN.reminderAlert_visible;
    rfs.notifyMe = rfsN.notifyMe;
    rfs.addApprovalRouting = rfsN.addApprovalRouting;
    rfs.urgentJobOption = rfsN.urgentJobOption;
    // rfs.urgent_job_readonly = rfsN.urgent_job_readonly;
    rfs.urgent_job_visible = rfsN.urgent_job_visible;
    rfs.createdBy = user.userName;
    // rfs.updatedBy = user.userName;
    rfs.urgent_job_visible = rfsN.urgent_job_visible;

    if (rfsN.teamMembers) {
      let teamMembers = [];
      for await (const tItem of rfsN.teamMembers) {
        let teamMember = new RfsTemplateTeamMemberEntity();
        teamMember.userId = tItem.userId;
        teamMember.viewStatus = tItem.viewStatus;
        await getRepository(RfsTemplateTeamMemberEntity).save(teamMember);
        teamMembers.push(teamMember);
      }
      rfs.teamMembers = teamMembers;
    }

    if (rfsN.levels) {
      let levels = [];
      for await (const lItem of rfsN.levels) {
        let level = new RfsTemplateLevelsEntity();
        level.level = lItem.level;
        level.userRole = lItem.userRole;
        level.departmentId = lItem.departmentId;
        level.userId = lItem.userId;
        level.levelName = lItem.levelName;
        await getRepository(RfsTemplateLevelsEntity).save(level);
        levels.push(level);
      }
      rfs.levels = levels;
    }

    console.log(rfs);
    const result = await this.save(rfs);
    return rfs;
  }

  async deleteRFSTemplate(id: number) {
    let rfs = await this.delete({ id: id });
    return rfs;
  }

  public async importPrePrTemplate(
    res: Response,
    downloaded,
    user: JwtPayload,
    getCostService: GetFlatCostService,
    getPurchaseOrgService: GetFlatPurchaseOrgService,
    getCurrencyService: GetFlatCurrencyService,
    getDeparmentService: GetDepartmentService,
    getUserService: GetAllUsers,
  ) {
    let preprTemplateList = [];
    console.log('Import Template Data');
    const array = JSON.parse(downloaded);

    try {
      for (let i = 1; i < array.length; i++) {
        let levelData = [];
        let levelId = 0;
        let newTemplate = new CreateRFSTemplateDto();
        console.log(array[i][1]);
        newTemplate.templateName = array[i][1];
        newTemplate.purchasingOrgId =
          await getPurchaseOrgService.getFlatPurchaseOrgIdByName(array[i][2]);
        newTemplate.purchasingOrg_readonly = array[i][3];
        newTemplate.purchasingOrg_visible = array[i][4];
        newTemplate.departmentId =
          await getDeparmentService.getDepartmentIdByName(array[i][5]);
        newTemplate.department_readonly = array[i][6];
        newTemplate.department_visible = array[i][7];
        // newTemplate.urgent_job_readonly = array[i][8];
        newTemplate.urgent_job_visible = array[i][8];
        newTemplate.urgentJobOption = array[i][9];
        newTemplate.status = array[i][10];
        newTemplate.baseCurrencyId =
          await getCurrencyService.getFlatCurrenyIdByName(array[i][11]);
        newTemplate.baseCurrency_readonly = array[i][12];
        newTemplate.baseCurrency_visible = array[i][13];
        newTemplate.costCenterId =
          await getCostService.getFlatCostCenterIdByName(array[i][14]);
        newTemplate.costCenter_readonly = array[i][15];
        newTemplate.costCenter_visible = array[i][16];
        // let tmember = JSON.parse(array[i][17]);
        //let tmember = array[i][17].trim();
        console.log('Array Data ', array[i][17].trim());
        let tmember = [];
        if (array[i][17])
          if (array[i][17].trim().endsWith(','))
            array[i][17] = array[i][17]
              .trim()
              .substr(0, array[i][17].trim().length - 1)
              .split(',');
          else array[i][17] = array[i][17].trim().split(',');
        else array[i][17] = [];
        tmember = array[i][17];
        console.log('Temebers ', tmember);
        let tmemberFinalData = [];
        for (let lp = 0; lp < tmember.length; lp++) {
          //console.log(tmember[lp])
          let tmemberProcessData = tmember[lp].trim().split('-');
          if (tmemberProcessData) {
            //console.log(tmemberProcessData);
            //   console.log(tmember[lp].userId,await getUserService.getUserIdByName(tmember[lp][0].trim()));
            //   //tmember[lp].userId = await getUserService.getUserIdByName(tmember[lp].name);
            let tuserId = await getUserService.getUserIdByName(
              tmemberProcessData[0].trim(),
            );
            let tviewer = tmemberProcessData[1].trim().trim();
            tmemberFinalData.push({ userId: tuserId, viewStatus: tviewer });
          }
        }
        newTemplate.teamMembers = tmemberFinalData;
        console.log('Tmembers ', tmemberFinalData);
        newTemplate.reminderAlert = array[i][18];
        newTemplate.reminderInterval = array[i][19];
        newTemplate.reminderFrequency = array[i][20];
        newTemplate.reminderAlert_visible = array[i][21];
        newTemplate.notifyMe = array[i][22];
        newTemplate.addApprovalRouting = array[i][23];
        newTemplate.approvalRouting_readonly = array[i][24];
        newTemplate.approvalRouting_visible = array[i][25];
        newTemplate.approvalRouting_optional = array[i][26];

        let linfo = array[i][27] ? array[i][27].split(',') : [];
        //console.log('Level Info : ',linfo);
        for (var k = 0; k < linfo.length; k++) {
          let level = new RfsTemplateLevelsEntity();
          level.level = k + 1;
          level.levelName = 'Level ' + 1;
          level.departmentId = newTemplate.departmentId;
          level.userRole = linfo[k];
          levelData.push(level);
        }

        //console.log('Level Data : ',levelData);
        newTemplate.levels = levelData;
        newTemplate.createdBy = array[i][28];
        newTemplate.updatedBy = array[i][29];
        let tdata = [];
        if (array[i][30])
          if (array[i][30].endsWith(','))
            array[i][30] = array[i][30]
              .substr(0, array[i][30].length - 1)
              .split(',');
          else array[i][30] = array[i][30].split(',');
        else array[i][30] = [];
        let tempU = [];
        for (var k = 0; k < array[i][30].length; k++) {
          tempU.push({
            userId: await getUserService.getPrimaryIdBUserId(array[i][30][k]),
          });
        }
        console.log('Import Template Data...');

        newTemplate.templateUser = tempU;
        console.log(newTemplate);
        try {
          let data = await this.findOne({
            templateName: newTemplate.templateName,
          });
          let cr: any;
          if (data)
            cr = await this.updateRFSTemplate(
              data.id,
              user,
              newTemplate,
              getDeparmentService,
            );
          else
            cr = await this.createRFSTemplate(
              user,
              newTemplate,
              getDeparmentService,
            );

          // const manager = getManager(Environment.postgres.userdatabase);
          const manager = getConnection()
          const listData = await manager
            .createQueryBuilder()
            .delete()
            .from('USER_PRE_PR', 'USER_PRE_PR')
            .where('"PRE_PR_TEMPLATE_ID" = :PRE_PR_TEMPLATE_ID', {
              PRE_PR_TEMPLATE_ID: cr.id,
            })
            .execute();

          for await (const u of newTemplate.templateUser) {
            console.log(u.userId, 'user');
            // const manager = getManager(Environment.postgres.userdatabase);
            const manager = getConnection()
            const listData = await manager
              .createQueryBuilder()
              .insert()
              .into('USER_PRE_PR')
              .values({
                PRE_PR_template_name: cr.templateName,
                userId: u.userId,
                PRE_PR_TEMPLATE_ID: cr.id,
              })
              .execute();
          }
          // const manager1 = getManager(Environment.postgres.userdatabase)
          // const listData1 = await manager
          // .createQueryBuilder()
          // .insert()
          // .into("USER_PRE_PR")
          // .values(
          //     { PRE_PR_template_name:data.templateName , userId:user.userId,PRE_PR_TEMPLATE_ID:data.id  },
          //  )
          // .execute();

          preprTemplateList.push(newTemplate);
        } catch (error) {
          console.log(error);
        }
      }
      res.send(preprTemplateList);
    } catch (error) {
      res.send(error);
    }
  }
}
