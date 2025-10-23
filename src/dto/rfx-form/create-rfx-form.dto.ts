import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { EquivalentBrandAllowedTypeEnum } from 'src/enum/rfs/equivalentBrand.enum';
import { MettingStatus } from 'src/enum/rfx/meeting-status.enum';
import { RfxFormStatus } from 'src/enum/rfx/rfx-form-status.enum';
import { TeamMemberType } from 'src/enum/team-member/team-member-type.enum';
import { AnswerType } from '../rfx-template/rfx-template-questionnaire.dto';
export class RfxEnvelopeEvaluatorDto {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  userId: number;
}
export class RfxEnvelopeApproversDto {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  userId: number;
}
export class RfxEnvelopeDto {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  envelopeName: string;
  @ApiPropertyOptional()
  @IsOptional()
  envelopeSequence: number;
  @ApiPropertyOptional({
    type: [RfxEnvelopeEvaluatorDto],
  })
  @IsOptional()
  envelopeEvaluators: RfxEnvelopeEvaluatorDto[];
  @ApiPropertyOptional({
    type: [RfxEnvelopeApproversDto],
  })
  @IsOptional()
  envelopeApprovers: RfxEnvelopeApproversDto[];

  @ApiPropertyOptional()
  @IsOptional()
  readonly: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  openingSequence: boolean;
  // @ApiPropertyOptional()
  // @IsOptional()
  // attachmentBillOfQuantity: boolean;
  // @ApiPropertyOptional()
  // @IsOptional()
  // attachmentQuestionnaire: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  showAttachmentOption: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  attachmentType: string;
  @ApiPropertyOptional()
  @IsOptional()
  canApproveWorkflow: boolean;
}
export class RfxMeetingAttendeeDto {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  userId: number;
}
export class RfxMeetingContactPersons {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  userId: number;
}
export class RfxMeetingReminders {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  remindAt: Date;
  @ApiPropertyOptional()
  @IsOptional()
  remainderTime: string;
}
export class RfxMeetingDto {
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  isMeetingRequired: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  meetingTitle: string;

  @ApiPropertyOptional()
  @IsOptional()
  meetingType: string;

  @ApiPropertyOptional()
  @IsOptional()
  meetingDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  meetingTime: string;

  @ApiPropertyOptional({
    type: [RfxMeetingAttendeeDto],
  })
  @IsOptional()
  meetingAttendees: RfxMeetingAttendeeDto[];

  @ApiPropertyOptional({
    type: [RfxMeetingContactPersons],
  })
  @IsOptional()
  meeingContactPersons: RfxMeetingContactPersons[];

  @ApiPropertyOptional()
  @IsOptional()
  meetingVenue: string;

  @ApiPropertyOptional()
  @IsOptional()
  meetingContent: string;

  @ApiPropertyOptional({
    type: [RfxMeetingReminders],
  })
  @IsOptional()
  meetingReminder: RfxMeetingReminders[];

  @IsOptional()
  isAttendanceMandatory: boolean;
  meetingStatus: MettingStatus;
}
export class RfxRecommendedSupplierDto {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  supplierId: number;
  rfxSupplierId: number;
}
class SelectedSupplier {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  supplierId: number;
}
class RfxSupplierDto {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  supplierSelection: 'manual' | 'category';
  @ApiPropertyOptional()
  @IsOptional()
  supplierCategoryId: number;

  @ApiPropertyOptional({
    type: [RfxRecommendedSupplierDto],
  })
  @IsOptional()
  recommendedSuppliers: RfxRecommendedSupplierDto[];
  @ApiPropertyOptional()
  @IsOptional()
  recommendedNewSupplier: string;
  @ApiPropertyOptional({
    type: [SelectedSupplier],
  })
  @IsOptional()
  selectedSupplier: SelectedSupplier[];
}
export class RfxTeamMemberDto {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  userId: number;
  // @ApiPropertyOptional()
  // @IsOptional()
  // name: number;
  @ApiPropertyOptional()
  @IsOptional()
  viewStatus: TeamMemberType;
}
export class RfxUnmaskOwnerDto {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  userId: number;
}
export class RfxBoqDto {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  itemName: string;
  @ApiPropertyOptional()
  @IsOptional()
  itemDescription: string;
  @ApiPropertyOptional()
  @IsOptional()
  brand: string;
  @ApiPropertyOptional()
  @IsOptional()
  model: string;
  @ApiPropertyOptional()
  @IsOptional()
  equivalentBrandAllowed: EquivalentBrandAllowedTypeEnum;
  @ApiPropertyOptional()
  @IsOptional()
  // costCenterId: number;
  costCenterId: string;

