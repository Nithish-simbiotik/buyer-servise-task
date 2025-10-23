import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workbook } from 'exceljs';
import { Response } from 'express';
import { ExportDto } from 'src/dto/export.dto';
import { GetFlatDepartmentService } from 'src/services/flat/getDepartment.service';
import { GetFlatCostService } from 'src/services/flat/getFlatCost.service';
import { GetFlatCurrencyService } from 'src/services/flat/getFlatCurrency.service';
import { GetDepartmentService } from 'src/services/user/getDepartment.service';
import { GetRfxTemplateService } from '../get-rfx-template/get-rfx-template.service';
@Injectable()
export class ExportRfxTemplateListService {
  constructor(
    // @InjectRepository(SupplierRepository)
    private getRfxTemplateService: GetRfxTemplateService,
    private getDepartmentService: GetDepartmentService,
    private getCurrencyService: GetFlatCurrencyService,
    private getCostCenterService: GetFlatCostService,
    private department: GetFlatDepartmentService,
  ) {}
  public async exportRfx(res: Response, exportDto: ExportDto) {
    const workbook = new Workbook();
    workbook.creator = 'P2P Admin';
    workbook.created = new Date();
    const sheet = workbook.addWorksheet('Rfx');
    sheet.columns = [
      { header: 'Template Name', key: 'templateName' },
      { header: 'Department', key: 'department' },
      { header: 'Event Type', key: 'eventType' },
      { header: 'Status', key: 'status' },
      { header: 'Title', key: 'title' },
      { header: 'Title ReadOnly Setting', key: 'titleReadOnlySetting' },
      { header: 'Supplier Category', key: 'supplierCategory' },
      {
        header: 'Supplier Category Visibility Setting*',
        key: 'supplierCategoryVisibilitySetting',
      },
      {
        header: 'Supplier Category ReadOnly Setting',
        key: 'supplierCategoryReadOnlySetting',
      },
      { header: 'Quotation Validity ', key: 'quotationValidity ' },
      {
        header: 'Quotation Validity ReadOnly Setting',
        key: 'quotationValidityReadOnlySetting',
      },
      { header: 'Warranty', key: 'warranty' },
      {
        header: 'Warranty Visibility Setting',
        key: 'warrantyVisibilitySetting',
      },
      { header: 'Warranty ReadOnly setting', key: 'warrantyReadOnlysetting' },
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
        header: 'Supplier Name Masking ReadOnly Setting',
        key: 'supplierNameMaskingReadOnlySetting',
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
        header: 'Allow To Close Envelop During Evaluation ReadOnly Setting',
        key: 'allowToCloseEnvelopDuringEvaluationReadOnlySetting',
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
        header: 'Allow To Add Supplier During Ongoing Event ReadOnly Setting',
        key: 'allowToAddSupplierDuringOngoingEventReadOnlySetting',
      },
      { header: 'Allow To Suspend Event', key: 'allowToSuspendEvent' },
      {
        header: 'Allow To Suspend Event Visibility Setting',
        key: 'allowToSuspendEventVisibilitySetting',
      },
      {
        header: 'Allow To Suspend Event ReadOnly Setting',
        key: 'allowToSuspendEventReadOnlySetting',
      },
      {
        header: 'Enable Acceptance Terms & Conditions for Supplier',
        key: 'enableAcceptanceTermsConditionsforSupplier',
      },
      {
        header: 'Enable Acceptance Terms & Conditions for Supplier  T&C Name',
        key: 'enableAcceptanceTermsConditionsforSupplierTCName',
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
        header: 'Enable Evaluation Conclusion Prematurely ReadOnly Setting',
        key: 'enableEvaluationConclusionPrematurelyReadOnlySetting',
      },
      { header: 'Base Currency', key: 'baseCurrency' },
      {
        header: 'Base Currency Visibility Setting',
        key: 'baseCurrencyVisibilitySetting',
      },
      {
        header: 'Base Currency ReadOnly Setting',
        key: 'baseCurrencyReadOnlySetting',
      },
      { header: 'Decimal', key: 'decimal' },
      { header: 'Decimal Visibility Setting', key: 'decimalVisibilitySetting' },
      { header: 'Decimal ReadOnly Setting', key: 'decimalReadOnlySetting' },
      { header: 'Cost Center', key: 'costCenter' },
      {
        header: 'Cost Center Visibility Setting',
        key: 'costCenterVisibilitySetting',
      },
      {
        header: 'Cost Center ReadOnly Setting',
        key: 'costCenterReadOnlySetting',
      },
      { header: 'Purchasing Org', key: 'purchasingOrg' },
      {
        header: 'Purchasing Org ReadOnly Setting',
        key: 'purchasingOrgReadOnlySetting',
      },
      {
        header: 'Allow to Edit Bill of Quantity Setting',
        key: 'allowtoEditBillofQuantitySetting',
      },
      {
        header: 'Questionnaire Set Name',
        key: 'questionnaireSetName',
      },
      {
        header: 'Event  Approval Reminder Setting',
        key: 'eventApprovalReminderSetting',
      },
      {
        header: 'Event  Approval Reminder Visibility Setting',
        key: 'eventApprovalReminderVisibilitySetting',
      },
      {
        header: 'Event  Approval Reminder Interval',
        key: 'eventApprovalReminderInterval',
      },
      {
        header: 'Event  Approval Reminder Frequency',
        key: 'eventApprovalReminderFrequency',
      },
      {
        header: 'Event  Inactive Approval Setting',
        key: 'eventInactiveApprovalSetting',
      },
      {
        header: 'Event  Allow to Add Additional Approver Setting',
        key: 'eventAllowtoAddAdditionalApproverSetting',
      },
      {
        header: 'Event  Approver Workflow Visibility Setting',
        key: 'eventApproverWorkflowVisibilitySetting',
      },
      {
        header: 'Event  Approver Workflow ReadOnly Setting',
        key: 'eventApproverWorkflowReadOnlySetting',
      },
      {
        header: 'Event  Approver Workflow Optional Setting',
        key: 'eventApproverWorkflowOptionalSetting',
      },
      {
        header: 'Event  Enable Approval Workflow to Resume',
        key: 'eventEnableApprovalWorkflowtoResume',
      },
      { header: 'Event  Approver Name', key: 'eventApproverName' },
      {
        header: 'Sourcing Proposal Approval Reminder Setting',
        key: 'sourcingProposalApprovalReminderSetting',
      },
      {
        header: 'Sourcing Proposal Approval Reminder Visibility Setting',
        key: 'sourcingProposalApprovalReminderVisibilitySetting',
      },
      {
        header: 'Sourcing Proposal Approval Reminder Interval',
        key: 'sourcingProposalApprovalReminderInterval',
      },
      {
        header: 'Sourcing Proposal  Approval Reminder Frequency',
        key: 'sourcingProposalApprovalReminderFrequency',
      },
      {
        header: 'Sourcing Proposal  Inactive Approval Setting',
        key: 'sourcingProposalInactiveApprovalSetting',
      },
      {
        header: 'Sourcing Proposal Allow to Add Additional Approver Setting',
        key: 'sourcingProposalAllowtoAddAdditionalApproverSetting',
      },
      {
        header: 'Sourcing Proposal Approver Workflow Visibility Setting',
        key: 'sourcingProposalApproverWorkflowVisibilitySetting',
      },
      {
        header: 'Sourcing Proposal Approver Workflow ReadOnly Setting',
        key: 'sourcingProposalApproverWorkflowReadOnlySetting',
      },
      {
        header: 'Sourcing Proposal Approver Workflow Optional Setting',
        key: 'sourcingProposalApproverWorkflowOptionalSetting',
      },
      {
        header: 'Sourcing Proposal  Approver Name',
        key: 'sourcingProposalApproverName',
      },
      {
        header: 'Envelop Name',
        key: 'envelopName',
      },
      {
        header: 'Envelop Name Read Only Setting',
        key: 'envelopNameReadOnlySetting',
      },
      {
        header: 'Envelop Sequence Setting',
        key: 'envelopSequenceSetting',
      },
      {
        header: 'Envelop Sequence ',
        key: 'envelopSequence',
      },
      {
        header: 'Envelop Approval Workflow Setting',
        key: 'envelopApprovalWorkflowSetting',
      },
      {
        header: 'Envelop Approver Name',
        key: 'envelopApproverName',
      },
      {
        header: 'Envelop Attachment Setting',
        key: 'envelopAttachmentSetting',
      },
      {
        header: 'Envelop Attachment ',
        key: 'envelopAttachment',
      },
      {
        header: 'Envelop Name',
        key: 'envelopName',
      },

      {
        header: 'Envelop Name Read Only Setting',
        key: 'envelopNameReadOnlySetting',
      },

      {
        header: 'Envelop Sequence Setting',
        key: 'envelopSequenceSetting',
      },

      {
        header: 'Envelop Sequence ',
        key: 'envelopSequence',
      },

      {
        header: 'Envelop Approval Workflow Setting',
        key: 'envelopApprovalWorkflowSetting',
      },

      {
        header: 'Envelop Approver Name',
        key: 'envelopApproverName',
      },

      {
        header: 'Envelop Attachment Setting',
        key: 'envelopAttachmentSetting',
      },

      {
        header: 'Envelop Attachment ',
        key: 'envelopAttachment',
      },

      {
        header: 'Team Member ReadOnly Setting',
        key: 'teamMemberReadOnlySetting',
      },
      {
        header: 'Team Member Name + Authorization',
        key: 'teamMemberNameAuthorization',
      },
      { header: 'Template User Name', key: 'templateUserName' },
      { header: 'Created By', key: 'createdBy' },
      { header: 'Created Date', key: 'createdDate' },
      { header: 'Modified By', key: 'modifiedBy' },
      { header: 'Modified Date', key: 'modifiedDate' },
    ];
    //adding dropdown data
    const dropdownSheet = workbook.addWorksheet('DropdownData', {
      state: 'hidden',
    });

