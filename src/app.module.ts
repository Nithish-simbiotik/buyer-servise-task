import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrePrController } from './controllers/prepr.controller';
import { AppService } from './app.service';
import { PreprBillOfQuantityEntity } from './entities/prepr/prepr-bill-of-quantity.entity';
import { PreprCostCenterEntity } from './entities/prepr/prepr-cost-center.entity';
import { PreprDeliveryAddressEntity } from './entities/prepr/prepr-delivery-address.entitty';
import { PreprEntity } from './entities/prepr/prepr.entity';
import { PreprSupplierEntity } from './entities/prepr/prepr-supplier.entity';
import { PreprSupportingDocumentEntity } from './entities/prepr/prepr-supporting-documents.entity';
import { PreprWarrantyEntity } from './entities/prepr/prepr-warranty.entity';
import { Environment } from './env/environment';
import { AppController } from './controllers/app.controller';
import { RFSService } from './services/rfs/rfs.service';
import { RFSRepository } from './repos/rfs.repository';
import { PreprTemplateController } from './controllers/preprTemplate.controller';
import { CreateRFSTemplateService } from './services/rfsTemplate/createRfsTemplate.service';
import { RFSTemplateRepository } from './repos/rfsTemplate.repository';
import { RfsTemplateTeamMemberEntity } from './entities/preprTemplate/preprTemplate_TeamMember.entity';
import { RfsTemplateLevelsEntity } from './entities/preprTemplate/preprTemplate_Level.entity';
import { GetRFSTemplateService } from './services/rfsTemplate/getRfsTemplate.service';
import { UpdateRFSTemplateService } from './services/rfsTemplate/updateRfsTemplate.service';
import { DeleteRFSTemplateService } from './services/rfsTemplate/deleteRfsTemplate.service';
import { FlatController } from './controllers/flat.controller';
import { GetFlatCostService } from './services/flat/getFlatCost.service';
// import { FlatRepository } from './repos/flats/costCenter.repository';
import { FileController } from './controllers/fileupload.controller';
import { FileUpload } from './services/fileupload/fileupload.service';
import { GetFlatDepartmentService } from './services/flat/getDepartment.service';
import { GetFlatCurrencyService } from './services/flat/getFlatCurrency.service';
import { GetFlatPurchaseOrgService } from './services/flat/getFlatPurchaseOrg.service';
import { AddressService } from './services/flat/address.service';
import { BusinessAreaService } from './services/flat/businessArea.service';
import { CompanyService } from './services/flat/company.service';
import { AccountAssignmentService } from './services/flat/getAccoutnAssignment.service';
import { GlCodeService } from './services/flat/glCode.service';
import { IndustryCategoryService } from './services/flat/industryCategory.service';
import { InternalOrderService } from './services/flat/internalOrder.service';
import { PaymentTermService } from './services/flat/paymentTerms.service';
import { PlantService } from './services/flat/plant.service';
import { ProfitCenterService } from './services/flat/profitCenter.service';
import { SAPClassService } from './services/flat/sapClass.service';
import { SAPModelService } from './services/flat/sapModel.service';
import { SAPSeriesService } from './services/flat/sapSeries.service';
import { SupplierTagService } from './services/flat/supplierTag.service';
import { UOMService } from './services/flat/uom.service';
import { UserRolesService } from './services/flat/userRoles.service';
import { WarrantyService } from './services/flat/warranty.service';
import { PreprTeamMemberEntity } from './entities/prepr/prepr_TeamMember.entity';
import { PreprPreviousPurchaseEntity } from './entities/prepr/prepr_previousPurchase.entity';
import { PreviousPurchaseService } from './services/flat/previousPurchase.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './services/scheduler/scheduler.service';
import { PreprHistoryEntity } from './entities/prepr/prepr_history.entity';
import { PreprNotificationsEntity } from './entities/prepr/prepr_notifications.entity';
import { PrePrLevelsEntity } from './entities/prepr/prepr_Level.entity';
import { ExcelService } from './services/fileupload/excelupload.service';
import { PreprNotificationService } from './services/rfs/preprNotifitcation.service';
import { UpdateRFSService } from './services/rfs/updateRfs.service';
import { GetRFSService } from './services/rfs/getRfs.service';
import { DeleteRFSService } from './services/rfs/deleteRfs.service';
import { GetRFSByUserService } from './services/rfs/getRfsByUser.service';
import { GetRFSByUserTemplateService } from './services/rfsTemplate/getRfsTemplateBuUser.service';
import { UserController } from './controllers/user.controller';
import { GetAllUsers } from './services/user/getAllUser.service';
import { GetAllUsersByDepartmentId } from './services/user/getAllUserByDepartmentId.service';
import { SupplierService } from './services/flat/supplier.service';
import { CopyRFSTemplateService } from './services/rfsTemplate/copyRfsTemplate.service';
import { PartNumberService } from './services/flat/partNumber.service';
import { PartNumberEntity } from './entities/partnumber.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UploadBoqService } from './services/rfs/upload-boq.service';
import { ExportBOQService } from './services/rfs/export-boq.service';
import { CopyRFSService } from './services/rfs/copyRfs.service';
import { GetDepartmentService } from './services/user/getDepartment.service';
import { ImportPreprTemplateService } from './services/rfsTemplate/import-preprTemplateService';
import { ExportPrePrTemplateService } from './services/rfsTemplate/export-preprTemplate.service';
import { SampleBOQService } from './services/rfs/sample-boq.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './services/mail/mailservice.service';
import { ExportPrePrService } from './services/rfs/export-prepr.service';
import { ExportPrePrCopyService } from './services/rfs/export-prepr-copyservice';
import { UpdateRFS_StatusService } from './services/rfs/updateRfsStatus.service';
import { ApproveRFSService } from './services/rfs/rfsApprove.service';
import { RejectRFSService } from './services/rfs/rfsreject.service';
import { PrePrSummaryPdfService } from './services/rfs/preprSummary.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { RfxTemplateRepository } from './repos/rfx.template.repository';
import { RfxTemplateEntity } from './entities/rfx/rfx-template/rfx-template.entity';
import { RfxTemplateApprovalRouteEntity } from './entities/rfx/rfx-template/rfx-template-approval-route/rfx-template-approval-route.entity';
import { RfxTemplateEnvelopeEntity } from './entities/rfx/rfx-template/rfx-template-envelope/rfx-template-envelope.entity';
import { RfxTemplateTeamMemberEntity } from './entities/rfx/rfx-template/rfx-template-team-member.entity';
import { PreprNotificationsHistoryEntity } from './entities/prepr/prepr_notificationsHistory';
import { RfxEntity } from './entities/rfx/rfx-form/rfx.entity';
import { RfxRequestorEntity } from './entities/rfx/rfx-form/rfx-requestor.entity';
import { RfxEnvelopeEntity } from './entities/rfx/rfx-form/rfx-envelope.entity';
import { RfxSupplierEntity } from './entities/rfx/rfx-form/rfx-supplier.entity';
import { RfxTeamMemberEntity } from './entities/rfx/rfx-form/rfx-team-member.entity';
import { RfxEnvelopeEvaluatorEntity } from './entities/rfx/rfx-form/rfx-envelope-evaluator.entity';
import { RfxMeetingAttendeeEntity } from './entities/rfx/rfx-form/rfx-meeting-attendee.entity';
import { RfxTemplateEnvelopeAttachementEntity } from './entities/rfx/rfx-template/rfx-template-envelope/rfx-template-envelope-attachment.entity';
import { DepartmentEntity } from './entities/comon/department.entity';
import { UserRoleEntity } from './entities/comon/user-role.entity';
import { UserEntity } from './entities/comon/user.entity';
import { UserRepository } from './repos/comon-repos/user.repository';
import { UserRoleRepository } from './repos/comon-repos/user.role.repository';
import { DepartmentRepository } from './repos/comon-repos/department.repository';
import { RfxTemplateController } from './controllers/rfx-template/rfx-template.controller';
import { RfxTemplateUserEntity } from './entities/rfx/rfx-template/rfx-template-user.entity';
import { RfxTemplateTeamMemberRepository } from './repos/rfx-repos/rfx-template-repos/rfx-template-team-member.repository';
import { RfxTemplateEnvelopeRepository } from './repos/rfx-repos/rfx-template-repos/rfx-template-envelope-repo/rfx-template-envelope.repository';
import { RfxTemplateApprovalRouteRepository } from './repos/rfx-repos/rfx-template-repos/rfx-template-approval-repo/rfx-template-approval-route.repository';
import { RfxTemplateApprovalRouteLevelRepository } from './repos/rfx-repos/rfx-template-repos/rfx-template-approval-repo/rfx-template-approval-route-level.repository';
import { RfxTemplateApprovalRouteLevelEntity } from './entities/rfx/rfx-template/rfx-template-approval-route/rfx-template-approval-route-level.entity';
import { RfxTemplateConclusionOwnerEntity } from './entities/rfx/rfx-template/rfx-template-conclusion-owner.entity';
import { RfxTemplateConclusionOwnerRepository } from './repos/rfx-repos/rfx-template-repos/rfx-template-conclusion-owner.repository';
import { RfxTemplateUnmaskOwnerEntity } from './entities/rfx/rfx-template/rfx-template-unmask-owner.entity';
import { RfxTemplateUnmaskOwnerRepository } from './repos/rfx-repos/rfx-template-repos/rfx-template-unmask-owner.repository';
import { RfxFormController } from './controllers/rfx-form/rfx-form.controller';
import { AddRfxTemplateService } from './services/rfx/manage-rfx-template/add-rfx-template/add-rfx-template.service';
import { UpdateRfxTemplateService } from './services/rfx/manage-rfx-template/update-rfx-template/update-rfx-template.service';
import { GetRfxTemplateService } from './services/rfx/manage-rfx-template/get-rfx-template/get-rfx-template.service';
import { AddRfxFormService } from './services/rfx/manage-rfx-form/add-rfx-form/add-rfx-form.service';
import { GetRfxFormService } from './services/rfx/manage-rfx-form/get-rfx-form/get-rfx-form.service';
import { UpdateRfxFormService } from './services/rfx/manage-rfx-form/update-rfx-form/update-rfx-form.service';
import { RfxMeetingEntity } from './entities/rfx/rfx-form/rfx-meeting.entity';
import { RfxRepository } from './repos/rfx-repos/rfx-form-repos/rfx.repository';
import { RfxTeamMemberRepository } from './repos/rfx-repos/rfx-form-repos/rfx-team-member.repository';
import { RfxSupplierRepository } from './repos/rfx-repos/rfx-form-repos/rfx-supplier.repository';
import { RfxMeetingRepository } from './repos/rfx-repos/rfx-form-repos/rfx-meeting.repository';
import { RfxMeetingAttendeeRepository } from './repos/rfx-repos/rfx-form-repos/rfx-meeting-attendee.repository';
import { RfxEnvelopeRepository } from './repos/rfx-repos/rfx-form-repos/rfx-envelope.repository';
import { RfxEnvelopeEvaluatorRepository } from './repos/rfx-repos/rfx-form-repos/rfx-envelope-evaluator.repository';
import { RfxTemplateSourcingProposalRouteLevelRepository } from './repos/rfx-repos/rfx-template-repos/rfx-template-sourcing-proposal-repo/rfx-template-sourcing-proposal-route-level.repository';
import { RfxTemplateSourcingProposalRouteRepository } from './repos/rfx-repos/rfx-template-repos/rfx-template-sourcing-proposal-repo/rfx-template-sourcing-proposal-route.repository';
import { AutoEscalationRFSService } from './services/rfs/autoEscalation.service';
import * as path from 'path';
import { RfxTemplateQuestionnaireEntity } from './entities/rfx/rfx-template/rfx-template-questionnaire/rfx-template-questionnaire.entity';
import { RfxTemplateQuestionnaireSectionEntity } from './entities/rfx/rfx-template/rfx-template-questionnaire/rfx-template-questionnaire-section.entity';
import { RfxTemplateQuestionnaireRepository } from './repos/rfx-repos/rfx-template-repos/rfx-template-questionnaire-repo/rfx-template-questionnaire.repository';
import { RfxTemplateQuestionnaireSectionRepository } from './repos/rfx-repos/rfx-template-repos/rfx-template-questionnaire-repo/rfx-template-questionnaire-section.repository';
import { ManageRfxTemplateEnvelopeService } from './services/rfx/manage-rfx-template/manage-rfx-template-envelope/manage-rfx-template-envelope.service';
import { ManageRfxTemplateTeamMemberService } from './services/rfx/manage-rfx-template/manage-rfx-template-team-member/manage-rfx-template-team-member.service';
import { ManageRfxTemplateApprovalRouteService } from './services/rfx/manage-rfx-template/manage-rfx-template-approval-route/manage-rfx-template-approval-route.service';
import { ManageRfxTemplateProposalRouteService } from './services/rfx/manage-rfx-template/manage-rfx-template-proposal-route/manage-rfx-template-proposal-route.service';
import { ManageRfxTemplateConclusionOwnerService } from './services/rfx/manage-rfx-template/manage-rfx-template-conclusion-owner/manage-rfx-template-conclusion-owner.service';
import { ManageRfxTemplateUnmaskOwnerService } from './services/rfx/manage-rfx-template/manage-rfx-template-unmask-owner/manage-rfx-template-unmask-owner.service';
import { ManageRfxTemplateQuestionnaireService } from './services/rfx/manage-rfx-template/manage-rfx-template-questionnaire/manage-rfx-template-questionnaire.service';
import { PrePdfEntity } from './entities/prepr/prepr_pdf.entity';
import { DecimalService } from './services/flat/getFlatDecimal.service';
import { EventTypeService } from './services/flat/getEventType.service';
import { ExportSampleRfxTemplateService } from './services/rfx/manage-rfx-template/sample-rfx-template/sample-export-rfx-template.service';
import { ExportRfxTemplateListService } from './services/rfx/manage-rfx-template/export-rfx-template.service/export-rfx-template.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RfxFormQuestionnairSectionEntity } from './entities/rfx/rfx-form/rfx-form-questionnair-section.entity';
import { RfxFormQuestionnairSectionAttachementEntity } from './entities/rfx/rfx-form/rfx-form-questionnair-section-attachement.entity';
import { RfxFormQuestionnairEntity } from './entities/rfx/rfx-form/rfx-form-questionnair.entity';
import { RfxApprovalEntity } from './entities/rfx/rfx-form/rfx-approvals/rfx-approval.entity';
import { RfxApprovalLevelEntity } from './entities/rfx/rfx-form/rfx-approvals/rfx-approval-level';
import { RfxSourcingProposalEntity } from './entities/rfx/rfx-form/rfx-proposal-approval/rfx-proposal-approval.entity';
import { RfxSourcingProposalLevelEntity } from './entities/rfx/rfx-form/rfx-proposal-approval/rfx-proposal.approval-level';
import { RfxBillOfQuantityEntity } from './entities/rfx/rfx-form/rfx-billofquantity.entity';
import { RecommendedSupplierEntity } from './entities/rfx/rfx-form/rfx-recommandedSuppliers.entity';
import { RfxMeeingContactPersonsEntity } from './entities/rfx/rfx-form/rfx-meeting-contact-person.entity';
import { RfxTemplateQuestionAttachementEntity } from './entities/rfx/rfx-template/rfx-template-questionnaire/rfx-template-question-attachment.entity';
import { RfxFormQuestionnairAttachementRepository } from './repos/rfx-repos/rfx-form-repos/rfx-form-questionnair.section-attachement';
import { RfxFormQuestionnairRepository } from './repos/rfx-repos/rfx-form-repos/rfx-form-questionnair.repository';
import { RfxBillOfQuantityEntityRepository } from './repos/rfx-repos/rfx-form-repos/rfx-bill-of-quantity.repository';
import { RfxApprovalEntityRepository } from './repos/rfx-repos/rfx-form-repos/rfx-approval-repos/rfx-approval.repository';
import { RfxTemplateQuestionAttachmentRepository } from './repos/rfx-repos/rfx-template-repos/rfx-template-questionnaire-repo/rfx-template-question-attachment.repository';
import { RfxTemplateQuestionRepository } from './repos/rfx-repos/rfx-template-repos/rfx-template-questionnaire-repo/rfx-template-question-repository';
import { RfxApprovalLevelEntityRepository } from './repos/rfx-repos/rfx-form-repos/rfx-approval-repos/rfx-approval-level.repository';
import { RfxSourcingProposalEntityRepository } from './repos/rfx-repos/rfx-form-repos/rfx-sourcing-proposal.repository';
import { RfxSourcingProposalLevelEntityRepository } from './repos/rfx-repos/rfx-form-repos/rfx-sourcing-proposal-level.repository';
import { DocumetsController } from './controllers/documets/documets.controller';
import { RfxTemplateUserRepository } from './repos/rfx-repos/rfx-template-repos/rfx-template-user-repo';
import { CopyPrePrDataService } from './services/rfs/copyPreprData.service';
import { PreprCopyEntity } from './entities/prepr/prepr.entitycopy';
import { PrePrLevelsCopyEntity } from './entities/prepr/prepr_Level.entitycopy';
import { PreprTeamMemberCopyEntity } from './entities/prepr/prepr_TeamMember.entitycopy';
import { PreprBillOfQuantityCopyEntity } from './entities/prepr/prepr-bill-of-quantity.entityCopy';
import { RFSCopyRepository } from './repos/rfsCopy.repository';
import { PreprSupplierCopyEntity } from './entities/prepr/prepr-supplier.entitycopy';
import { RfxSupportingDocumentRepository } from './repos/rfx-repos/rfx-form-repos/rfx-supporting-document.repository';
import { RfxSupportingDocumentEntity } from './entities/rfx/rfx-form/rfx-supporting-document';
import { AzureStorageModule, AzureStorageService } from '@nestjs/azure-storage';
import { SupportingDocumentEntity } from './entities/documents/supporting-documents.entity';
import { DocumentsRepository } from './repos/rfx-repos/documents/documents.repository';
import { DocumentUploadService } from './services/documentUpload/document-upload.service';
import { ProcStorageService } from './services/azure-storage-service/storage-service';
import { RfxSelectedSupplierEntity } from './entities/rfx/rfx-form/rfx-selected-supplier.entity';
import { RfxTemplateQuestionEntity } from './entities/rfx/rfx-template/rfx-template-questionnaire/rfx-template-question.entity';
import { RfxTemplateSourcingProposalRouteEntity } from './entities/rfx/rfx-template/rfx-template-sourcing-proposal-route/rfx-template-sourcing-proposal-route.entity';
import { RfxTemplateSourcingProposalRouteLevelEntity } from './entities/rfx/rfx-template/rfx-template-sourcing-proposal-route/rfx-template-sourcing-proposal-route-level.entity';
import { RFSTemplateEntity } from './entities/preprTemplate/preprTemplate.entity';
import { RfxTemplateEnvelopeApproverEntity } from './entities/rfx/rfx-template/rfx-template-envelope/rfx-template-envelope-approver.entity';
import { SupplierEntity } from './entities/supplier/supplier.entity';
import { IndustryCategoryEntity } from './entities/supplier/industry-category.entity';
import { SupplierTagsEntity } from './entities/supplier/supplier-tag.entity';
import { SupplierRoleEntity } from './entities/supplier/supplier-role.entity';
import { SupplierModuleAccessEntity } from './entities/supplier/supplier-module-acces.entity';
import { RfxMeetingRemindersEntity } from './entities/rfx/rfx-form/rfx-meeting-reminders.entity';
import { SupplierController } from './controllers/supplier/supplier.controller';
import { GetSupplierListService } from './services/supplier/get-supplier-list/get-supplier-list.service';
import { GetSupplierModuleAccessService } from './services/supplier/get-supplier-module-access/get-supplier-module-access-rights.service';
import { GetSingleSupplierModuleAccessRight } from './services/supplier/get-single-supplier-module-access-rights/get-single-supplier-module-access-rights.service';
import { GetSupplierRoleListService } from './services/supplier/get-supplier-role-list/get-supplier-role-list.service';
import { GetSingleSupplierRoleService } from './services/supplier/get-single-supplier-role/get-single-supplier-role.service';
import { UpdateSupplierRoleService } from './services/supplier/update-supplier-role/update-supplier-role.service';
import { UpdateSupplierService } from './services/supplier/update-supplier/update-supplier.service';
import { UpdateSupplierModuleAccessService } from './services/supplier/update-supplier-module-acces-rights/update-supplier-module-access-rights.service';
import { GetSingleSupplierService } from './services/supplier/get-single-supplier/get-single-supplier.service';
import { ExportSupplierModuleAccessRightsService } from './services/supplier/export-supplier-module-access-rights/export-supplier-module-access-rights.service';
import { ExportSupplierRoleService } from './services/supplier/export-supplier-role/export-supplier-role.service';
import { ExportSupplierTemplateService } from './services/supplier/export-supplier-template/export-supplier-template.service';
import { ExportSupplierService } from './services/supplier/export-supplier/export-supplier.service';
import { CreateSupplierRoleService } from './services/supplier/create-supplier-role/create-supplier-role.service';
import { CreateSupplierModuleAccessService } from './services/supplier/create-supplier-module-access/create-supplier-module-access-rights.service';
import { UploadSupplierService } from './services/supplier/upload-supplier/upload-supplier.service';
import { GetIndustryCategoryListService } from './services/supplier/get-industry-category-list/get-industry-category-list.service';
import { GetSupplierTagsListService } from './services/supplier/get-supplier-tags-list/get-supplier-tags-list.service';
import { GetSingleIndustryCategoryService } from './services/supplier/get-single-industry-category/get-single-industry-category.service';
import { GetSingleSupplierTagService } from './services/supplier/get-single-supplier-tag/get-single-supplier-tag.service';
import { CategorySupplierService } from './services/supplier/create-suppliers-category/create-suppliers-category.service';
import { GetSupplierCategoryService } from './services/supplier/get-supplier-category/get-supplier-category.service';
import { UpdateCategorySupplierService } from './services/supplier/update-suppliers-category/update-suppliers-category.service';
import { SupplierCategoryRepository } from './repos/supplier-repos/supplier-category.repository';
import { CategorySupplierRepository } from './repos/supplier-repos/category-supplier.repository';
import { CategorySupplierEntity } from './entities/supplier/category-supplier.entity';
import { SupplierCategoryEntity } from './entities/supplier/supplier-category.entity';
import { SupplierRepository } from './repos/supplier-repos/supplier.repository';
import { SupplierModuleAccessRightsRepository } from './repos/supplier-repos/supplier-module-access-rights.repository';
import { SupplierRoleRepository } from './repos/supplier-repos/supplier-role.repository';
import { RfxApprovalLevelHistoryEntity } from './entities/rfx/rfx-form/rfx-approvals/rfx-approval-level-history.entity';
import { RfxApprovalLevelService } from './services/rfx/manage-rfx-form/manage-rfx-approval/rfx-approval-level/rfx-approval-level.service';
import { RfxApprovalLevelHistoryService } from './services/rfx/manage-rfx-form/manage-rfx-approval/rfx-approval-level-history/rfx-approval-level-history.service';
import { RfxApprovalService } from './services/rfx/manage-rfx-form/manage-rfx-approval/rfx-approval/rfx-approval.service';
import { RfxApprovalLevelHistoryEntityRepository } from './repos/rfx-repos/rfx-form-repos/rfx-approval-repos/rfx-approval-level-history.repository';
import { RfxEnvelopeApproverEntity } from './entities/rfx/rfx-form/rfx-envelope.approvar.entity';
import { RfxUnmaskOwnerEntity } from './entities/rfx/rfx-form/rfx-unmask-owners.entity';
import { InvoiceDetailsEntity } from './entities/paymentRemittance/buyer-invoice/invoice-details.entity';
import { PaymentRemittanceEntity } from './entities/paymentRemittance/buyer-invoice/payment-remittance.entity';
import { PaymentRemittanceController } from './controllers/paymentRemittance/payment-remittance.controller';
import { GetInvoiceFormService } from './services/paymentRemittance/buyer/payment-remittance.service';
import { PaymentRemittanceRepository } from './repos/payment-remittance/payment-remittance.repository';
import { RfxSelectedSupplierRepository } from './repos/rfx-repos/rfx-form-repos/rfx-form-selected-supplier.repository';
import { ManageSupplierService } from './services/rfx/manage-rfx-form/manage-supplier/manage-supplier.service';
import { RfxFormQuestionEntity } from './entities/rfx/rfx-form/rfx-form-question.entity';
import { GetPaymentInvoiceListService } from './services/paymentRemittance/buyer/payment-invoice-details.service';
import { ExportPaymentService } from './services/paymentRemittance/buyer/export-payment-remittacne.service';
import { RfxSupplierResponseMessageEntity } from './entities/rfx/rfx-supplier-response/rfx-supplier-res-message/rfx-supplier-res-message.entity';
import { RfxSupplierResponseMessageSupportingDocumentEntity } from './entities/rfx/rfx-supplier-response/rfx-supplier-res-message/rfx-supplier-res-message-doc.entity';
import { RfxSupplierResponseMeetingAttendeeEntity } from './entities/rfx/rfx-supplier-response/rfx-supplier-res-meeting-attendee.entity';
import { RfxSupplierResponseSupportingDocumentEntity } from './entities/rfx/rfx-supplier-response/rfx-supplier-res-doc.entity';
import { RfxSupplierResponseAnswerEntity } from './entities/rfx/rfx-supplier-response/rfx-supplier-res-answer.entity';
import { RfxSupplierResponseEntity } from './entities/rfx/rfx-supplier-response/rfx-supplier-res.entity';
import { ExportSupplierPaymentService } from './services/paymentRemittance/supplier/export-payment-remittacne.service';
import { GetSupplierPaymentInvoiceListService } from './services/paymentRemittance/supplier/payment-invoice-details.service';
import { GetSuplierInvoiceFormService } from './services/paymentRemittance/supplier/payment-remittance.service';