  @ApiPropertyOptional()
  @IsOptional()
  wordOrderNo: string;
  @ApiPropertyOptional()
  @IsOptional()
  internalOrderNoId: number;
  @ApiPropertyOptional()
  @IsOptional()
  partNumberId: number;
  @ApiPropertyOptional()
  @IsOptional()
  uomId: number;
  @ApiPropertyOptional()
  @IsOptional()
  quantity: number;
  rfxId?: number;
}
export class RfxFormQuestioAttachmnt {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  fileOriginalName: string;
  @ApiPropertyOptional()
  @IsOptional()
  filePath: string;
  @ApiPropertyOptional()
  @IsOptional()
  availability: string;

  @ApiPropertyOptional()
  @IsOptional()
  offset: number;
  @ApiPropertyOptional()
  @IsOptional()
  description: string;

  rfxQuestionnaireSectionId: number;
}

export class RfxQuestionDto {
  @ApiPropertyOptional()
  @IsOptional()
  question: string;
  @ApiPropertyOptional()
  @IsOptional()
  answerType: AnswerType;

  @ApiPropertyOptional()
  @IsOptional()
  evaluationMapping: string;

  @ApiPropertyOptional()
  @IsOptional()
  choices: string[];

  @ApiPropertyOptional()
  @IsOptional()
  scoreChoices: { score: number; value: string }[];

  @ApiPropertyOptional()
  @IsOptional()
  isRequired: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  canSupplierAttachDocument: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  isAttachmentRequired: boolean;

  @ApiPropertyOptional({ type: [RfxFormQuestioAttachmnt] })
  @IsOptional()
  attachments: RfxFormQuestioAttachmnt[];
}
export class RfxFormQuestionnairSectionDto {
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  sNo: number;

  @ApiPropertyOptional()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  description: string;
  @ApiPropertyOptional()
  @IsOptional()
  questions: RfxQuestionDto[];
  rfxQuestionnaireId?: number;
}
export class RfxQuestionnairDto {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  setName: string;
  @ApiPropertyOptional({
    type: [RfxFormQuestionnairSectionDto],
  })
  @IsOptional()
  sections: RfxFormQuestionnairSectionDto[];
  rfxId: number;
}
export class RfxSourcingProposalLevelDto {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  levelName: string;
  @ApiPropertyOptional()
  @IsOptional()
  userId: number;
  @IsOptional()
  rfxSourcingProposalId: number;
}
export class RfxSourcingPropaslDto {
  id?: number;
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
  @ApiPropertyOptional({
    type: [RfxSourcingProposalLevelDto],
  })
  @IsOptional()
  proposalLevels: RfxSourcingProposalLevelDto[];
  rfxId: number;
}
export class RfxApprovalLevelDto {
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  levelName: string;

  @ApiPropertyOptional()
  @IsOptional()
  levelSequence: number;

  @ApiPropertyOptional()
  @IsOptional()
  userId: number;

  @ApiPropertyOptional()
  @IsOptional()
  levelStatus: RfxFormStatus;

  rfxApprovalId?: number;
}
export class RfxFormApprovalDto {
  id?: number;
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
  canApproveResume: boolean;
  @ApiPropertyOptional({
    type: [RfxApprovalLevelDto],
  })
  @IsOptional()
  approvalLevels: RfxApprovalLevelDto[];
  rfxId: number;
}
export class RequestedByDto {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  name: string;
  @ApiPropertyOptional()
  @IsOptional()
  department: string;
  @ApiPropertyOptional()
  @IsOptional()
  contactNo: string;
  @ApiPropertyOptional()
  @IsOptional()
  mobileNo: string;
  @ApiPropertyOptional()
  @IsOptional()
  emailAddress: string;
}
export class RfxSupportingDocument {
  @ApiPropertyOptional()
  @IsOptional()
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  filename: string;
  @ApiPropertyOptional()
  @IsOptional()
  originalname: string;
  @ApiPropertyOptional()
  @IsOptional()
  path: string;
  @ApiPropertyOptional()
  @IsOptional()
  rfxId: number;
  @ApiPropertyOptional()
  @IsOptional()
  availabitly: string;
  @ApiPropertyOptional()
  @IsOptional()
  description: string;
}
export class CreateRfxFormDto {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  title: string;
  @ApiPropertyOptional()
  @IsOptional()
  urgentJob: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  urgentJobOption: string;
  @ApiPropertyOptional()
  @IsOptional()
  internalReferenceNumber: string;
  @ApiPropertyOptional()
  @IsOptional()
  justificationOfPurchase: string;
  @ApiPropertyOptional()
  @IsOptional()
  closingDate: Date;
  @ApiPropertyOptional()
  @IsOptional()
  createdById: number;
  @ApiPropertyOptional()
  @IsOptional()
  expectedDeliveryLeadTime: Date;
  @ApiPropertyOptional()
  @IsOptional()
  deliveryAddress: string;
  @ApiPropertyOptional()
  @IsOptional()
  warranty: string;
  @ApiPropertyOptional()
  @IsOptional()
  previousPurchase: string;
  @ApiPropertyOptional()
  @IsOptional()
  estimateCost: string;
  @ApiPropertyOptional()
  @IsOptional()
  costCenterCode: string;
  @ApiPropertyOptional()
  // @IsOptional()
  // requestor: number;
  @ApiPropertyOptional()
  @IsOptional()
  currency: number;
  @ApiPropertyOptional()
  @IsOptional()
  purchasingOrg: number;
  @ApiPropertyOptional()
  @IsOptional()
  purchasingOrgCode: string;
  @ApiPropertyOptional()
  @IsOptional()
  //  2. carry forwarded from rfx-template:
  quotationValidity: number;
  @ApiPropertyOptional({
    type: [RfxEnvelopeDto],
  })
  @IsOptional()
  envelopes: RfxEnvelopeDto[]; //relation   1   evaluater