    dropdownSheet.columns = [
      { header: 'Department', key: 'department' },
      { header: 'Cost Center', key: 'costCenter' },
      { header: 'Internal Order No', key: 'internalOrderNo' },
      { header: 'Part Number', key: 'partNumber' },
    ];
    // const department = await this.department.getDepartmentById();
    // const uomNameList = department.map((list) => {
    //   return `${list.name} - ${list.description}`;
    // });
    // const costCenterList = await this.costService.getFlatCostListByPurchaseOrg(
    //   purchaseOrg,
    // );
    // const costCenterCode = costCenterList.map((list) => {
    //   return `${list.code} - ${list.description}`;
    // });
    // const internalOrder =
    //   await this.internalOrderService.getInternalOrdertList();
    // const internalOrderNumber = internalOrder.map((list) => {
    //   return `${list.order_number} - ${list.description}`;
    // });
    // const partNumberList = await this.partNumberService.getPartNumberList();
    // const partMaterialNumber = partNumberList.map((list) => {
    //   return `${list.pir_number} - ${list.material_number}`;
    // });

    // for (
    //   let i = 0;
    //   i < uomNameList.length ||
    //   i < costCenterCode.length ||
    //   i < internalOrderNumber.length ||
    //   i < partMaterialNumber.length;
    //   i++
    // ) {
    //   dropdownSheet.addRow({
    //     uom: uomNameList[i],
    //     costCenter: costCenterCode[i],
    //     internalOrderNo: internalOrderNumber[i],
    //     partNumber: partMaterialNumber[i],
    //   });
    // }

