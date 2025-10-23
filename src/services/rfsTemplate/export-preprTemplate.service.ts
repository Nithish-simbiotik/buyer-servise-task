import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Workbook } from 'exceljs';
import { Response } from 'express';
import { ExportDto } from 'src/dto/export.dto';
import { RFSTemplateEntity } from 'src/entities/preprTemplate/preprTemplate.entity';
import { Environment } from 'src/env/environment';
import { RFSTemplateRepository } from 'src/repos/rfsTemplate.repository';
import { getConnection, getManager, In } from 'typeorm';
import { GetFlatCostService } from '../flat/getFlatCost.service';
import { GetFlatCurrencyService } from '../flat/getFlatCurrency.service';
import { GetFlatPurchaseOrgService } from '../flat/getFlatPurchaseOrg.service';
import { GetAllUsers } from '../user/getAllUser.service';
import { GetDepartmentService } from '../user/getDepartment.service';

@Injectable()
export class ExportPrePrTemplateService {
  constructor(
    @InjectRepository(RFSTemplateRepository)
    private rfsTemplateRepo: RFSTemplateRepository,
    private getPurchaseOrgService: GetFlatPurchaseOrgService,
    private getCostCenterService: GetFlatCostService,
    private getCurrencyService: GetFlatCurrencyService,
    private getDepartmentService: GetDepartmentService,
    private getUserService: GetAllUsers,
  ) {}

