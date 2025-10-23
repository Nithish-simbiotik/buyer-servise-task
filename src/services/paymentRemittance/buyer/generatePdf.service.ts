import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
const moment = require("moment");
import { PaymentRemittanceFilterDto } from 'src/dto/paging.dto';
import { BuyerPaymentRemittancePdfEntity } from 'src/entities/paymentRemittance/buyer-invoice/paymentRemittancePdf.entity';
import { PaymentRemittanceRepository } from 'src/repos/payment-remittance/payment-remittance.repository';
import { GetFlatPurchaseOrgService } from 'src/services/flat/getFlatPurchaseOrg.service';
import { SupplierService } from 'src/services/flat/supplier.service';
import { getRepository } from 'typeorm';
// import { PaymentRemittancePdfService } from './paymentRemittanceSummary.service';
import { Response } from 'express';



@Injectable()
export class GetPDfService {
    constructor(
        @InjectRepository(PaymentRemittanceRepository)
        private paymentRemittanceRepo: PaymentRemittanceRepository,
        private purchaseOrg: GetFlatPurchaseOrgService,
        private supplierService: SupplierService, 
        // private paymentRemittancePdfService:PaymentRemittancePdfService
    ) { }

   

    async paymentRemittanceSummary(res,paymentId:number){
        let data = await getRepository(BuyerPaymentRemittancePdfEntity).findOne({paymentRemittanceId:paymentId});
        if(data)
        return data.pdfUrl;
        }


        


}