    // for (let i = 2; i <= 1000; i++) {
    //   sheet.getCell('C' + i).dataValidation = {
    //     type: 'list',
    //     allowBlank: false,
    //     formulae: ['"Yes, Yes with option, No, Not applicable"'],
    //   };
    //   sheet.getCell('G' + i).dataValidation = {
    //     type: 'list',
    //     allowBlank: false,
    //     formulae: [`=DropdownData!$A$2:$A$${uomNameList.length}`],
    //   };
    //   sheet.getCell('H' + i).dataValidation = {
    //     type: 'list',
    //     allowBlank: false,
    //     formulae: [`DropdownData!$B$2:B$${costCenterCode.length}`],
    //   };
    //   sheet.getCell('J' + i).dataValidation = {
    //     type: 'list',
    //     allowBlank: false,
    //     formulae: [`=DropdownData!$C$2:$C$${internalOrderNumber.length}`],
    //   };
    //   sheet.getCell('K' + i).dataValidation = {
    //     type: 'list',
    //     allowBlank: false,
    //     formulae: [`=DropdownData!$D$2:$D$${partMaterialNumber.length}`],
    //   };
    // }
    // sheet.columns.forEach((column) => {
    //   column.width = column.header.length < 20 ? 20 : column.header.length;
    // });
    // sheet.getRow(1).eachCell((cell) => {
    //   cell.font = { bold: true };
    //   cell.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     bgColor: { argb: 'fdf731' },
    //     fgColor: { argb: 'fdf731' },
    //   };
    // });