//pr
// import { PrTemplateUserEntity } from './entities/prTemplates/prTemplate_User.entity';
// import { CreatePrTemplateService } from './services/prTemplate/createPrTemplate.service';
// import { PrTemplateRepository } from './repos/pr_Repos/prTemplate.repository';
// import { UpdatePRTemplateService } from './services/prTemplate/updatePrTemplate.service';
import { BuyerPaymentRemittancePdfEntity } from './entities/paymentRemittance/buyer-invoice/paymentRemittancePdf.entity';
import { GetPDfService } from './services/paymentRemittance/buyer/generatePdf.service';
import { BuyerPaymentRemittancePdfService } from './services/paymentRemittance/buyer/paymentRemittanceSummary.service';
import { LoginService } from './services/supplier/login/supplier-login-service';
// import { GetPrTemplateByUserService } from './services/prTemplate/getPRtemplateUsers.service';
// import { DeletePrTemplateService } from './services/prTemplate/deletePrTemplate.service';

import { SupplierPaymentRemittancePdfService } from './services/paymentRemittance/supplier/paymentRemittanceSummary.service';
import { SupplierPaymentRemittancePdfEntity } from './entities/paymentRemittance/supplier-invoice/paymentRemittancePdf.entity';
import { GetSupplierPdfService } from './services/paymentRemittance/supplier/generatePdf.service';
import { AddRfxSupplierResponseService } from './services/rfx/manage-rfx-supplier-response/add-rfx-supplier-response/add-rfx-supplier-response.service';
import { GetRfxSupplierResponseService } from './services/rfx/manage-rfx-supplier-response/get-rfx-supplier-response/get-rfx-supplier-response.service';
import { SupplierResponseController } from './controllers/supplier-response/supplier-response.controller';
import { RfxSupplierResponseRepository } from './repos/rfx-repos/rfx-supplier-response-repos/rfx-supplier-res.repository';
import { SupplierPurchasingOrgEntity } from './entities/supplier/supplier-purchase-org.entity';
import { CostCenterEntity } from './entities/masterData/costCentre.entity';
import { PurchaseOrgEntity } from './entities/masterData/purchaseOrg.entity';
import { UOMEntity } from './entities/masterData/uom.entity';
import { WarrantyEntity } from './entities/masterData/warranty.entity';
import { ImportRfxTemplateService } from './services/rfx/manage-rfx-template/import-rfx-template/import-rfx-template.service';
import { RfxSupplierResponseBoqItemEntity } from './entities/rfx/rfx-supplier-response/rfx-supplier-res-boq/rfx-supplier-res-boq-item.entity';
import { RfxSupplierResponseBoqEntity } from './entities/rfx/rfx-supplier-response/rfx-supplier-res-boq/rfx-supplier-res-boq.entity';
import { ManagePrTemplateECAPEXApprovalRouteService } from './services/prTemplate/managePrTemplateECAPEXApprovalRoutes/managePrTemplateECAPEXApprovalRoute.service';
import { UpdatePrTemplateService } from './services/prTemplate/updatePrTemplate/updatePrTemplate.service';
import { ManagePrTemplateTeamMembersService } from './services/prTemplate/managePrTemplateTeamMembers/managePrTemplateTeamMembers.service';
import { PrTemplateEntity } from './entities/prTemplates/prTemplates.entity';
import { PrTemplateUserEntity } from './entities/prTemplates/prTemplateUser.entity';
import { PrTemplateApprovalEntity } from './entities/prTemplates/prTemplateApprovalRoute/prTemplateApproval.entity';
import { PrECAPEXTemplateApprovalEntity } from './entities/prTemplates/prTemplateECAPEXApprovalRoute/prTemplateECAPEXApproval.entity';
import { PReCAPEXTemplateApprovalLevelEntity } from './entities/prTemplates/prTemplateECAPEXApprovalRoute/prTemplateECAPEXApprovalLevel.entity';
import { PrTemplateTeamMembersEntity } from './entities/prTemplates/prTemplateTeamMembers.entity';
import { PRTemplateApprovalLevelEntity } from './entities/prTemplates/prTemplateApprovalRoute/prTemplateApprovalLevel.entity';
import { PrTemplateApprovalRepository } from './repos/pr_Repos/prTemplateApprovalRepo/prTemplateApproval.repository';
import { PrTemplateECAPEXApprovalLevelRepository } from './repos/pr_Repos/prTemplateECAPEXApprovalRepo/prTemplateECAPEXApprovalLevel.repository';
import { PrTemplateApprovalLevelRepository } from './repos/pr_Repos/prTemplateApprovalRepo/prTemplateApprovalLevel.repository';
import { PrTeamMembersRepository } from './repos/pr_Repos/prTemplateTeamMembersRepo/prTeamMembers.repository';
import { PRTemplateRepository } from './repos/pr_Repos/prTemplateNew.repository';
import { PrTemplateECAPEXApprovalRepository } from './repos/pr_Repos/prTemplateECAPEXApprovalRepo/prTemplateECAPEXApproval.repository';
import { PrTemplateController } from './controllers/prTemplate/prTemplate.controller';
import { AddPRTemplateService } from './services/prTemplate/addPrTemplate/createPrTemplate.service';
import { ExportPrTemplateService } from './services/prTemplate/exportPrTemplate/exportPrTemplate.service';
import { GetPrTemplateService } from './services/prTemplate/getPrTemplate/getPrTemplate.service';
import { ManagePrTemplateApprovalRouteService } from './services/prTemplate/managePrTemplateApprovalRoutes/managePrTemplateApprovalRoute.service';
import { RfxBuyerAttendanceResponseService } from './services/rfx/manage-rfx-buyer-response/rfx-buyer-attendance-response/rfx-buyer-attendance-response.service';
import { RfxBuyerProgressResponseService } from './services/rfx/manage-rfx-buyer-response/rfx-buyer-progress-response/rfx-buyer-progress-response.service';
import { ImportPrTemplateService } from './services/prTemplate/importPrTemplate/importPrTemplate.service';
import { SampleExportPrTemplateService } from './services/prTemplate/samplePrTemplate/sampleExportPrTemplate.service';
import { RfxBuyerSourcingProgressEvaluationController } from './controllers/rfx-buyer-sourcing-progress-evaluation/rfx-buyer-sourcing-progress-evaluation.controller';
import { PREntity } from './entities/pr/pr.entity';
import { PRTeamMemberEntity } from './entities/pr/pr_teamMembers.entity';
import { PrJustificationDocumentEntity } from './entities/pr/pr-justification-document.entity';
import { PrEXCODocumentEntity } from './entities/pr/pr-exco-document.entity';
import { PrOtherDocumentEntity } from './entities/pr/pr-other-document.entity';
import { PRRepository } from './repos/pr_Repos/pr.repository';
import { PrController } from './controllers/pr/pr.controller';
import { PrService } from './services/pr/pr.service';
import { PrECAPEXApprovalRouteRepository } from './repos/pr_Repos/pr_ecapex_approver.repository';
import { PrApprovalRouteEntity } from './entities/pr/pr-approval-route.entity';
import { PrApprovalRouteRepository } from './repos/pr_Repos/pr_approver.repository';
import { PrECAPEXApprovalRouteEntity } from './entities/pr/pr-capex-approval.entity';
import { PRSupplierEntity } from './entities/pr/pr_supplier.entity';
import { PrECAPEXApprovalRouteUserEntity } from './entities/pr/pr-ecapex-approval-route-user.entity';
import { PrApprovalRouteUserEntity } from './entities/pr/pr_approval_route_user.entity';
import { UserPrePrEntity } from './entities/comon/user-pre-pr.entity';
import { RfxSupplierAttendanceResponseService } from './services/rfx/manage-rfx-supplier-response/rfx-supplier-attendance-response/rfx-supplier-attendance-response.service';
import { RfxSupplierMessageResponseService } from './services/rfx/manage-rfx-supplier-response/rfx-supplier-message-response/rfx-supplier-message-response.service';
import { RfxSupplierResponseMeetingAttendeeRepository } from './repos/rfx-repos/rfx-supplier-response-repos/rfx-supplier-res-meeting-attendee.repository';
import { RfxSupplierResponseMessageRepository } from './repos/rfx-repos/rfx-supplier-response-repos/rfx-supplier-res-message.repository';
import { PurchaseOrgRepository } from './repos/comon-repos/purchasingOrg.repository';

