import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
const moment = require("moment");
import { PaymentRemittanceFilterDto } from 'src/dto/paging.dto';
import { PaymentRemittanceRepository } from 'src/repos/payment-remittance/payment-remittance.repository';
import { GetFlatPurchaseOrgService } from 'src/services/flat/getFlatPurchaseOrg.service';
import { SupplierService } from 'src/services/flat/supplier.service';
import { SupplierPaymentRemittancePdfService } from './paymentRemittanceSummary.service';




@Injectable()
export class GetSupplierPaymentInvoiceListService {
    constructor(
        @InjectRepository(PaymentRemittanceRepository)
        private paymentRemittanceRepo: PaymentRemittanceRepository,
        private purchaseOrg: GetFlatPurchaseOrgService,
        private supplierService: SupplierService
    ) { }

    async getpaymentRemittanceDetails(paymentRemittancePdfService:SupplierPaymentRemittancePdfService,paymentId: number) {

        let data = await this.paymentRemittanceRepo.findOne({ id: paymentId })
        data.purchaseOrg = await this.purchaseOrg.getFlatPurchaseOrgNameByCode(data.purchaseOrg)
        // data.supplierCode =  await this.supplierService.getSupplierNameByVendor(data.supplierCode)
        paymentRemittancePdfService.createPdf(paymentId,data)
        return  data;
    }


}