    // sheet.columns.forEach((column) => {
    //   column.width = column.header.length < 20 ? 20 : column.header.length;
    // });

    // sheet.getRow(1).eachCell((cell) => {
    //   cell.font = { bold: true };
    //   cell.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     bgColor: { argb: 'fdf731' },
    //     fgColor: { argb: 'fdf731' },
    //   };
    // });

    const rfxTemplateList =
      await this.getRfxTemplateService.exportRfxTemplateList(exportDto);
    //console.log(rfxTemplateList.map((list) => list.envelopes));

    // console.log('@@@@@@ rfxTemplateList  @@@@@', rfxTemplateList);

    for (let i = 0; i < rfxTemplateList.length; i++) {
      for (let j = 0; j < rfxTemplateList[i].envelopes.length; j++) {
        sheet.addRow({
          templateName: rfxTemplateList[i].templateName,
          department: rfxTemplateList[i].department.department_name,
          eventType: rfxTemplateList[i].eventType,
          status: rfxTemplateList[i].status,
          title: rfxTemplateList[i].title,
          titleReadOnlySetting: rfxTemplateList[i].title_readonly,
          supplierCategory: rfxTemplateList[i].supplierCategory,
          supplierCategoryVisibilitySetting:
            rfxTemplateList[i].supplierCategory_visible,
          supplierCategoryReadOnlySetting:
            rfxTemplateList[i].supplierCategory_readonly,
          quotationValidity: rfxTemplateList[i].quotationValidity,
          quotationValidityReadOnlySetting:
            rfxTemplateList[i].quotationValidity_readonly,
          warranty: rfxTemplateList[i].warranty,
          warrantyVisibilitySetting: rfxTemplateList[i].warranty_visible,
          warrantyReadOnlysetting: rfxTemplateList[i].warranty_readonly,
          closingDaysCounter: rfxTemplateList[i].closingDaysCounter,
          closingTime: rfxTemplateList[i].closingTime,
          supplierNameMasking:
            rfxTemplateList[i].enableSupplierNameMaskingForEvaluation,
          supplierNameMaskingUnmaskOwnerName: rfxTemplateList[i].unmaskOwners,
          supplierNameMaskingVisibilitySetting:
            rfxTemplateList[i].enableSupplierNameMaskingForEvaluation,
          supplierNameMaskingReadOnlySetting:
            rfxTemplateList[i].enableSupplierNameMaskingForEvaluation,
          allowToCloseEnvelopDuringEvaluation:
            rfxTemplateList[i].canCloseEnvelope,
          allowToCloseEnvelopDuringEvaluationVisibilitySetting:
            rfxTemplateList[i].canCloseEnvelope_visible,
          allowToAddSupplierDuringOngoingEvent:
            rfxTemplateList[i].canAddSupplier,
          allowToAddSupplierDuringOngoingEventVisibilitySetting:
            rfxTemplateList[i].canAddSupplier_visible,
          allowToSuspendEvent: rfxTemplateList[i].canSuspendEvent,
          allowToSuspendEventVisibilitySetting:
            rfxTemplateList[i].suspendedEvent_visible,
          enableAcceptanceTermsConditionsforSupplier:
            rfxTemplateList[i].enableSupplierTnC,
          enableAcceptanceTermsConditionsforSupplierTCName:
            rfxTemplateList[i].supplierTnCDeclarationId,
          enableEvaluationConclusionPrematurely:
            rfxTemplateList[i].canEvaluateConclusion,
          enableEvaluationConclusionPrematurelyOwnerName:
            rfxTemplateList[i].conclusionOwners,
          enableEvaluationConclusionPrematurelyVisibilitySetting:
            rfxTemplateList[i].selectConclusionOwners_visible ??
            rfxTemplateList[i].selectConclusionOwners_visible,
          baseCurrency: await this.getCurrencyService.getFlatCurrenyNameById(
            Number(rfxTemplateList[i].baseCurrencyId),
          ),
          baseCurrencyVisibilitySetting:
            rfxTemplateList[i].baseCurrency_visible,
          baseCurrencyReadOnlySetting: rfxTemplateList[i].baseCurrency_readonly,
          decimal: rfxTemplateList[i].decimal,
          decimalVisibilitySetting: rfxTemplateList[i].decimal_visible,
          decimalReadOnlySetting: rfxTemplateList[i].decimal_readonly,
          costCenter: await this.getCostCenterService.getFlatCostCenterNameById(
            Number(rfxTemplateList[i].costCenter_visible),
          ),
          costCenterVisibilitySetting: rfxTemplateList[i].costCenter_visible,
          costCenterReadOnlySetting: rfxTemplateList[i].costCenter_readonly,
          purchasingOrg: rfxTemplateList[i].purchasingOrgCode,
          purchasingOrgReadOnlySetting:
            rfxTemplateList[i].purchasingOrg_readonly,
          allowtoEditBillofQuantitySetting:
            rfxTemplateList[i].canEditBillOfQuantity,
          eventApprovalReminderSetting: rfxTemplateList[i].approvalRoute
            ? rfxTemplateList[i].approvalRoute.enableApprovalReminders
            : '',
          eventApprovalReminderVisibilitySetting: rfxTemplateList[i]
            .approvalRoute
            ? rfxTemplateList[i].approvalRoute.visible
            : '',
          eventApprovalReminderInterval: rfxTemplateList[i].approvalRoute
            ? rfxTemplateList[i].approvalRoute.hoursPerReminder
            : '',
          eventApprovalReminderFrequency: rfxTemplateList[i].approvalRoute
            ? rfxTemplateList[i].approvalRoute.reminderFrequency
            : '',
          eventInactiveApprovalSetting: rfxTemplateList[i].approvalRoute
            ? rfxTemplateList[i].approvalRoute.visible
            : '',
          eventAllowtoAddAdditionalApproverSetting: rfxTemplateList[i]
            .approvalRoute
            ? rfxTemplateList[i].approvalRoute.canAddAdditionalApproval
            : '',
          eventApproverWorkflowVisibilitySetting: rfxTemplateList[i]
            .approvalRoute
            ? rfxTemplateList[i].approvalRoute.canAddAdditionalApproval_visible
            : '',
          eventApproverWorkflowReadOnlySetting: rfxTemplateList[i].approvalRoute
            ? rfxTemplateList[i].approvalRoute.canAddAdditionalApproval_readonly
            : '',
          eventApproverWorkflowOptionalSetting: rfxTemplateList[i].approvalRoute
            ? rfxTemplateList[i].approvalRoute.canAddAdditionalApproval_optional
            : '',
          eventEnableApprovalWorkflowtoResume: rfxTemplateList[i].approvalRoute
            ? rfxTemplateList[i].approvalRoute.canApproveResume
            : '',
          eventApproverName: rfxTemplateList[i].approvalRoute
            ? rfxTemplateList[i].approvalRoute.id
            : '',
          sourcingProposalApprovalReminderSetting: rfxTemplateList[i]
            .sourcingProposalRoute
            ? rfxTemplateList[i].sourcingProposalRoute.enableApprovalReminders
            : '',
          sourcingProposalApprovalReminderVisibilitySetting: rfxTemplateList[i]
            .sourcingProposalRoute
            ? rfxTemplateList[i].sourcingProposalRoute.visible
            : '',
          sourcingProposalApprovalReminderInterval: rfxTemplateList[i]
            .sourcingProposalRoute
            ? rfxTemplateList[i].sourcingProposalRoute.hoursPerReminder
            : '',
          sourcingProposalApprovalReminderFrequency: rfxTemplateList[i]
            .sourcingProposalRoute
            ? rfxTemplateList[i].sourcingProposalRoute.reminderFrequency
            : '',
          sourcingProposalInactiveApprovalSetting: rfxTemplateList[i]
            .sourcingProposalRoute
            ? rfxTemplateList[i].sourcingProposalRoute.canAddAdditionalApproval
            : '',
          sourcingProposalAllowtoAddAdditionalApproverSetting: rfxTemplateList[
            i
          ].sourcingProposalRoute
            ? rfxTemplateList[i].sourcingProposalRoute.canAddAdditionalApproval
            : '',
          sourcingProposalApproverWorkflowVisibilitySetting: rfxTemplateList[i]
            .sourcingProposalRoute
            ? rfxTemplateList[i].sourcingProposalRoute
                .canAddAdditionalApproval_visible
            : '',
          sourcingProposalApproverWorkflowReadOnlySetting: rfxTemplateList[i]
            .sourcingProposalRoute
            ? rfxTemplateList[i].sourcingProposalRoute
                .canAddAdditionalApproval_readonly
            : '',
          sourcingProposalApproverWorkflowOptionalSetting: rfxTemplateList[i]
            .sourcingProposalRoute
            ? rfxTemplateList[i].sourcingProposalRoute
                .canAddAdditionalApproval_optional
            : '',
          sourcingProposalApproverName: rfxTemplateList[i].sourcingProposalRoute
            ? rfxTemplateList[i].sourcingProposalRoute.id
            : '',
          envelopName: rfxTemplateList[i].envelopes[j]
            ? rfxTemplateList[i].envelopes[j].envelopeName
            : '',

          envelopNameReadOnlySetting: rfxTemplateList[i].envelopes[j]
            ? rfxTemplateList[i].envelopes[j].readonly
            : '',

          envelopSequenceSetting: rfxTemplateList[i].envelopes[j]
            ? rfxTemplateList[i].envelopes[j].openingSequence
            : '',

          envelopSequence: rfxTemplateList[i].envelopes[j]
            ? rfxTemplateList[i].envelopes[j].envelopeSequence
            : '',

          envelopApprovalWorkflowSetting: rfxTemplateList[i].envelopes[j]
            ? rfxTemplateList[i].envelopes[j].canApproveWorkflow
            : '',

          envelopApproverName: rfxTemplateList[i].envelopes[j]
            ? rfxTemplateList[i].envelopes[j].envelopeApprovers
            : '',
          envelopAttachmentSetting: rfxTemplateList[i].envelopes[j]
            ? rfxTemplateList[i].envelopes[j].showAttachmentOption
            : '',

          envelopAttachment: rfxTemplateList[i].envelopes[j]
            ? rfxTemplateList[i].envelopes[j].attachmentType
            : '',

          teamMemberReadOnlySetting: rfxTemplateList[i].teamMembers_readonly,
          // teamMemberNameAuthorization:
          //   rfxTemplateList[i].teamMemberNameAuthorization,
          templateUserName: rfxTemplateList[i].templateUsers,
          createdBy: rfxTemplateList[i].createdBy
            ? rfxTemplateList[i].createdBy.name
            : '',
          createdDate: rfxTemplateList[i].createdAt,
          modifiedBy: rfxTemplateList[i].updatedBy
            ? rfxTemplateList[i].updatedBy.name
            : '',
          modifiedDate: rfxTemplateList[i].updatedAt,
        });
      }
    }

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
    // console.log(res);
    console.log('execution pass');

