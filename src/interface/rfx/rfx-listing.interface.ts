import { SubmitType } from "src/enum/rfs/submitType.enum"

export interface RfxListInterface {
    urgentJob: boolean;
    eventType: string;
    internalReferenceNumber: string;
    title: string;
    id: number;
    createdAt: Date;
    // Start Date;
    closingDate: Date;
    requestor: string;
    purchasingOrg: any
    submitStatus: SubmitType
    sourcingProposalStatus: SubmitType;

}