  public async exportPreprTemplate(res: Response, exportDto: ExportDto) {
    const workbook = new Workbook();
    workbook.creator = 'P2P Admin';
    workbook.created = new Date();
    const sheet = workbook.addWorksheet('Pre PR Template');
    // const sheetTeamMebers = workbook.addWorksheet("Team Members");
    sheet.columns = [
      { header: 'Template Name', key: 'templateName' },
      { header: 'Purchasing Org', key: 'purchasingOrgId' },
      { header: 'Purchasing Org Setting', key: 'purchasingOrg_readonly' },
      { header: 'Purchasing Org Visibility', key: 'purchasingOrg_visible' },
      { header: 'Department', key: 'departmentId' },
      { header: 'Department Setting', key: 'department_readonly' },
      { header: 'Department Visibility', key: 'department_visible' },
      // { header: "Urgent Job Readonly", key: "urgent_job_readonly" },
      { header: 'Urgent Job Visibility', key: 'urgent_job_visible' },
      { header: 'Urgent Job Option', key: 'urgentJob_option' },
      { header: 'Status', key: 'status' },
      { header: 'Base Currency ', key: 'baseCurrencyId' },
      { header: 'Base Currency Setting', key: 'baseCurrency_readonly' },
      { header: 'Base Currency Visibility', key: 'baseCurrency_visible' },
      { header: 'Cost Center ', key: 'costCenterId' },
      { header: 'Cost Center Setting', key: 'costCenter_readonly' },
      { header: 'Cost Center Visibility', key: 'costCenter_visible' },
      { header: 'Team Member', key: 'teamMembers' },
      { header: 'Approval Reminder', key: 'reminderAlert' },
      { header: 'Reminder Interval', key: 'reminderInterval' },
      { header: 'Approval Reminder Frequency', key: 'reminderFrequency' },
      { header: 'Approval Reminder Visibility', key: 'reminderAlertVisible' },
      { header: 'Enable Inactive Approval', key: 'notifyMe' },
      { header: 'Add Approval Routing', key: 'addApprovalRouting' },
      {
        header: 'Add Approval Routing Setting',
        key: 'approvalRouting_readonly',
      },
      {
        header: 'Add Approval Routing Visibility',
        key: 'approvalRouting_visible',
      },
      {
        header: 'Add Approval Routing Optional',
        key: 'approvalRouting_optional',
      },
      { header: 'Approver', key: 'levels' },
      { header: 'Created By', key: 'createdBy' },
      { header: 'Created Date', key: 'createdAt' },
      { header: 'Updated By', key: 'updatedBy' },
      { header: 'Updated Date', key: 'updatedAt' },
      { header: 'User Assigned', key: 'templateUser' },
    ];

    //  let pdata: any = await this.rfsTemplateRepo.findOne({ id: 48 }, {
    //  	relations: ['teamMembers', 'levels']
    //  });

    // let data: any = await this.rfsTemplateRepo.find({
    // 	relations: ['teamMembers', 'levels'],
    // });

    let data: any = await this.exportPreprTemplateList(exportDto);
    //return "Done";
    console.log(data, 'data');
    if (data) {
      for (var i = 0; i < data.length; i++) {
        // const manager = getManager(Environment.postgres.userdatabase);
        const manager = getConnection()
        const listData: any = await manager
          .createQueryBuilder()
          .select('*')
          .from('USER_PRE_PR', 'USER_PRE_PR')
          .where('"PRE_PR_TEMPLATE_ID" = :PRE_PR_TEMPLATE_ID', {
            PRE_PR_TEMPLATE_ID: data[i].id,
          })
          .getRawMany();
        // return listData;
        console.log(listData, 'user data');
        data[i].templateUser = listData;
      }
    }
    //return data;
    for (var i = 0; i < data.length; i++) {
      data[i].purchasingOrgId =
        await this.getPurchaseOrgService.getFlatPurchaseOrgNameById(
          Number(data[i].purchasingOrgId),
        );
      data[i].costCenterId =
        await this.getCostCenterService.getFlatCostCenterNameById(
          Number(data[i].costCenterId),
        );
      data[i].baseCurrencyId =
        await this.getCurrencyService.getFlatCurrenyNameById(
          Number(data[i].baseCurrencyId),
        );
      data[i].departmentId =
        await this.getDepartmentService.getDepartmentNameById(
          Number(data[i].departmentId),
        );
      let tmember = '';
      if (data[i].teamMembers)
        for (var lp = 0; lp < data[i].teamMembers.length; lp++) {
          let userId = await this.getUserService.getUserNameById(
            data[i].teamMembers[lp].userId,
          );
          console.log('T M M ', data[i].teamMembers[lp].userId, userId);
          if (userId != '')
            tmember +=
              userId + ' - ' + data[i].teamMembers[lp].viewStatus + ' , ';
        }
      data[i].teamMembers = tmember;
      let tempUserlist = '';
      for (let j = 0; j < data[i].templateUser.length; j++) {
        console.log(data[i].templateUser[j], 'Tuser');
        let newString = await this.getUserService.getUserIDbyPrimaryId(
          data[i].templateUser[j].userId,
        );
        if (newString) tempUserlist += newString + ',';
      }
      data[i].templateUser = tempUserlist;
    }
    // return "";
    await data.forEach(async (prePrTemplate) => {
      sheet.addRow({
        srNo: data.indexOf(prePrTemplate) + 1,
        templateName: prePrTemplate.templateName,
        purchasingOrgId: prePrTemplate.purchasingOrgId,
        purchasingOrg_readonly: prePrTemplate.purchasingOrg_readonly,
        purchasingOrg_visible: prePrTemplate.purchasingOrg_visible,
        departmentId: prePrTemplate.departmentId,
        department_readonly: prePrTemplate.department_readonly,
        department_visible: prePrTemplate.department_visible,
        // urgent_job_readonly: prePrTemplate.urgent_job_readonly,
        urgent_job_visible: prePrTemplate.urgent_job_visible,
        urgentJob_option: prePrTemplate.urgentJobOption,
        status: prePrTemplate.status,
        baseCurrency_readonly: prePrTemplate.baseCurrency_readonly,
        baseCurrencyId: prePrTemplate.baseCurrencyId,
        baseCurrency_visible: prePrTemplate.baseCurrency_visible,
        costCenter_readonly: prePrTemplate.costCenter_readonly,
        costCenterId: prePrTemplate.costCenterId,
        costCenter_visible: prePrTemplate.costCenter_visible,
        teamMembers: prePrTemplate.teamMembers,
        reminderAlert: prePrTemplate.reminderAlert,
        reminderInterval: prePrTemplate.reminderInterval,
        reminderFrequency: prePrTemplate.reminderFrequency,
        reminderAlertVisible: prePrTemplate.reminderAlert_visible,
        notifyMe: prePrTemplate.notifyMe,
        addApprovalRouting: prePrTemplate.addApprovalRouting,
        approvalRouting_readonly: prePrTemplate.approvalRouting_readonly,
        approvalRouting_visible: prePrTemplate.approvalRouting_visible,
        approvalRouting_optional: prePrTemplate.approvalRouting_optional,
        levels: prePrTemplate.levels.map((level) => level.userRole).toString(),

        createdBy: prePrTemplate.createdBy,
        createdAt: prePrTemplate.created_At,
        updatedBy: prePrTemplate.updatedBy,
        updatedAt: prePrTemplate.updated_At,
        templateUser: prePrTemplate.templateUser,
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

    res.attachment('prePrTemplates.xlsx');
    await workbook.xlsx.write(res);
  }

  public async exportPreprTemplateList(
    exportDto: ExportDto,
  ): Promise<RFSTemplateEntity[]> {
    let keyword = exportDto.keyword || '';
    let data = await this.rfsTemplateRepo
      .createQueryBuilder('PREPRTEMPLATE')
      .leftJoinAndSelect('PREPRTEMPLATE.levels', 'PREPRTEMPLATE_LEVELS')
      .leftJoinAndSelect(
        'PREPRTEMPLATE.teamMembers',
        'PREPRTEMPLATE_TEAMMEMBERS',
      )
      .orderBy('PREPRTEMPLATE.created_At', 'DESC')
      .where('PREPRTEMPLATE.templateName ILIKE :q', {
        q: `%$ {keyword}%`,
      })
      .orWhere(' cast(PREPRTEMPLATE.id as text) ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PREPRTEMPLATE.createdBy ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PREPRTEMPLATE.updatedBy ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PREPRTEMPLATE.departmentName ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PREPRTEMPLATE.status ILIKE :q', {
        q: `%${keyword}%`,
      });
    const data1 = data.getMany();
    return data1;
    // .leftJoinAndSelect("supplier.role", "supplier_roles")
    // .leftJoinAndSelect("supplier.industry_category", "industry_category")
    // .leftJoinAndSelect("supplier.supplier_tags", "supplier_tags")
    //.where(`company_name ILIKE :q`, { q: `%${keyword}%` })
    // .orWhere(`vendor_code ILIKE :q`, { q: `%${keyword}%` })
    // .orWhere(`phone_number ILIKE :q`, {
    // 	q: `%${keyword}%`,
    // })
    // .orWhere(`communication_email_address ILIKE :q`, {
    // 	q: `%${keyword}%`,
    // })
    // .orWhere(`supplier.status LIKE :q`, { q: `%${keyword}%` })
    // .orWhere(`window_person_name ILIKE :q`, {
    // 	q: `%${keyword}%`,
    // })
    // .orWhere(`supplier_evaluation_status ILIKE :q`, {
    // 	q: `%${keyword}%`,
    // })
    // .orderBy("supplier.created_at", "DESC")
    //.getMany();
  }
  public async exportPreprTemplateFormat(res: Response) {
    const workbook = new Workbook();
    workbook.creator = 'P2P Admin';
    workbook.created = new Date();
    const sheet = workbook.addWorksheet('Pre PR Template');
    // const sheetTeamMebers = workbook.addWorksheet("Team Members");
    sheet.columns = [
      { header: 'Template Name', key: 'templateName' },
      { header: 'Purchasing Org', key: 'purchasingOrgId' },
      { header: 'Purchasing Org Setting', key: 'purchasingOrg_readonly' },
      { header: 'Purchasing Org  Visibility', key: 'purchasingOrg_visible' },
      { header: 'Department', key: 'departmentId' },
      { header: 'Department Setting', key: 'department_readonly' },
      { header: 'Department Visibility', key: 'department_visible' },
      // { header: "Urgent Job Readonly", key: "urgent_job_readonly" },
      { header: 'Urgent Job Visibility', key: 'urgent_job_visible' },
      { header: 'Urgent Job Option', key: 'urgentJob_option' },
      { header: 'Status', key: 'status' },
      { header: 'Base Currency ', key: 'baseCurrencyId' },
      { header: 'Base Currency Setting', key: 'baseCurrency_readonly' },
      { header: 'Base Currency Visibility', key: 'baseCurrency_visible' },
      { header: 'Cost Center ', key: 'costCenterId' },
      { header: 'Cost Center Setting', key: 'costCenter_readonly' },
      { header: 'Cost Center Visibility', key: 'costCenter_visible' },
      { header: 'Team Member', key: 'teamMembers' },
      { header: 'Approval Reminder', key: 'reminderAlert' },
      { header: 'Reminder Interval', key: 'reminderInterval' },
      { header: 'Approval Reminder Frequency', key: 'reminderFrequency' },
      { header: 'Approval Reminder Visibility', key: 'reminderAlertVisible' },
      { header: 'Enable Inactive Approval', key: 'notifyMe' },
      { header: 'Add Approval Routing', key: 'addApprovalRouting' },
      {
        header: 'Add Approval Routing Setting',
        key: 'approvalRouting_readonly',
      },
      {
        header: 'Add Approval Routing Visibility',
        key: 'approvalRouting_visible',
      },
      {
        header: 'Add Approval Routing Optional',
        key: 'approvalRouting_optional',
      },
      { header: 'Approver', key: 'levels' },
      { header: 'Created By', key: 'createdBy' },
      { header: 'Created Date', key: 'createdAt' },
      { header: 'Updated By', key: 'updatedBy' },
      { header: 'Updated Date', key: 'updatedAt' },
      { header: 'User Assigned', key: 'templateUser' },
    ];

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

    res.attachment('prePrTemplates.xlsx');
    await workbook.xlsx.write(res);
  }
}
