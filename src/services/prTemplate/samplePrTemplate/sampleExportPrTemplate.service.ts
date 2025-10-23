import { Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { Response } from 'express';

@Injectable()
export class SampleExportPrTemplateService {
  constructor() {}

  public async samplePr(res: Response) {
    const workbook = new Workbook();
    workbook.creator = 'P2P Admin';
    workbook.created = new Date();
    const sheet = workbook.addWorksheet('samplePrTemplate');
    sheet.columns = [
      //general info
      { header: 'Template Name', key: 'templateName' },
      { header: 'Department', key: 'department' },
      { header: 'Status', key: 'prStatus' },
      { header: 'PR Type', key: 'prType' },
      { header: 'Enable CAPEX PR Workflow', key: 'enableCAPExPRWorkflow' },
      {
        header: 'Reason of Expenditure Visible',
        key: 'reasonForExpenditure',
      },
      { header: 'Title', key: 'prName' },
      { header: 'Title Read-Only Settings', key: 'prNameReadOnly' },
      { header: 'Delivery Address', key: 'deliveryAddress' },
      {
        header: 'Allow to Edit Bill of Quantity Setting',
        key: 'allowToEditOfBillQuantity',
      },
      { header: 'Base Currency', key: 'baseCurrency' },
      {
        header: 'Base Currency Read-Only Setting',
        key: 'baseCurrencyReadOnly',
      },
      { header: 'Decimal', key: 'decimal' },
      { header: 'Decimal Read-Only Setting', key: 'decimalReadOnly' },
      { header: 'Cost Center', key: 'costCenter' },
      {
        header: 'Cost Center Read-Only Setting',
        key: 'costCenterReadOnly',
      },
      {
        header: 'Cost Center Visible Setting',
        key: 'costCenterVisible',
      },
      { header: 'Purchasing Org', key: 'purchasingOrg' },
      {
        header: 'Purchasing Org Read-Only Setting',
        key: 'purchaseOrgReadOnly',
      },
      {
        header: 'Available Budget Visible Settings',
        key: 'availableBudgetVisible',
      },
      {
        header: 'Available Budget Read-Only Settings',
        key: 'availableBudgetReadOnly',
      },
      {
        header: 'Available Budget Optional Settings',
        key: 'availableBudgetOptional',
      },
      {
        header: 'Enable Budget Locking Settings',
        key: 'enableBudgetLocking',
      },

      //TeamMembers
      { header: 'Team Member Name + Authorization', key: 'teamMembers' },
      {
        header: 'Team Member Read-Only Settings',
        key: 'teamMemberReadOnly',
      },

      // APPROVAL
      {
        header: 'Approval - Approval Reminder Setting',
        key: 'enableApprovalReminder',
      },
      {
        header: 'Approval - Approval Reminder Visibility Setting',
        key: 'enableForALlApprovalLevelsVisible',
      },
      {
        header: 'Approval - Approval Reminder Interval',
        key: 'reminderEmailSentHours',
      },
      {
        header: 'Approval - Approval Reminder Frequency',
        key: 'maximumNumbersOfEmailReminder',
      },
      {
        header: 'Approval - Inactive Approval Setting',
        key: 'notifyRequestOwnerReminder',
      },
      {
        header: 'Approval - Allow to Add Additional Approver Setting',
        key: 'allowToAddAdditionalApproval',
      },
      {
        header: 'Approval - Approver Workflow Visibility Setting',
        key: 'allowToAddAdditionalApprovalVisible',
      },
      {
        header: 'Approval - Approver Workflow Read-Only Setting',
        key: 'allowToAddAdditionalApprovalReadOnly',
      },
      {
        header: 'Approval - Approver Workflow Optional Setting',
        key: 'allowToAddAdditionalApprovalOptional',
      },
      {
        header: 'Approval - Approver Name',
        key: 'approverName', // =============================================== wait
      },
      {
        header: 'Approval - Approver Allow to Escalate Setting',
        key: 'allowToEscalate',
      },
      {
        header: 'Approval - Approver Allow to Edit PR',
        key: 'allowToEditPR',
      },

      //eCAPEX
      {
        header: 'eCAPEX Approval - Approval Reminder Setting',
        key: 'enableApprovalReminderECAPEX',
      },
      {
        header: 'eCAPEX Approval - Approval Reminder Visibility Setting',
        key: 'enableForALlApprovalLevelsVisibleECAPEX',
      },
      {
        header: 'eCAPEX Approval - Approval Reminder Interval',
        key: 'reminderEmailSentHoursECAPEX',
      },
      {
        header: 'eCAPEX Approval - Approval Reminder Frequency',
        key: 'maximumNumbersOfEmailReminderECAPEX',
      },
      {
        header: 'eCAPEX Approval - Inactive Approval Setting',
        key: 'notifyRequestOwnerReminderECAPEX',
      },
      {
        header: 'eCAPEX Approval - Allow to Add Additional Approver Setting',
        key: 'allowToAddAdditionalApprovalECAPEX',
      },
      {
        header: 'eCAPEX Approval - Approver Workflow Visibility Setting',
        key: 'allowToAddAdditionalApprovalVisibleECAPEX',
      },
      {
        header: 'eCAPEX Approval - Approver Workflow Read-Only Setting',
        key: 'allowToAddAdditionalApprovalReadOnlyECAPEX',
      },
      {
        header: 'eCAPEX Approval - Approver Workflow Optional Setting',
        key: 'allowToAddAdditionalApprovalOptionalECAPEX',
      },
      {
        header: 'eCAPEX Approval - Approver Name',
        key: 'eCAPEXApproverName', // ======================================== wait
      },
      {
        header: 'eCAPEX Approval - Approver Allow to Escalate Setting',
        key: 'allowToEscalateECAPEX',
      },
      {
        header: 'eCAPEX Approval - Approver Allow to Edit PR',
        key: 'allowToEditPRECAPEX',
      },

      //Template User
      {
        header: 'Template User Name',
        key: 'templateUserName',
      },
      {
        header: 'Created By',
        key: 'createdBy',
      },
      {
        header: 'Created Date',
        key: 'createdDate',
      },
      {
        header: 'Modified By',
        key: 'modifiedBy',
      },
      {
        header: 'Modified Date',
        key: 'modifiedDate',
      },
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

    res.attachment('SamplePrTemplate.xlsx');
    await workbook.xlsx.write(res);
  }
}
