import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentExportDto } from 'src/dto/export.dto';
const moment = require("moment");
import { PaymentRemittanceFilterDto } from 'src/dto/paging.dto';
import { PaymentRemittanceRepository } from 'src/repos/payment-remittance/payment-remittance.repository';
import { GetAllUsers } from 'src/services/user/getAllUser.service';
import { GetPaymentInvoiceListService } from './payment-invoice-details.service';
import { JwtPayload } from "src/interface/user/jwt.payload.interface";
import { GetFlatPurchaseOrgService } from 'src/services/flat/getFlatPurchaseOrg.service';
import { ExportPaymentEntity } from 'src/entities/paymentRemittance/buyer-invoice/exportdata.entity';




@Injectable()
export class GetInvoiceFormService {
    constructor(
        @InjectRepository(PaymentRemittanceRepository)
        private paymentRemittanceRepo: PaymentRemittanceRepository,
        private userService: GetAllUsers,
        private getInvoiceDetails: GetPaymentInvoiceListService,
        private getFlatPurchaseOrgService: GetFlatPurchaseOrgService
    ) { }

    async getpaymentRemittanceList(user: JwtPayload, pagingDto: PaymentRemittanceFilterDto) {
        // let userPurchaseorg = await this.userService.getUserPurchaseOrg(20)
        //    console.log(userPurchaseorg.p_org_id)

        // let dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
        let dateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
        const searchKey: string = pagingDto.keyword || '';
        const purchaseOrg: string = pagingDto.purchaseOrg;
        console.log("purchaseOrg", searchKey);
        let fromDate;
        let toDate;
        if (pagingDto.fromDate) {
            fromDate = new Date(pagingDto.fromDate)
        }
        if (pagingDto.toDate) {
            toDate = new Date(pagingDto.toDate)
        }
        let data = await this.paymentRemittanceRepo
            .createQueryBuilder("paymentRemittance")
            .where("(paymentRemittance.purchaseOrg= :purchaseOrg)", { purchaseOrg: purchaseOrg })
            .orderBy('paymentRemittance.createdAt', 'DESC')

        if (!searchKey.match(dateRegex))
            data.andWhere("((paymentRemittance.referenceNumber ilike :q) OR (paymentRemittance.paymentMethod ilike :q) OR (paymentRemittance.status ilike :q) OR (cast(paymentRemittance.totalAmount as text) ilike :q) OR (paymentRemittance.supplierName ilike :q))", { q: `%${searchKey}%` })

        if (searchKey.match(dateRegex)) {
            let newData = searchKey.split("/").reverse().join("-")
            data.andWhere("((paymentRemittance.paymentDate= :chequeDate) OR (cast(paymentRemittance.createdAt as date)= :chequeDate)) ", { chequeDate: newData })
        }
        // console.log(data)
        if (pagingDto.fromDate) {
            data.andWhere("(paymentRemittance.createdAt >= :startDate) AND (paymentRemittance.createdAt <= :endDate)", { startDate: fromDate, endDate: toDate })
            // data.where("(paymentRemittance.paymentDate >= :startDate) AND (paymentRemittance.paymentDate <= :endDate)", { startDate: fromDate, endDate: toDate })
        }
        const total = await data.getCount()
        const page: number = pagingDto.page || 1;
        const limit: number = pagingDto.size || 10;
        data.offset((page - 1) * limit).limit(limit);
        const result = await data.getMany();
        // return result
        return { total: total, data: result }
    }

    async exportpaymentRemittanceList(user: JwtPayload, pagingDto: PaymentRemittanceFilterDto) {

        // let dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
        let dateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
        const searchKey: string = pagingDto.keyword || '';
        const purchaseOrg: string = pagingDto.purchaseOrg;
        console.log("purchaseOrg", searchKey);
        let fromDate;
        let toDate;
        if (pagingDto.fromDate) {
            fromDate = new Date(pagingDto.fromDate)
        }
        if (pagingDto.toDate) {
            toDate = new Date(pagingDto.toDate)
        }
        let data = await this.paymentRemittanceRepo
            .createQueryBuilder("paymentRemittance")
            .where("(paymentRemittance.purchaseOrg= :purchaseOrg)", { purchaseOrg: purchaseOrg })
            .leftJoinAndSelect("paymentRemittance.invoiceDetails", "invoice")
            .orderBy('paymentRemittance.createdAt', 'DESC')

        if (!searchKey.match(dateRegex))
            data.andWhere("((paymentRemittance.referenceNumber ilike :q) OR (paymentRemittance.paymentMethod ilike :q) OR (paymentRemittance.status ilike :q) OR (cast(paymentRemittance.totalAmount as text) ilike :q) OR (paymentRemittance.supplierName ilike :q))", { q: `%${searchKey}%` })

        if (searchKey.match(dateRegex)) {
            let newData = searchKey.split("/").reverse().join("-")
            data.andWhere("((paymentRemittance.paymentDate= :chequeDate) OR (cast(paymentRemittance.createdAt as date)= :chequeDate)) ", { chequeDate: newData })
        }
        // console.log(data)
        if (pagingDto.fromDate) {
            data.andWhere("(paymentRemittance.createdAt >= :startDate) AND (paymentRemittance.createdAt <= :endDate)", { startDate: fromDate, endDate: toDate })
            // data.where("(paymentRemittance.paymentDate >= :startDate) AND (paymentRemittance.paymentDate <= :endDate)", { startDate: fromDate, endDate: toDate })
        }

        const result: any = await data.getMany();
       
        return result
    }


    async purchaseOrgList(user: JwtPayload) {
        return await this.getFlatPurchaseOrgService.getFlatPurchaseOrgUserList(user.userId)
    }


}
