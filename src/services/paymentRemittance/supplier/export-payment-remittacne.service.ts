import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workbook } from 'exceljs';
import { Response } from 'express';
import { ExportDto, PaymentExportDto } from 'src/dto/export.dto';
import { PaymentRemittanceFilterDto } from 'src/dto/paging.dto';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { PaymentRemittanceRepository } from 'src/repos/payment-remittance/payment-remittance.repository';
import { GetFlatPurchaseOrgService } from 'src/services/flat/getFlatPurchaseOrg.service';
import { SupplierService } from 'src/services/flat/supplier.service';
import { GetSuplierInvoiceFormService } from './payment-remittance.service';





@Injectable()
export class ExportSupplierPaymentService {
    constructor(
        @InjectRepository(PaymentRemittanceRepository)
        private paymentRemittanceRepo: PaymentRemittanceRepository,
        private purchaseOrg: GetFlatPurchaseOrgService,
        private supplierService: SupplierService,
        private paymentService: GetSuplierInvoiceFormService
    ) { }

    async exportPaymentRemittance(res:Response,user:JwtPayload, pagingDto: PaymentRemittanceFilterDto) {
        const workbook = new Workbook();
        workbook.creator = 'P2P Admin';
        workbook.created = new Date();
        const sheet = workbook.addWorksheet('Payment Remittance');
        sheet.columns = [
            { header: 'Payment Reference', key: 'paymentReference' },
            { header: 'Payment Date', key: 'paymentDate' },
            { header: 'Payment Method', key: 'paymentMethod' },
            { header: 'Company', key: 'purchasingOrg' },
            { header: 'Invoice No', key: 'invoiceNo' },
            { header: 'Invoice Date', key: 'invoiceDate' },
            { header: 'Invoice Amount', key: 'invoiceAmount' },
        ];
        const paymentList = await this.paymentService.exportpaymentRemittanceSupplierList(user,pagingDto);
        console.log(paymentList)

        for (let i = 0; i < paymentList.length; i++) { 
            if(paymentList[i].invoiceDetails.length>0){
            for(let j= 0;j<paymentList[i].invoiceDetails.length;j++){
            sheet.addRow({ 
                paymentReference:paymentList[i].referenceNumber,
                paymentDate:paymentList[i].paymentDate,
                paymentMethod:paymentList[i].paymentMethod,
                purchasingOrg:await this.purchaseOrg.getFlatPurchaseNameByCode(paymentList[i].purchaseOrg),
                invoiceNo:paymentList[i].invoiceDetails?paymentList[i].invoiceDetails[j].invoiceNumber:"",
                invoiceDate:paymentList[i].invoiceDetails?paymentList[i].invoiceDetails[j].invoiceDate:"",
                invoiceAmount:paymentList[i].invoiceDetails?paymentList[i].invoiceDetails[j].invoiceAmount:"",
            })
        }
        }
        else{
          sheet.addRow({
            paymentReference:paymentList[i].referenceNumber,
            paymentDate:paymentList[i].paymentDate,
            paymentMethod:paymentList[i].paymentMethod,
            purchasingOrg:await this.purchaseOrg.getFlatPurchaseNameByCode(paymentList[i].purchaseOrg),
            invoiceNo:"",
            invoiceDate:"",
            invoiceAmount:"",
        })
        }
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
      
          res.attachment('Payment Remittance.xlsx');
          await workbook.xlsx.write(res);
        
    }


}