const rfxSupplierResponseEntities = [
  RfxSupplierResponseEntity,
  RfxSupplierResponseMessageEntity,
  RfxSupplierResponseMessageSupportingDocumentEntity,
  RfxSupplierResponseMeetingAttendeeEntity,
  RfxSupplierResponseSupportingDocumentEntity,
  RfxSupplierResponseAnswerEntity,
  RfxSupplierResponseRepository,
  RfxSupplierResponseBoqItemEntity,
  RfxSupplierResponseBoqEntity,
  RfxSupplierResponseMeetingAttendeeRepository,
  RfxSupplierResponseMessageRepository,
];
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          service: Environment.mail.service,
          auth: {
            user: Environment.mail.user,
            pass: Environment.mail.pass,
          },
          // defaults: {
          //   from: '<sendgrid_from_email_address>'
          // },
          template: {
            dir: join(__dirname, './mailTemplate'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },

          // host: 'umwtw01.toyota.com.my',
          // port: 25,
          // secure: false,
          // auth: {
          //   user: 'gpd@toyota.com.my',
          //   pass: 'gpd87655',
          // },
          // tls: {
          //   rejectUnauthorized: false,
          // },
        },
        // defaults: {
        //   from: '<sendgrid_from_email_address>'
        // },
        template: {
          dir: join(__dirname, './mailTemplate'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    AzureStorageModule.withConfig(Environment.getAzureStorageOptionsConst()),

    // MailerModule.forRoot({
    //   transport: {
    //     service: "Gmail",
    //     auth: {
    //       user: "fournotone@gmail.com",
    //       pass: "rsinvhuyolhclwhv",
    //     },
    //     tls: {
    //       rejectUnauthorized: false,
    //     },
    //   }
    TypeOrmModule.forRoot({
      // name:"p2p-buye",
      type: 'postgres',
      host: Environment.postgres.host,
      port: parseInt(Environment.postgres.port),
      username: Environment.postgres.username,
      password: Environment.postgres.password,
      database: Environment.postgres.database,
      // ssl: {
      //   ca: Environment.postgres.cert
      // },
      autoLoadEntities: true,
      synchronize: true,
      entities: [
        RfxTemplateEntity,
        RfxTemplateApprovalRouteEntity,
        RfxTemplateTeamMemberEntity,
        RfxTemplateEnvelopeEntity,
        RfxTemplateEnvelopeAttachementEntity,
        RfxTemplateApprovalRouteLevelEntity,
        RfxTemplateApprovalRouteEntity,
        RfxEntity,
        RfxRequestorEntity,
        RfxEnvelopeEntity,
        RfxMeetingEntity,
        RfxSupplierEntity,
        SupplierEntity,
        SupplierRoleEntity,
        SupplierTagsEntity,
        IndustryCategoryEntity,
        SupplierPurchasingOrgEntity,
        SupplierModuleAccessEntity,
        RfxTeamMemberEntity,
        RfxEnvelopeEvaluatorEntity,
        RfxMeetingAttendeeEntity,
        DepartmentEntity,
        UserRoleEntity,
        UserEntity,
        UserPrePrEntity,
        RfxTemplateUserEntity,
        RfxTemplateConclusionOwnerEntity,
        RfxTemplateUnmaskOwnerEntity,
        PrePdfEntity,
        RfxFormQuestionnairSectionEntity,
        RfxFormQuestionnairSectionAttachementEntity,
        RfxTemplateQuestionAttachementEntity,
        RfxTemplateQuestionEntity,
        RfxFormQuestionnairEntity,
        RfxApprovalLevelEntity,
        RfxApprovalEntity,
        RfxApprovalLevelHistoryEntity,
        RfxSourcingProposalEntity,
        RfxTemplateSourcingProposalRouteEntity,
        RfxSourcingProposalLevelEntity,
        RfxBillOfQuantityEntity,
        RecommendedSupplierEntity,
        RfxMeeingContactPersonsEntity,
        RfxSupportingDocumentEntity,
        SupportingDocumentEntity,
        RfxTemplateQuestionAttachementEntity,
        RfxTemplateQuestionEntity,
        RfxTemplateSourcingProposalRouteEntity,
        RfxTemplateSourcingProposalRouteLevelEntity,
        RFSTemplateEntity,
        PreprEntity,
        PreprCopyEntity,
        RfxMeetingRemindersEntity,
        CategorySupplierEntity,
        SupplierCategoryEntity,
        SupplierEntity,
        RfxEnvelopeApproverEntity,
        RfxUnmaskOwnerEntity,
        RfxFormQuestionEntity,
        PREntity,
        PRTeamMemberEntity,
        PrJustificationDocumentEntity,
        PrEXCODocumentEntity,
        PrOtherDocumentEntity,
        PRSupplierEntity,

        //pr
        PrTemplateEntity,
        PrTemplateUserEntity,
        ...rfxSupplierResponseEntities,
        PrTemplateApprovalEntity,
        PRTemplateApprovalLevelEntity,
        PReCAPEXTemplateApprovalLevelEntity,
        PrECAPEXTemplateApprovalEntity,
        PrTemplateTeamMembersEntity,
      ],

      // logging: true,
    }),
    ///   #################__RFX BUYER REPOSITORY_________##############
    TypeOrmModule.forFeature([
      RfxSupplierEntity,
      PreprDeliveryAddressEntity,
      PreprSupplierEntity,
      PreprSupportingDocumentEntity,
      PreprWarrantyEntity,
      PreprCostCenterEntity,
      PreprBillOfQuantityEntity,
      PreprEntity,
      PreprCopyEntity,
      PrePrLevelsCopyEntity,
      PreprTeamMemberCopyEntity,
      PreprBillOfQuantityCopyEntity,
      PreprSupplierCopyEntity,
      PreprTeamMemberEntity,
      RfsTemplateTeamMemberEntity,
      RfsTemplateLevelsEntity,
      RFSTemplateEntity,
      RFSTemplateRepository,
      RFSCopyRepository,
      PreprPreviousPurchaseEntity,
      PreprHistoryEntity,
      PreprNotificationsEntity,
      PrePrLevelsEntity,
      RfxTemplateRepository,
      RfxTemplateTeamMemberRepository,
      RfxTemplateEnvelopeRepository,
      RfxTemplateApprovalRouteRepository,
      RfxTemplateApprovalRouteLevelRepository,
      RfxTemplateConclusionOwnerRepository,
      RfxTemplateUnmaskOwnerRepository,
      RfxTemplateEnvelopeEntity,
      RfxTemplateQuestionnaireEntity,
      RfxTemplateQuestionnaireSectionEntity,
      RfxTemplateQuestionEntity,
      RfxTemplateQuestionAttachementEntity,
      RfxTemplateSourcingProposalRouteEntity,
      RfxTemplateSourcingProposalRouteLevelRepository,
      RfxTemplateSourcingProposalRouteRepository,
      RfxTemplateQuestionnaireRepository,
      RfxTemplateQuestionnaireSectionRepository,
      PreprNotificationsHistoryEntity,
      RfxRepository,
      RfxTeamMemberRepository,
      RfxSupplierRepository,
      RfxMeetingRepository,
      RfxMeetingAttendeeRepository,
      RfxEnvelopeRepository,
      RfxEnvelopeEvaluatorRepository,
      RfxFormQuestionnairSectionEntity,
      RfxFormQuestionnairRepository,
      RfxFormQuestionnairAttachementRepository,
      RfxApprovalEntityRepository,
      RfxBillOfQuantityEntityRepository,
      RfxSourcingProposalLevelEntityRepository,
      RfxSourcingProposalEntityRepository,
      RfxApprovalLevelEntityRepository,
      RfxApprovalLevelHistoryEntityRepository,
      RfxTemplateQuestionRepository,
      RfxTemplateQuestionAttachmentRepository,
      RfxTemplateUserRepository,
      // RecommendedSupplierEntity,
      DocumentsRepository,
      DepartmentRepository,
      DepartmentEntity,
      UserEntity,
      UserRepository,
      RfxSupportingDocumentRepository,
      // RecommendedSupplierEntity,
      RfxSelectedSupplierEntity,
      RfxTemplateQuestionAttachementEntity,
      RfxTemplateQuestionEntity,
      RfxTemplateSourcingProposalRouteEntity,
      RfxTemplateSourcingProposalRouteLevelEntity,
      RFSRepository,
      RfxTemplateEnvelopeApproverEntity,
      SupplierCategoryRepository,
      CategorySupplierRepository,
      SupplierRepository,
      SupplierModuleAccessRightsRepository,
      SupplierRoleRepository,
      RfxUnmaskOwnerEntity,
      InvoiceDetailsEntity,
      PaymentRemittanceEntity,
      PaymentRemittanceRepository,
      RfxSelectedSupplierRepository,
      RfxSelectedSupplierRepository,
      RfxFormQuestionEntity,
      BuyerPaymentRemittancePdfEntity,
      SupplierPaymentRemittancePdfEntity,
      CostCenterEntity,
      PurchaseOrgEntity,
      UOMEntity,
      WarrantyEntity,
      ...rfxSupplierResponseEntities,
      PRTemplateRepository,
      PrTemplateApprovalRepository,
      PrTemplateApprovalLevelRepository,
      PrTemplateECAPEXApprovalRepository,
      PrTemplateECAPEXApprovalLevelRepository,
      PrTeamMembersRepository,
      PRRepository,
      PrECAPEXApprovalRouteRepository,
      PrECAPEXApprovalRouteUserEntity,
      PrApprovalRouteRepository,
      PrApprovalRouteUserEntity,
      UserRoleRepository,
      PurchaseOrgRepository,
    ]),
    TypeOrmModule.forRoot({
      name: Environment.postgres.flatdatabase,
      type: 'postgres',
      host: Environment.postgres.host,
      port: parseInt(Environment.postgres.port),
      username: Environment.postgres.username,
      password: Environment.postgres.password,
      database: Environment.postgres.flatdatabase,
      // ssl: {
      //   ca: Environment.postgres.cert
      // },
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature(
      [PartNumberEntity],
      Environment.postgres.flatdatabase,
    ),
    TypeOrmModule.forRoot({
      name: Environment.postgres.userdatabase,
      type: 'postgres',
      host: Environment.postgres.host,
      port: parseInt(Environment.postgres.port),
      username: Environment.postgres.username,
      password: Environment.postgres.password,
      database: Environment.postgres.userdatabase,
      // ssl: {
      //   ca: Environment.postgres.cert
      // },
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([], Environment.postgres.userdatabase),
    TypeOrmModule.forRoot({
      name: Environment.postgres.supplierdatabase,
      type: 'postgres',
      host: Environment.postgres.host,
      port: parseInt(Environment.postgres.port),
      username: Environment.postgres.username,
      password: Environment.postgres.password,
      database: Environment.postgres.supplierdatabase,
      // ssl: {
      //   ca: Environment.postgres.cert
      // },
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([], Environment.postgres.supplierdatabase),
    ScheduleModule.forRoot(),
    JwtModule.register({
      secret: 'my-super-secret',
    }),
  ],
  controllers: [
    PrePrController,
    AppController,
    PreprTemplateController,
    FlatController,
    FileController,
    UserController,
    RfxTemplateController,
    RfxFormController,
    // PrController,
    DocumetsController,
    SupplierController,
    PaymentRemittanceController,
    PrTemplateController,
    SupplierResponseController,
    RfxBuyerSourcingProgressEvaluationController,
    PrController,
  ],
  providers: [
    AppService,
    RFSService,
    LoginService,
    CreateRFSTemplateService,
    GetRFSTemplateService,
    UpdateRFSTemplateService,
    DeleteRFSTemplateService,
    GetFlatCostService,
    GetFlatDepartmentService,
    GetFlatCurrencyService,
    GetFlatPurchaseOrgService,
    AddressService,
    BusinessAreaService,
    CompanyService,
    AccountAssignmentService,
    GlCodeService,
    IndustryCategoryService,
    InternalOrderService,
    PaymentTermService,
    PlantService,
    ProfitCenterService,
    SAPClassService,
    SAPModelService,
    SAPSeriesService,
    SupplierTagService,
    UOMService,
    UserRolesService,
    WarrantyService,
    PreviousPurchaseService,
    FileUpload,
    SchedulerService,
    PreprNotificationService,
    ExcelService,
    UpdateRFSService,
    GetRFSService,
    DeleteRFSService,
    GetRFSByUserService,
    GetRFSByUserTemplateService,
    PartNumberService,
    JwtStrategy,
    GetAllUsers,
    GetAllUsersByDepartmentId,
    SupplierService,
    CopyRFSTemplateService,
    UploadBoqService,
    ExportBOQService,
    ExportPrePrTemplateService,
    ImportPreprTemplateService,
    CopyRFSService,
    GetDepartmentService,
    SampleBOQService,
    MailService,
    ExportPrePrService,
    ExportPrePrCopyService,
    UpdateRFS_StatusService,
    ApproveRFSService,
    RejectRFSService,
    PrePrSummaryPdfService,
    // UserRepository,
    // UserRoleRepository,
    // DepartmentRepository,
    AddRfxTemplateService,
    UpdateRfxTemplateService,
    GetRfxTemplateService,
    AddRfxFormService,
    ExportSampleRfxTemplateService,
    ExportRfxTemplateListService,
    GetRfxFormService,
    UpdateRfxFormService,
    AutoEscalationRFSService,
    ManageRfxTemplateQuestionnaireService,
    ManageRfxTemplateEnvelopeService,
    ManageRfxTemplateTeamMemberService,
    ManageRfxTemplateApprovalRouteService,
    ManageRfxTemplateProposalRouteService,
    ManageRfxTemplateConclusionOwnerService,
    ManageRfxTemplateUnmaskOwnerService,
    CopyPrePrDataService,
    DecimalService,
    EventTypeService,
    DocumentUploadService,
    // AzureStorageService,
    ProcStorageService,
    RfxApprovalService,
    GetSupplierListService,
    GetSupplierModuleAccessService,
    GetSingleSupplierModuleAccessRight,
    GetSupplierRoleListService,
    GetSingleSupplierRoleService,
    UpdateSupplierRoleService,
    UpdateSupplierService,
    GetSingleSupplierService,
    UpdateSupplierModuleAccessService,
    ExportSupplierModuleAccessRightsService,
    ExportSupplierRoleService,
    ExportSupplierTemplateService,
    ExportSupplierService,
    CreateSupplierRoleService,
    CreateSupplierModuleAccessService,
    UploadSupplierService,
    GetIndustryCategoryListService,
    GetSupplierTagsListService,
    GetSingleIndustryCategoryService,
    GetSingleSupplierTagService,
    CategorySupplierService,
    GetSupplierCategoryService,
    UpdateCategorySupplierService,
    RfxApprovalLevelService,
    RfxApprovalLevelHistoryService,
    GetInvoiceFormService,
    ExportPaymentService,
    GetPaymentInvoiceListService,
    ManageSupplierService,
    GetSuplierInvoiceFormService,
    GetSupplierPaymentInvoiceListService,
    ExportSupplierPaymentService,
    // PaymentRemittancePdfService,
    GetPDfService,
    AddPRTemplateService,
    ExportPrTemplateService,
    GetPrTemplateService,
    ManagePrTemplateApprovalRouteService,
    ManagePrTemplateECAPEXApprovalRouteService,
    ManagePrTemplateTeamMembersService,
    UpdatePrTemplateService,
    BuyerPaymentRemittancePdfService,
    SupplierPaymentRemittancePdfService,
    GetSupplierPdfService,
    AddRfxSupplierResponseService,
    GetRfxSupplierResponseService,
    ImportRfxTemplateService,
    RfxBuyerAttendanceResponseService,
    RfxBuyerProgressResponseService,
    ImportPrTemplateService,
    SampleExportPrTemplateService,
    PrService,
    RfxSupplierAttendanceResponseService,
    RfxSupplierMessageResponseService,
  ],
})
export class AppModule {}