  @ApiPropertyOptional({
    type: RfxSupplierDto,
  })
  @IsOptional()
  supplier: RfxSupplierDto; //relation   no sub

  @ApiPropertyOptional({
    type: [RfxTeamMemberDto],
  })
  @IsOptional()
  teamMembers: RfxTeamMemberDto[]; //relation  no sub
  //  3.  rfx unique keys :
  @ApiPropertyOptional()
  @IsOptional()
  description: string;
  @ApiPropertyOptional()
  @IsOptional()
  referenceNumber: string;
  @ApiPropertyOptional()
  @IsOptional()
  preprId: number;
  @ApiPropertyOptional()
  @IsOptional()
  rfxTemplateId: number;
  @ApiPropertyOptional()
  @IsOptional()
  baseCurrency: string;
  @ApiPropertyOptional({
    type: [RfxMeetingDto],
  })
  @IsOptional()
  meeting: RfxMeetingDto[];
  //relation   1   attendess

  @ApiPropertyOptional({
    type: [RequestedByDto],
  })
  @IsOptional()
  requestor: RequestedByDto[];

  @ApiPropertyOptional({
    type: [RfxBoqDto],
  })
  @IsOptional()
  boq: RfxBoqDto[]; //relation  no  sub
  @ApiPropertyOptional({
    type: RfxSourcingPropaslDto,
  })
  @IsOptional()
  sourcingProposalRoute: RfxSourcingPropaslDto; //relation  1 level
  @ApiPropertyOptional({
    type: RfxFormApprovalDto,
  })
  @IsOptional()
  approvalRoute: RfxFormApprovalDto; //relation  1   level
  @ApiPropertyOptional({
    type: RfxQuestionnairDto,
  })
  @IsOptional()
  questionnaire: RfxQuestionnairDto[]; //relation  2 level  section,attachment
  //additional field from template
  enableSupplierNameMaskingForEvaluation: boolean;
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
  isSubmit: boolean;
  status: RfxFormStatus;
  @ApiPropertyOptional()
  @IsOptional()
  isDocumentRequired: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  costCenter_visible: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  costCenter_readonly: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  baseCurrency_readonly: boolean;
  baseCurrency_visible: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  title_readonly: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  purchasingOrg_readonly: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  isMeetingRequired: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  isQuestionnaireRequired: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  departmentId: number;
  @ApiPropertyOptional()
  @IsOptional()
  canSuspendEvent: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  suspendedEvent_visible: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  canEvaluateConclusion: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  selectConclusionOwners_visible: boolean;

  @ApiPropertyOptional({
    type: [RfxSupportingDocument],
  })
  @IsOptional()
  supportingDocuments: RfxSupportingDocument[];

  @ApiPropertyOptional({
    type: [RfxUnmaskOwnerDto],
  })
  @IsOptional()
  unmaskOwners: RfxUnmaskOwnerDto[];
  @ApiPropertyOptional()
  @IsOptional()
  addressType:string;
  @ApiPropertyOptional()
  @IsOptional()
  documentId:number
}

export class UpdateRfxDto extends PartialType(CreateRfxFormDto) { }
