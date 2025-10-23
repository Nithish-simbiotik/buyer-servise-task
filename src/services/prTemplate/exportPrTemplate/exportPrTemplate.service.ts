import { Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { ExportDto } from 'src/dto/export.dto';
import { GetFlatCostService } from 'src/services/flat/getFlatCost.service';
import { GetFlatCurrencyService } from 'src/services/flat/getFlatCurrency.service';
import { GetPrTemplateService } from '../getPrTemplate/getPrTemplate.service';
import { Response } from 'express';
import { GetAllUsers } from 'src/services/user/getAllUser.service';
import { AddressService } from 'src/services/flat/address.service';
import { GetFlatPurchaseOrgService } from 'src/services/flat/getFlatPurchaseOrg.service';

@Injectable()
export class ExportPrTemplateService {
  constructor(
    private prTemplateService: GetPrTemplateService,
    private getCurrencyService: GetFlatCurrencyService,
    private getCostCenterService: GetFlatCostService,
    private getAllUsersService: GetAllUsers,
    private getDeliverService: AddressService,
    private getPurchasingOrg: GetFlatPurchaseOrgService,
  ) {}

  /**========================================================================
   *                           Export PR Template Excel
   *========================================================================**/
  public async exportPRTemplate(res: Response, exportDto: ExportDto) {
    try {
      const workbook = new Workbook();
      workbook.creator = 'P2P Admin';
      workbook.created = new Date();
      const sheet = workbook.addWorksheet('PRTemplate');
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
          key: 'allowToAddAdditionalApprovalOptional',
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

      const prTemplateList = await this.prTemplateService.exportPrTemplateList(
        exportDto,
      );

      const count: number = prTemplateList.length;

      for (let i = 0; i < count; i++) {
        let teamAuth: string = '';
        let templateUser: string = '';
        // let approverId: number = 0;

        for (let j = 0; j < prTemplateList[i].teamMembers.length; j++) {
          const authorization = prTemplateList[i].teamMembers[j].viewStatus;
          const teamMember: string =
            await this.getAllUsersService.getUserNameById(
              prTemplateList[i].teamMembers[j].userId,
            );
          teamAuth = teamAuth + teamMember + ' - ' + authorization + ', ';
        }

        for (let i = 0; i < prTemplateList[i].templateUsers.length; i++) {
          templateUser =
            (await this.getAllUsersService.getUserNameById(
              prTemplateList[i].templateUsers[i].userId,
            )) ?? '';
        }

        // for (
        //   let m = 0;
        //   m < prTemplateList[i].approvalRoute.approvalLevels.length;
        //   m++
        // ) {
        //   approverId = Number(
        //     prTemplateList[i].approvalRoute.approvalLevels[m].userId,
        //   );
        // }

        sheet.addRow({
          templateName: prTemplateList[i].templateName,
          department: prTemplateList[i].department.department_name,
          prStatus: prTemplateList[i].prStatus,
          prType: prTemplateList[i].prType,
          enableCAPExPRWorkflow: prTemplateList[i].enableCAPExPRWorkflow,
          reasonForExpenditure: prTemplateList[i].reasonForExpenditure,
          prName: prTemplateList[i].prName,
          prNameReadOnly: prTemplateList[i].prNameReadOnly,
          deliverAddress:
            this.getDeliverService.getDeliveryAddressNameById(
              Number(prTemplateList[i].deliveryAddressId),
            ) ?? '',
          allowToEditOfBillQuantity:
            prTemplateList[i].allowToEditOfBillQuantity,
          baseCurrency:
            (await this.getCurrencyService.getFlatCurrenyNameById(
              Number(prTemplateList[i].baseCurrencyId),
            )) ?? '',
          baseCurrencyReadOnly: prTemplateList[i].baseCurrencyReadOnly,
          // // decimal: prTemplateList[i].decimalId,
          decimalReadOnly: prTemplateList[i].decimalReadOnly,
          costCenter:
            (await this.getCostCenterService.getFlatCostCenterNameById(
              Number(prTemplateList[i].costCenterId),
            )) ?? '',
          costCenterReadOnly: prTemplateList[i].costCenterReadOnly,
          costCenterVisible: prTemplateList[i].costCenterVisible,
          purchasingOrg:
            (await this.getPurchasingOrg.getFlatPurchaseOrgNameById(
              Number(prTemplateList[i].purchaseOrgId),
            )) ?? '',
          purchaseOrgReadOnly: prTemplateList[i].purchaseOrgReadOnly,
          availableBudgetVisible: prTemplateList[i].availableBudgetVisible,
          availableBudgetReadOnly: prTemplateList[i].availableBudgetReadOnly,
          availableBudgetOptional: prTemplateList[i].availableBudgetOptional,
          enableBudgetLocking: prTemplateList[i].enableBudgetLocking,
          teamMembers: teamAuth,
          teamMemberReadOnly: prTemplateList[i].teamMemberReadOnly,

          // //approval Route
          enableApprovalReminder:
            prTemplateList[i].approvalRoute.enableApprovalReminder,
          enableForALlApprovalLevelsVisible:
            prTemplateList[i].approvalRoute.enableForALlApprovalLevelsVisible,
          reminderEmailSentHours:
            prTemplateList[i].approvalRoute.reminderEmailSentHours,
          maximumNumbersOfEmailReminder:
            prTemplateList[i].approvalRoute.maximumNumbersOfEmailReminder,
          notifyRequestOwnerReminder:
            prTemplateList[i].approvalRoute.notifyRequestOwnerReminder,
          allowToAddAdditionalApproval:
            prTemplateList[i].approvalRoute.allowToAddAdditionalApproval,
          allowToAddAdditionalApprovalVisible:
            prTemplateList[i].approvalRoute.allowToAddAdditionalApprovalVisible,
          allowToAddAdditionalApprovalReadOnly:
            prTemplateList[i].approvalRoute
              .allowToAddAdditionalApprovalReadOnly,
          allowToAddAdditionalApprovalOptional:
            prTemplateList[i].approvalRoute
              .allowToAddAdditionalApprovalOptional,
          // // // approverName:
          // //   prTemplateList[i].approvalRoute.approvalLevels[0].userId,

          // approverName:
          //   (await this.getAllUsersService.getUserNameById(approverId)) ?? '',

          allowToEscalate: prTemplateList[i].approvalRoute.allowToEscalate,
          allowToEditPR: prTemplateList[i].approvalRoute.allowToEditPR,

          // //ECAPEX Approval Route
          enableApprovalReminderECAPEX:
            prTemplateList[i].ECAPEXApprovalRoute.enableApprovalReminderECAPEX,
          enableForALlApprovalLevelsVisibleECAPEX:
            prTemplateList[i].ECAPEXApprovalRoute
              .enableForALlApprovalLevelsVisibleECAPEX,
          reminderEmailSentHoursECAPEX:
            prTemplateList[i].ECAPEXApprovalRoute.reminderEmailSentHoursECAPEX,
          maximumNumbersOfEmailReminderECAPEX:
            prTemplateList[i].ECAPEXApprovalRoute
              .maximumNumbersOfEmailReminderECAPEX,
          notifyRequestOwnerReminderECAPEX:
            prTemplateList[i].ECAPEXApprovalRoute
              .notifyRequestOwnerReminderECAPEX,
          allowToAddAdditionalApprovalECAPEX:
            prTemplateList[i].ECAPEXApprovalRoute
              .allowToAddAdditionalApprovalECAPEX,
          allowToAddAdditionalApprovalVisibleECAPEX:
            prTemplateList[i].ECAPEXApprovalRoute
              .allowToAddAdditionalApprovalVisibleECAPEX,
          allowToAddAdditionalApprovalReadOnlyECAPEX:
            prTemplateList[i].ECAPEXApprovalRoute
              .allowToAddAdditionalApprovalReadOnlyECAPEX,
          allowToAddAdditionalApprovalOptionalECAPEX:
            prTemplateList[i].ECAPEXApprovalRoute
              .allowToAddAdditionalApprovalOptionalECAPEX,
          // // eCAPEXApproverName:
          // //   prTemplateList[i].ECAPEXApprovalRoute.approvalLevelsECAPEX[0]
          // //     .userId,
          // eCAPEXApproverName: await this.getAllUsersService.getUserNameById(
          //   Number(
          //     prTemplateList[i].ECAPEXApprovalRoute.approvalLevelsECAPEX.map(
          //       async (x) => x.userId,
          //     ),
          //   ) ?? '',
          // ),
          // ), //=============================XHECK THIS
          allowToEscalateECAPEX:
            prTemplateList[i].ECAPEXApprovalRoute.allowToEscalateECAPEX,
          allowToEditPRECAPEX:
            prTemplateList[i].ECAPEXApprovalRoute.allowToEditPRECAPEX,

          templateUserName: templateUser ?? '',
          createdBy: prTemplateList[i].createdBy.name,
          createdDate: prTemplateList[i].createdAt,
          modifiedBy:
            prTemplateList[i].updatedBy !== null
              ? prTemplateList[i].updatedBy.name
              : '',
          modifiedDate: prTemplateList[i].updatedAt ?? '',
        });
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

      res.attachment('PrTemplates.xlsx');
      await workbook.xlsx.write(res);
    } catch (error) {
      return error.message;
    }
  }

  /**========================================================================
   *                        Download PR Templates Sourcing
   *========================================================================**/
  public async downloadPrTemplate(res: Response) {
    try {
      const workbook = new Workbook();
      workbook.creator = 'P2P Admin';
      workbook.created = new Date();
      const sheet = workbook.addWorksheet('PRTemplate');
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
        // {
        //   header: 'Allow to Edit Bill of Quantity Setting',
        //   key: 'allowToEditOfBillQuantity',
        // },
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
        // {
        //   header: 'Approval - Approval Reminder Setting',
        //   key: 'enableApprovalReminder',
        // },
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
          header: 'Approval - Approver Allow to Escalate Setting',
          key: 'allowToEscalate',
        },
        // {
        //   header: 'Approval - Approver Allow to Edit PR',
        //   key: 'allowToEditPR',
        // },
        {
          header: 'Approval - Approver Name',
          key: 'approverName', // =============================================== wait
        },

        //eCAPEX
        // {
        //   header: 'eCAPEX Approval - Approval Reminder Setting',
        //   key: 'enableApprovalReminderECAPEX',
        // },
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
          key: 'allowToAddAdditionalApprovalOptional',
        },
        {
          header: 'eCAPEX Approval - Approver Allow to Escalate Setting',
          key: 'allowToEscalateECAPEX',
        },
        // {
        //   header: 'eCAPEX Approval - Approver Allow to Edit PR',
        //   key: 'allowToEditPRECAPEX',
        // },
        {
          header: 'eCAPEX Approval - Approver Name',
          key: 'eCAPEXApproverName', // ======================================== wait
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

      res.attachment('PrTemplates.xlsx');
      await workbook.xlsx.write(res);
    } catch (error) {
      return error;
    }
  }
}
