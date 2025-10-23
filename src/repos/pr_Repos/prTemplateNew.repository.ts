import { Response } from 'express';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { GetFlatCostService } from 'src/services/flat/getFlatCost.service';
import { GetFlatCurrencyService } from 'src/services/flat/getFlatCurrency.service';
import { GetFlatPurchaseOrgService } from 'src/services/flat/getFlatPurchaseOrg.service';
import { GetAllUsers } from 'src/services/user/getAllUser.service';
import { GetDepartmentService } from 'src/services/user/getDepartment.service';
import { EntityRepository, Repository } from 'typeorm';
import { PrTemplateEntity } from '../../entities/prTemplates/prTemplates.entity';
import { CreatePrTemplateDto } from 'src/dto/prTemplate/createPrTemplate.dto';

@EntityRepository(PrTemplateEntity)
export class PRTemplateRepository extends Repository<PrTemplateEntity> {
  constructor() {
    super();
  }

  async importSourcingTemplate(res: Response, downloaded, user: JwtPayload) {}

  //new

  public async importPrTemplate(
    res: Response,
    downloaded,
    user: JwtPayload,
    getCostService: GetFlatCostService,
    getPurchaseOrgService: GetFlatPurchaseOrgService,
    getCurrencyService: GetFlatCurrencyService,
    getDeparmentService: GetDepartmentService,
    getUserService: GetAllUsers,
  ) {
    let prTemplateList = [];
    console.log('Import Template Data');
    const array = JSON.parse(downloaded);

    console.log('downloaded', array);

    try {
      for (let i = 1; i < array.length; i++) {
        console.log('Array', array[i]);
        let levelData = [];
        let levelId = 0;
        let newTemplate = new CreatePrTemplateDto();
        console.log(array[i][1]);
        newTemplate.templateName = array[i][1];

        // newTemplate.purchasingOrgId =
        //   await getPurchaseOrgService.getFlatPurchaseOrgIdByName(array[i][2]);
        // newTemplate.purchasingOrg_readonly = array[i][3];
        // newTemplate.purchasingOrg_visible = array[i][4];
        // newTemplate.departmentId =
        //   await getDeparmentService.getDepartmentIdByName(array[i][5]);
        // newTemplate.department_readonly = array[i][6];
        // newTemplate.department_visible = array[i][7];
        // // newTemplate.urgent_job_readonly = array[i][8];
        // newTemplate.urgent_job_visible = array[i][8];
        // newTemplate.urgentJobOption = array[i][9];
        // newTemplate.status = array[i][10];
        // newTemplate.baseCurrencyId =
        //   await getCurrencyService.getFlatCurrenyIdByName(array[i][11]);
        // newTemplate.baseCurrency_readonly = array[i][12];
        // newTemplate.baseCurrency_visible = array[i][13];
        // newTemplate.costCenterId =
        //   await getCostService.getFlatCostCenterIdByName(array[i][14]);
        // newTemplate.costCenter_readonly = array[i][15];
        // newTemplate.costCenter_visible = array[i][16];
        // // let tmember = JSON.parse(array[i][17]);
        // //let tmember = array[i][17].trim();
        // console.log('Array Data ', array[i][17].trim());
        // let tmember = [];
        // if (array[i][17])
        //   if (array[i][17].trim().endsWith(','))
        //     array[i][17] = array[i][17]
        //       .trim()
        //       .substr(0, array[i][17].trim().length - 1)
        //       .split(',');
        //   else array[i][17] = array[i][17].trim().split(',');
        // else array[i][17] = [];
        // tmember = array[i][17];
        // console.log('Temebers ', tmember);
        // let tmemberFinalData = [];
        // for (let lp = 0; lp < tmember.length; lp++) {
        //   //console.log(tmember[lp])
        //   let tmemberProcessData = tmember[lp].trim().split('-');
        //   if (tmemberProcessData) {
        //     //console.log(tmemberProcessData);
        //     //   console.log(tmember[lp].userId,await getUserService.getUserIdByName(tmember[lp][0].trim()));
        //     //   //tmember[lp].userId = await getUserService.getUserIdByName(tmember[lp].name);
        //     let tuserId = await getUserService.getUserIdByName(
        //       tmemberProcessData[0].trim(),
        //     );
        //     let tviewer = tmemberProcessData[1].trim().trim();
        //     tmemberFinalData.push({ userId: tuserId, viewStatus: tviewer });
        // }
        // }
        // newTemplate.teamMembers = tmemberFinalData;
        // console.log('Tmembers ', tmemberFinalData);
        // newTemplate.reminderAlert = array[i][18];
        // newTemplate.reminderInterval = array[i][19];
        // newTemplate.reminderFrequency = array[i][20];
        // newTemplate.reminderAlert_visible = array[i][21];
        // newTemplate.notifyMe = array[i][22];
        // newTemplate.addApprovalRouting = array[i][23];
        // newTemplate.approvalRouting_readonly = array[i][24];
        // newTemplate.approvalRouting_visible = array[i][25];
        // newTemplate.approvalRouting_optional = array[i][26];

        // let linfo = array[i][27] ? array[i][27].split(',') : [];
        // //console.log('Level Info : ',linfo);
        // for (var k = 0; k < linfo.length; k++) {
        //   let level = new RfsTemplateLevelsEntity();
        //   level.level = k + 1;
        //   level.levelName = 'Level ' + 1;
        //   level.departmentId = newTemplate.departmentId;
        //   level.userRole = linfo[k];
        //   levelData.push(level);
        // }

        // //console.log('Level Data : ',levelData);
        // newTemplate.levels = levelData;
        // newTemplate.createdBy = array[i][28];
        // newTemplate.updatedBy = array[i][29];
        // let tdata = [];
        // if (array[i][30])
        //   if (array[i][30].endsWith(','))
        //     array[i][30] = array[i][30]
        //       .substr(0, array[i][30].length - 1)
        //       .split(',');
        //   else array[i][30] = array[i][30].split(',');
        // else array[i][30] = [];
        // let tempU = [];
        // for (var k = 0; k < array[i][30].length; k++) {
        //   tempU.push({
        //     userId: await getUserService.getPrimaryIdBUserId(array[i][30][k]),
        //   });
        // }
        // console.log('Import Template Data...');

        // newTemplate.templateUser = tempU;
        // console.log(newTemplate);
        // try {
        //   let data = await this.findOne({
        //     templateName: newTemplate.templateName,
        //   });
        //   let cr: any;
        //   if (data)
        //     cr = await this.updateRFSTemplate(
        //       data.id,
        //       user,
        //       newTemplate,
        //       getDeparmentService,
        //     );
        //   else
        //     cr = await this.createRFSTemplate(
        //       user,
        //       newTemplate,
        //       getDeparmentService,
        //     );

        //   const manager = getManager(Environment.postgres.userdatabase);
        //   const listData = await manager
        //     .createQueryBuilder()
        //     .delete()
        //     .from('USER_PRE_PR', 'USER_PRE_PR')
        //     .where('"PRE_PR_TEMPLATE_ID" = :PRE_PR_TEMPLATE_ID', {
        //       PRE_PR_TEMPLATE_ID: cr.id,
        //     })
        //     .execute();

        //   for await (const u of newTemplate.templateUser) {
        //     console.log(u.userId, 'user');
        //     const manager = getManager(Environment.postgres.userdatabase);
        //     const listData = await manager
        //       .createQueryBuilder()
        //       .insert()
        //       .into('USER_PRE_PR')
        //       .values({
        //         PRE_PR_template_name: cr.templateName,
        //         userId: u.userId,
        //         PRE_PR_TEMPLATE_ID: cr.id,
        //       })
        //       .execute();
      }
      //   // const manager1 = getManager(Environment.postgres.userdatabase)
      //   // const listData1 = await manager
      //   // .createQueryBuilder()
      //   // .insert()
      //   // .into("USER_PRE_PR")
      //   // .values(
      //   //     { PRE_PR_template_name:data.templateName , userId:user.userId,PRE_PR_TEMPLATE_ID:data.id  },
      //   //  )
      //   // .execute();

      // prTemplateList.push(newTemplate);
    } catch (error) {
      console.log(error);
    }
    //       }
    //       res.send(prTemplateList);
    //     } catch (error) {
    //       res.send(error);
    //     }
  }
}