    res.attachment('BillOfQuantity.xlsx');
    await workbook.xlsx.write(res);
  }

  public async downloadRfxTemplateFormat(res: Response) {
    const workbook = new Workbook();
    workbook.creator = 'P2P Admin';
    workbook.created = new Date();
    const sheet = workbook.addWorksheet('Sourcing Template');
    // const sheetTeamMebers = workbook.addWorksheet("Team Members");
    sheet.columns = [
      { header: 'Template Name', key: 'templateName' },
      { header: 'Department', key: 'department' },
      { header: 'Event Type', key: 'eventType' },
      { header: 'Status', key: 'status' },
      { header: 'Title', key: 'title' },
      { header: 'Title ReadOnly Setting', key: 'titleReadOnlySetting' },
      { header: 'Supplier Category', key: 'supplierCategory' },
      {
        header: 'Supplier Category Visibility Setting*',
        key: 'supplierCategoryVisibilitySetting',
      },
      {
        header: 'Supplier Category ReadOnly Setting',
        key: 'supplierCategoryReadOnlySetting',
      },
      { header: 'Quotation Validity ', key: 'quotationValidity ' },
      {
        header: 'Quotation Validity ReadOnly Setting',
        key: 'quotationValidityReadOnlySetting',
      },
      { header: 'Warranty', key: 'warranty' },
      {
        header: 'Warranty Visibility Setting',
        key: 'warrantyVisibilitySetting',
      },
      { header: 'Warranty ReadOnly setting', key: 'warrantyReadOnlysetting' },
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
        header: 'Supplier Name Masking ReadOnly Setting',
        key: 'supplierNameMaskingReadOnlySetting',
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
        header: 'Allow To Close Envelop During Evaluation ReadOnly Setting',
        key: 'allowToCloseEnvelopDuringEvaluationReadOnlySetting',
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
        header: 'Allow To Add Supplier During Ongoing Event ReadOnly Setting',
        key: 'allowToAddSupplierDuringOngoingEventReadOnlySetting',
      },
      { header: 'Allow To Suspend Event', key: 'allowToSuspendEvent' },
      {
        header: 'Allow To Suspend Event Visibility Setting',
        key: 'allowToSuspendEventVisibilitySetting',
      },
      {
        header: 'Allow To Suspend Event ReadOnly Setting',
        key: 'allowToSuspendEventReadOnlySetting',
      },
      {
        header: 'Enable Acceptance Terms & Conditions for Supplier',
        key: 'enableAcceptanceTermsConditionsforSupplier',
      },
      {
        header: 'Enable Acceptance Terms & Conditions for Supplier  T&C Name',
        key: 'enableAcceptanceTermsConditionsforSupplierTCName',
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
        header: 'Enable Evaluation Conclusion Prematurely ReadOnly Setting',
        key: 'enableEvaluationConclusionPrematurelyReadOnlySetting',
      },
      { header: 'Base Currency', key: 'baseCurrency' },
      {
        header: 'Base Currency Visibility Setting',
        key: 'baseCurrencyVisibilitySetting',
      },
      {
        header: 'Base Currency ReadOnly Setting',
        key: 'baseCurrencyReadOnlySetting',
      },
      { header: 'Decimal', key: 'decimal' },
      { header: 'Decimal Visibility Setting', key: 'decimalVisibilitySetting' },
      { header: 'Decimal ReadOnly Setting', key: 'decimalReadOnlySetting' },
      { header: 'Cost Center', key: 'costCenter' },
      {
        header: 'Cost Center Visibility Setting',
        key: 'costCenterVisibilitySetting',
      },
      {
        header: 'Cost Center ReadOnly Setting',
        key: 'costCenterReadOnlySetting',
      },
      { header: 'Purchasing Org', key: 'purchasingOrg' },
      {
        header: 'Purchasing Org ReadOnly Setting',
        key: 'purchasingOrgReadOnlySetting',
      },
      {
        header: 'Allow to Edit Bill of Quantity Setting',
        key: 'allowtoEditBillofQuantitySetting',
      },
      {
        header: 'Questionnaire Set Name',
        key: 'questionnaireSetName',
      },
      {
        header: 'Event  Approval Reminder Setting',
        key: 'eventApprovalReminderSetting',
      },
      {
        header: 'Event  Approval Reminder Visibility Setting',
        key: 'eventApprovalReminderVisibilitySetting',
      },
      {
        header: 'Event  Approval Reminder Interval',
        key: 'eventApprovalReminderInterval',
      },
      {
        header: 'Event  Approval Reminder Frequency',
        key: 'eventApprovalReminderFrequency',
      },
      {
        header: 'Event  Inactive Approval Setting',
        key: 'eventInactiveApprovalSetting',
      },
      {
        header: 'Event  Allow to Add Additional Approver Setting',
        key: 'eventAllowtoAddAdditionalApproverSetting',
      },
      {
        header: 'Event  Approver Workflow Visibility Setting',
        key: 'eventApproverWorkflowVisibilitySetting',
      },
      {
        header: 'Event  Approver Workflow ReadOnly Setting',
        key: 'eventApproverWorkflowReadOnlySetting',
      },
      {
        header: 'Event  Approver Workflow Optional Setting',
        key: 'eventApproverWorkflowOptionalSetting',
      },
      {
        header: 'Event  Enable Approval Workflow to Resume',
        key: 'eventEnableApprovalWorkflowtoResume',
      },
      { header: 'Event  Approver Name', key: 'eventApproverName' },
      {
        header: 'Sourcing Proposal Approval Reminder Setting',
        key: 'sourcingProposalApprovalReminderSetting',
      },
      {
        header: 'Sourcing Proposal Approval Reminder Visibility Setting',
        key: 'sourcingProposalApprovalReminderVisibilitySetting',
      },
      {
        header: 'Sourcing Proposal Approval Reminder Interval',
        key: 'sourcingProposalApprovalReminderInterval',
      },
      {
        header: 'Sourcing Proposal  Approval Reminder Frequency',
        key: 'sourcingProposalApprovalReminderFrequency',
      },
      {
        header: 'Sourcing Proposal  Inactive Approval Setting',
        key: 'sourcingProposalInactiveApprovalSetting',
      },
      {
        header: 'Sourcing Proposal Allow to Add Additional Approver Setting',
        key: 'sourcingProposalAllowtoAddAdditionalApproverSetting',
      },
      {
        header: 'Sourcing Proposal Approver Workflow Visibility Setting',
        key: 'sourcingProposalApproverWorkflowVisibilitySetting',
      },
      {
        header: 'Sourcing Proposal Approver Workflow ReadOnly Setting',
        key: 'sourcingProposalApproverWorkflowReadOnlySetting',
      },
      {
        header: 'Sourcing Proposal Approver Workflow Optional Setting',
        key: 'sourcingProposalApproverWorkflowOptionalSetting',
      },
      {
        header: 'Sourcing Proposal  Approver Name',
        key: 'sourcingProposalApproverName',
      },
      {
        header: 'Envelop Name',
        key: 'envelopName',
      },
      {
        header: 'Envelop Name Read Only Setting',
        key: 'envelopNameReadOnlySetting',
      },
      {
        header: 'Envelop Sequence Setting',
        key: 'envelopSequenceSetting',
      },
      {
        header: 'Envelop Sequence ',
        key: 'envelopSequence',
      },
      {
        header: 'Envelop Approval Workflow Setting',
        key: 'envelopApprovalWorkflowSetting',
      },
      {
        header: 'Envelop Approver Name',
        key: 'envelopApproverName',
      },
      {
        header: 'Envelop Attachment Setting',
        key: 'envelopAttachmentSetting',
      },
      {
        header: 'Envelop Attachment ',
        key: 'envelopAttachment',
      },
      {
        header: 'Team Member ReadOnly Setting',
        key: 'teamMemberReadOnlySetting',
      },
      {
        header: 'Team Member Name + Authorization',
        key: 'teamMemberNameAuthorization',
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
    res.attachment('sourcingTemplate.xlsx');
    await workbook.xlsx.write(res);
  }
}
