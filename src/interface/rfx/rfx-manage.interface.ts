enum EquivalentBrandAllowedTypeEnum {

    YES = 'Yes',

    YES_WITH_OPTION = 'Yes with option',

    NO = 'No',

    NOT_APPLICABLE = 'Not applicable'

}
enum ViewerType {
    VIEWER = 'viewer',
    ASSOCIATE_VIEWER = 'associate viewer',
}
interface RfxRequestorInterface {
    userId: number;
}
interface RfxEnvelopeEvaluatorInterface {
    id?: number;
    userId: number;
}
export interface RfxEnvelopeInterface {
    id?: number;
    envelopeName: string;
    envelopeSequence: number;
    envelopeEvaluators: RfxEnvelopeEvaluatorInterface[];
    readonly: boolean;
    openingSequence: boolean;
    attachmentBillOfQuantity: boolean;
    attachmentQuestionnaire: boolean;
}
interface RfxMeetingAttendeeInterface {
    id?: number;
    userId: number;
}
interface RfxMeetingContactPersons {
    id?: number
    userId: number
}
interface RfxMeetingInterface {
    id?: number;
    isMeetingRequired: boolean;
    meetingTitle: string;
    meetingType: string;
    meetingDateAndTime: Date;
    meetingAttendees: RfxMeetingAttendeeInterface[];
    meeingContactPersons: RfxMeetingContactPersons[];
    meetingVenue: string;
    meetingContent: string;
}
interface RfxRecommendedSupplierInterface {
    id?: number;
    supplierId: number;
    rfxSupplierId: number;
}
interface RfxSupplierInterface {
    id?: number;
    supplierSelection: 'manual' | 'category';
    supplierCategoryId: string;
    recommendedSuppliers: RfxRecommendedSupplierInterface[];
    recommendedNewSupplier: number;
    selectedSupplier: number;
}
interface RfxTeamMemberInterface {
    id?: number;
    userId: number;
    viewStatus: ViewerType;
}
interface RfxBoqInterface {
    id?: number;
    itemName: string;
    itemDescription: string;
    brand: string;
    model: string;
    equivalentBrandAllowed: EquivalentBrandAllowedTypeEnum;
    costCenterId: number;
    wordOrderNo: string;
    internalOrderNoId: number;
    partNumberId: number;
    uomId: number;
    quantity: number;
    rfxId?: number;
}
interface RfxFormQuestionnairSectionAttachmnt {
    id?: number;
    fileOriginalName: string;
    filePath: string;
    availability: string;
    offset: number;
    description: string;
    rfxQuestionnaireSectionId: number
}
interface RfxFormQuestionnairSectionInterface {
    id?: number;
    sNo: number;
    name: string;
    description: string;
    question: string;
    answerType: string;
    evaluationMapping: string;
    isRequired: boolean;
    canSupplierAttachDocument: boolean;
    isAttachmentRequired: boolean;
    attachments: RfxFormQuestionnairSectionAttachmnt[];
    rfxQuestionnaireId?: number;
}
interface RfxQuestionnairInterface {
    id?: number;
    setName: string;
    sections: RfxFormQuestionnairSectionInterface[];
    rfxId: number;
}
interface RfxSourcingProposalLevelInterface {
    id?: number;
    levelName: string;
    userId: number;
    rfxSourcingProposalId: number;
}
interface RfxSourcingPropaslInterface {
    id?: number;
    enableApprovalReminders: boolean;
    visible: boolean;
    hoursPerReminder: number;
    reminderFrequency: number;
    notifyOnFinalReminder: boolean;
    canAddAdditionalApproval: boolean;
    canAddAdditionalApproval_visible: boolean;
    canAddAdditionalApproval_readonly: boolean;
    canAddAdditionalApproval_optional: boolean;
    levels: RfxSourcingProposalLevelInterface[];
    rfxId: number;
}
interface RfxApprovalLevelInterface {
    id?: number;
    levelName: string;
    userId: number;
    rfxApprovalId?: number;
}
interface RfxFormApprovalInterface {
    id?: number;
    enableApprovalReminders: boolean;
    visible: boolean;
    hoursPerReminder: number;
    reminderFrequency: number;
    notifyOnFinalReminder: boolean;
    canAddAdditionalApproval: boolean;
    canAddAdditionalApproval_visible: boolean;
    canAddAdditionalApproval_readonly: boolean;
    canAddAdditionalApproval_optional: boolean;
    canApproveResume: boolean;
    levels: RfxApprovalLevelInterface[];
    rfxId: number;
}
export interface CreateRfxFormInterface {
    id?: number;
    title: string;   // Carry forward from PREPR  ( field name title ) 
    urgentJob: boolean; // Carry forward from PREPR ( field name urgentJob)
    urgentJobOption: string; //Carry forward from PREPR ( field name urgentJob_option)
    internalReferenceNumber: string;//Carry forward from PREPR ( field name internalReferenceNumber)
    justificationOfPurchase: string;//Carry forward from PREPR ( field name justificationOfPurchase)
    closingDate: Date;
    deliveryDate: Date;//Carry forward from PREPR ( field name deliveryDate)
    deliveryAddressId: string;//comes only when deliveryAddressType is list
    warranty: number;//Carry forward from PREPR ( field name warranty)
    previousPurchase: string;//Carry forward from PREPR ( field name previousPurchase)
    estimateCost: string;//Carry forward from PREPR ( field name estimatedCost)
    costCenter: number;//Carry forward from PREPR ( field name costCenter)
    currency: number;//Carry forward from PREPR ( field name currency)
    purchasingOrg: number;//Carry forward from PREPR ( field name purchasingOrg)
    purchasingOrgName: string;//Carry forward from PREPR ( field name purchasingOrgName)
    //  2. carry forwarded from rfx-template:
    quotationValidity: number;
    envelopes: RfxEnvelopeInterface[];          //relation   1   evaluater
    supplier: RfxSupplierInterface;    //relation   no sub
    teamMembers: RfxTeamMemberInterface[];   //relation  no sub
    //  3.  rfx unique keys :
    description: string;
    referenceNumber: string;
    preprId: number;
    rfxTemplateId: number;
    baseCurrency: string;
    meeting: RfxMeetingInterface[];         //relation   1   attendess
    requestedBy?: number;
    boq: RfxBoqInterface[];               //relation  no  sub
    sourcingProposal: RfxSourcingPropaslInterface[]    //relation  1 level
    approval: RfxFormApprovalInterface[]              //relation  1   level
    questionnair: RfxQuestionnairInterface[]         //relation  2 level  section,attachment
    //additional field from template
    enableSupplierNameMaskingForEvaluation: boolean;
    selectUnmaskOwners_visible: boolean;
    canCloseEnvelope: boolean;
    canCloseEnvelope_visible: boolean;
    canAddSupplier: boolean;
    canAddSupplier_visible: boolean;
    enableSupplierTnC: boolean;
    supplierTnCDeclarationId: number;
    supplierTnC_visible: boolean;
    supplierTnC_readonly: boolean;
}
