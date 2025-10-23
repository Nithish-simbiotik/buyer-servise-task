import { Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { Response } from 'express';

@Injectable()
export class ExportSampleRfxTemplateService {
  constructor() {}

  public async sampleRfx(res: Response) {
    const workbook = new Workbook();
    workbook.creator = 'P2P Admin';
    workbook.created = new Date();
    const sheet = workbook.addWorksheet('sampleRfx');
    sheet.columns = [
      { header: 'Template Name', key: 'templateName' },
      { header: 'Department', key: 'department' },
      { header: 'Event Type', key: 'eventType' },
      { header: 'Status', key: 'status' },
      { header: 'Title', key: 'title' },
      { header: 'Title Read-Only Setting', key: 'titleRead-OnlySetting' },
      { header: 'Supplier Category', key: 'supplierCategory' },
      {
        header: 'Supplier Category Visibility Setting*',
        key: 'supplierCategoryVisibilitySetting',
      },
      {
        header: 'Supplier Category Read-Only Setting',
        key: 'supplierCategoryRead-OnlySetting',
      },
      { header: 'Quotation Validity ', key: 'quotationValidity ' },
      {
        header: 'Quotation Validity Read-Only Setting',
        key: 'quotationValidityRead-OnlySetting',
      },
      { header: 'Warranty', key: 'warranty' },
      {
        header: 'Warranty Visibility Setting',
        key: 'warrantyVisibilitySetting',
      },
      { header: 'Warranty Read-Only setting', key: 'warrantyRead-Onlysetting' },
      { header: 'Closing Days Counter', key: 'closingDaysCounter' },
      { header: 'Closing Time', key: 'closingTime' },
      { header: 'Supplier Name Masking ', key: 'supplierNameMasking ' },
      {
        header: 'Supplier Name Masking Unmask Owner Name',
        key: 'supplierNameMaskingUnmaskOwnerName',
      },
      {
        header: 'Supplier Name Masking Visibility Setting',
        key: 'supplierNameMaskingVisibilitySetting',
      },
      {
        header: 'Supplier Name Masking Read-Only Setting',
        key: 'supplierNameMaskingRead-OnlySetting',
      },
      {
        header: 'Allow To Close Envelop During Evaluation',
        key: 'allowToCloseEnvelopDuringEvaluation',
      },
      {
        header: 'Allow To Close Envelop During Evaluation Visibility Setting',
        key: 'allowToCloseEnvelopDuringEvaluationVisibilitySetting',
      },
      {
        header: 'Allow To Close Envelop During Evaluation Read-Only Setting',
        key: 'allowToCloseEnvelopDuringEvaluationRead-OnlySetting',
      },
      {
        header: 'Allow To Add Supplier During Ongoing Event',
        key: 'allowToAddSupplierDuringOngoingEvent',
      },
      {
        header: 'Allow To Add Supplier During Ongoing Event Visibility Setting',
        key: 'allowToAddSupplierDuringOngoingEventVisibilitySetting',
      },
      {
        header: 'Allow To Add Supplier During Ongoing Event Read-Only Setting',
        key: 'allowToAddSupplierDuringOngoingEventRead-OnlySetting',
      },
      { header: 'Allow To Suspend Event', key: 'allowToSuspendEvent' },
      {
        header: 'Allow To Suspend Event Visibility Setting',
        key: 'allowToSuspendEventVisibilitySetting',
      },
      {
        header: 'Allow To Suspend Event Read-Only Setting',
        key: 'allowToSuspendEventRead-OnlySetting',
      },
      {
        header: 'Enable Acceptance Terms & Conditions for Supplier',
        key: 'enableAcceptanceTerms&ConditionsforSupplier',
      },
      {
        header: 'Enable Acceptance Terms & Conditions for Supplier - T&C Name',
        key: 'enableAcceptanceTerms&ConditionsforSupplier-T&CName',
      },
      {
        header: 'Enable Evaluation Conclusion Prematurely',
        key: 'enableEvaluationConclusionPrematurely',
      },
      {
        header: 'Enable Evaluation Conclusion Prematurely Owner Name',
        key: 'enableEvaluationConclusionPrematurelyOwnerName',
      },
      {
        header: 'Enable Evaluation Conclusion Prematurely Visibility Setting',
        key: 'enableEvaluationConclusionPrematurelyVisibilitySetting',
      },
      {
        header: 'Enable Evaluation Conclusion Prematurely Read-Only Setting',
        key: 'enableEvaluationConclusionPrematurelyRead-OnlySetting',
      },
      { header: 'Base Currency', key: 'baseCurrency' },
      {
        header: 'Base Currency Visibility Setting',
        key: 'baseCurrencyVisibilitySetting',
      },
      {
        header: 'Base Currency Read-Only Setting',
        key: 'baseCurrencyRead-OnlySetting',
      },
      { header: 'Decimal', key: 'decimal' },
      { header: 'Decimal Visibility Setting', key: 'decimalVisibilitySetting' },
      { header: 'Decimal Read-Only Setting', key: 'decimalRead-OnlySetting' },
      { header: 'Cost Center', key: 'costCenter' },
      {
        header: 'Cost Center Visibility Setting',
        key: 'costCenterVisibilitySetting',
      },
      {
        header: 'Cost Center Read-Only Setting',
        key: 'costCenterRead-OnlySetting',
      },
      { header: 'Purchasing Org', key: 'purchasingOrg' },
      {
        header: 'Purchasing Org Read-Only Setting',
        key: 'purchasingOrgRead-OnlySetting',
      },
      {
        header: 'Allow to Edit Bill of Quantity Setting',
        key: 'allowtoEditBillofQuantitySetting',
      },
      {
        header: 'Event - Approval Reminder Setting',
        key: 'Event - approvalReminderSetting',
      },
      {
        header: 'Event - Approval Reminder Visibility Setting',
        key: 'event-ApprovalReminderVisibilitySetting',
      },
      {
        header: 'Event - Approval Reminder Interval',
        key: 'event-ApprovalReminderInterval',
      },
      {
        header: 'Event - Approval Reminder Frequency',
        key: 'event-ApprovalReminderFrequency',
      },
      {
        header: 'Event - Inactive Approval Setting',
        key: 'event-InactiveApprovalSetting',
      },
      {
        header: 'Event - Allow to Add Additional Approver Setting',
        key: 'event-AllowtoAddAdditionalApproverSetting',
      },
      {
        header: 'Event - Approver Workflow Visibility Setting',
        key: 'event-ApproverWorkflowVisibilitySetting',
      },
      {
        header: 'Event - Approver Workflow Read-Only Setting',
        key: 'event-ApproverWorkflowRead-OnlySetting',
      },
      {
        header: 'Event - Approver Workflow Optional Setting',
        key: 'event-ApproverWorkflowOptionalSetting',
      },
      {
        header: 'Event - Enable Approval Workflow to Resume',
        key: 'event-EnableApprovalWorkflowtoResume',
      },
      { header: 'Event - Approver Name', key: 'event-ApproverName' },
      {
        header: 'Sourcing Proposal - Approval Reminder Setting',
        key: 'sourcingProposal-ApprovalReminderSetting',
      },
      {
        header: 'Sourcing Proposal - Approval Reminder Visibility Setting',
        key: 'sourcingProposal-ApprovalReminderVisibilitySetting',
      },
      {
        header: 'Sourcing Proposal - Approval Reminder Interval',
        key: 'sourcingProposal-ApprovalReminderInterval',
      },
      {
        header: 'Sourcing Proposal - Approval Reminder Frequency',
        key: 'sourcingProposal-ApprovalReminderFrequency',
      },
      {
        header: 'Sourcing Proposal - Inactive Approval Setting',
        key: 'sourcingProposal-InactiveApprovalSetting',
      },
      {
        header: 'Sourcing Proposal - Allow to Add Additional Approver Setting',
        key: 'sourcingProposal-AllowtoAddAdditionalApproverSetting',
      },
      {
        header: 'Sourcing Proposal - Approver Workflow Visibility Setting',
        key: 'sourcingProposal-ApproverWorkflowVisibilitySetting',
      },
      {
        header: 'Sourcing Proposal - Approver Workflow Read-Only Setting',
        key: 'sourcingProposal-ApproverWorkflowRead-OnlySetting',
      },
      {
        header: 'Sourcing Proposal - Approver Workflow Optional Setting',
        key: 'sourcingProposal-ApproverWorkflowOptionalSetting',
      },
      {
        header: 'Sourcing Proposal - Approver Name',
        key: 'sourcingProposal-ApproverName',
      },
      { header: 'Envelop 1 Name', key: 'envelop1Name' },
      {
        header: 'Envelop 1 Name Read-Only Setting',
        key: 'envelop1NameRead-OnlySetting',
      },
      { header: 'Envelop 1 Sequence Setting', key: 'envelop1SequenceSetting' },
      { header: 'Envelop 1 Sequence', key: 'envelop1Sequence' },
      {
        header: 'Envelop 1 Approval Workflow Setting',
        key: 'envelop1ApprovalWorkflowSetting',
      },
      { header: 'Envelop 1 Approver Name', key: 'envelop1ApproverName' },
      {
        header: 'Envelop 1 Attachment Setting',
        key: 'envelop1AttachmentSetting',
      },
      { header: 'Envelop 1 Attachment', key: 'envelop1Attachment' },
      { header: 'Envelop 2 Name', key: 'envelop2Name' },
      {
        header: 'Envelop 2 Name Read-Only Setting',
        key: 'envelop2NameRead-OnlySetting',
      },
      { header: 'Envelop 2 Sequence Setting', key: 'envelop2SequenceSetting' },
      { header: 'Envelop 2 Sequence', key: 'envelop2Sequence' },
      {
        header: 'Envelop 2 Approval Workflow Setting',
        key: 'envelop2ApprovalWorkflowSetting',
      },
      { header: 'Envelop 2 Approver Name', key: 'envelop2ApproverName' },
      {
        header: 'Envelop 2 Attachment Setting',
        key: 'envelop2AttachmentSetting',
      },
      { header: 'Envelop 2 Attachment', key: 'envelop2Attachment' },
      { header: 'Envelop n-1 Name', key: 'envelopn-1Name' },
      {
        header: 'Envelop n-1 Name Read-Only Setting',
        key: 'envelopn-1NameRead-OnlySetting',
      },
      {
        header: 'Envelop n-1 Sequence Setting',
        key: 'envelopn-1SequenceSetting',
      },
      { header: 'Envelop n-1 Sequence', key: 'envelopn-1Sequence' },
      {
        header: 'Envelop n-1 Approval Workflow Setting',
        key: 'envelopn-1ApprovalWorkflowSetting',
      },
      { header: 'Envelop n-1 Approver Name', key: 'envelopn-1ApproverName' },
      {
        header: 'Envelop n-1 Attachment Setting',
        key: 'envelopn-1AttachmentSetting',
      },
      { header: 'Envelop n-1 Attachment', key: 'envelopn-1Attachment' },
      {
        header: 'Team Member Read-Only Setting',
        key: 'teamMemberRead-OnlySetting',
      },
      {
        header: 'Team Member Name + Authorization',
        key: 'teamMemberName+Authorization',
      },
      { header: 'Template User Name', key: 'templateUserName' },
      { header: 'Created By', key: 'createdBy' },
      { header: 'Created Date', key: 'createdDate' },
      { header: 'Modified By', key: 'modifiedBy' },
      { header: 'Modified Date', key: 'modifiedDate' },
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

    res.attachment('SampleRfxTemplate.xlsx');
    await workbook.xlsx.write(res);
  }
}
