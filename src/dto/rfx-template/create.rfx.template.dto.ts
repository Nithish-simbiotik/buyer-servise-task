import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { RfxEventType, RfxTemplateStatus } from 'src/enum/rfx/rfx.enum';
import { TeamMemberType } from 'src/enum/team-member/team-member-type.enum';
import { RfxTemplateDepartmentDto } from './rfx-template-department.dto';
import { RfxTemplateQuestionnaireDto } from './rfx-template-questionnaire.dto';

export class RfxTemplateApprovalRouteDto {
  @ApiPropertyOptional()
  @IsOptional()
  enableApprovalReminders: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  visible: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  hoursPerReminder: number;
  @ApiPropertyOptional()
  @IsOptional()
  reminderFrequency: number;
  @ApiPropertyOptional()
  @IsOptional()
  notifyOnFinalReminder: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  canAddAdditionalApproval: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  canApproveResume: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  approvalLevels: {
    levelName: string;
    userId: number;
    levelSequence: number;
  }[];
}

export class RfxTemplateEnvelopeDto {
  @ApiPropertyOptional()
  @IsOptional()
  envelopeName: string;

  @ApiPropertyOptional()
  @IsOptional()
  envelopeSequence: number;

  @ApiPropertyOptional()
  @IsOptional()
  readonly: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  openingSequence: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  canApproveWorkflow: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  envelopeApprovers: { userId: number }[];

  @ApiPropertyOptional()
  @IsOptional()
  attachmentType: EnvelopeAttachmentType;

  @ApiPropertyOptional()
  @IsOptional()
  showAttachmentOption: boolean;
}

export enum EnvelopeAttachmentType {
  BILL_OF_QUANTITY = 'bill of quantity',

  QUESTIONNAIRE = 'questionnaire',

  BOTH = 'bill of quantity  questionnaire',
}
export class RfxTemplateSourcingProposalRoute {
  @ApiPropertyOptional()
  @IsOptional()
  enableApprovalReminders: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  visible: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  hoursPerReminder: number;
  @ApiPropertyOptional()
  @IsOptional()
  reminderFrequency: number;
  @ApiPropertyOptional()
  @IsOptional()
  notifyOnFinalReminder: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  canAddAdditionalApproval: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  canAddAdditionalApproval_visible: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  canAddAdditionalApproval_readonly: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  canAddAdditionalApproval_optional: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  proposalLevels: { levelName: string; userId: number }[];
}
export class RfxTemplateTeamMembersDto {
  @ApiPropertyOptional()
  @IsOptional()
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  userId: number;

  @IsEnum(TeamMemberType)
  viewStatus: TeamMemberType;
}
export class RfxTemplateUsersDto {
  @ApiPropertyOptional()
  @IsOptional()
  userId: number;
}
export class CreateRfxTemplateDto {
  @ApiPropertyOptional()
  @IsOptional()
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  templateName: string;

  @ApiPropertyOptional()
  @IsOptional()
  departmentId: number;

  // @IsOptional()
  createdById: number;

  // @IsOptional()
  updatedById: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(RfxEventType)
  eventType: RfxEventType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(RfxTemplateStatus)
  status: RfxTemplateStatus;

  @ApiPropertyOptional()
  @IsOptional()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  title_readonly: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  supplierCategory: string;

  @ApiPropertyOptional()
  @IsOptional()
  supplierCategory_visible: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  supplierCategory_readonly: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  quotationValidity: string;

  @ApiPropertyOptional()
  @IsOptional()
  quotationValidity_readonly: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  warranty: string;

  @ApiPropertyOptional()
  @IsOptional()
  warranty_visible: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  warranty_readonly: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  closingDaysCounter: number;

  @ApiPropertyOptional()
  @IsOptional()
  closingTime: string;

  @ApiPropertyOptional()
  @IsOptional()
  enableSupplierNameMaskingForEvaluation: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  unmaskOwners: { userId: number }[];

  @ApiPropertyOptional()
  @IsOptional()
  selectUnmaskOwners_visible: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  canCloseEnvelope: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  canCloseEnvelope_visible: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  canApproveWorkflowEnvelope;

  @ApiPropertyOptional()
  @IsOptional()
  canAddSupplier: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  canAddSupplier_visible: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  enableSupplierTnC: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  supplierTnCDeclarationId: number;

  @ApiPropertyOptional()
  @IsOptional()
  supplierTnC_visible: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  supplierTnC_readonly: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  conclusionOwners: { userId: number }[];

  @ApiPropertyOptional()
  @IsOptional()
  canEvaluateConclusion: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  selectConclusionOwners_visible: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  baseCurrencyId: number;

  @ApiPropertyOptional()
  @IsOptional()
  baseCurrency_readonly: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  baseCurrency_visible: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  decimal: number;

  @ApiPropertyOptional()
  @IsOptional()
  decimal_visible: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  decimal_readonly: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  costCenterCode: string;

  @ApiPropertyOptional()
  @IsOptional()
  costCenter_readonly: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  costCenter_visible: boolean;

  @ApiPropertyOptional()
  purchasingOrgCode: string;

  @ApiPropertyOptional()
  @IsOptional()
  purchasingOrg_readonly: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  canEditBillOfQuantity: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  approvalRoute: RfxTemplateApprovalRouteDto;

  @ApiPropertyOptional()
  @IsOptional()
  sourcingProposalRoute: RfxTemplateSourcingProposalRoute;

  @ApiPropertyOptional()
  @IsOptional()
  teamMembers: RfxTemplateTeamMembersDto[];

  @ApiPropertyOptional()
  @IsOptional()
  teamMembers_readOnly: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  envelopes: RfxTemplateEnvelopeDto[];

  @ApiPropertyOptional()
  @IsOptional()
  templateUsers: RfxTemplateUsersDto[];

  // new keys.
  @ApiPropertyOptional()
  @IsOptional()
  canSuspendEvent: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  suspendedEvent_visible: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  suspendedEvent_readonly: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  questionnaires: RfxTemplateQuestionnaireDto[];
  @ApiPropertyOptional()
  @IsOptional()
  documentId:number
}
