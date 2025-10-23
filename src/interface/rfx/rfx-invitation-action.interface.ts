export interface RfxInvitationActionInterface {
    id: number;
    internalReferenceNumber: string;
    closingDate: Date;
    eventType: string;
    creator: {
        name: string;
    }
    eventStartDate: Date;
    description: string;
    deliveryDate: Date;
    requestor: {
        name: string
    }
    supplier:{
        id:number
    }

}