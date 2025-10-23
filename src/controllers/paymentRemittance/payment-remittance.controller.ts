import {
    Body,
    Controller,
    Get,
    NotAcceptableException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    Query,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/auth/auth-user.decorator';
import { PaymentExportDto } from 'src/dto/export.dto';
import { PaymentRemittanceFilterDto } from 'src/dto/paging.dto';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { ExportPaymentService } from 'src/services/paymentRemittance/buyer/export-payment-remittacne.service';
import { GetPaymentInvoiceListService } from 'src/services/paymentRemittance/buyer/payment-invoice-details.service';
import { GetInvoiceFormService } from 'src/services/paymentRemittance/buyer/payment-remittance.service';
import { ExportSupplierPaymentService } from 'src/services/paymentRemittance/supplier/export-payment-remittacne.service';
import { GetSuplierInvoiceFormService } from 'src/services/paymentRemittance/supplier/payment-remittance.service';
import { GetSupplierPaymentInvoiceListService } from 'src/services/paymentRemittance/supplier/payment-invoice-details.service';
import { GetPDfService } from 'src/services/paymentRemittance/buyer/generatePdf.service';
import { BuyerPaymentRemittancePdfService } from 'src/services/paymentRemittance/buyer/paymentRemittanceSummary.service';
import { SupplierPaymentRemittancePdfService } from 'src/services/paymentRemittance/supplier/paymentRemittanceSummary.service';
import { GetSupplierPdfService } from 'src/services/paymentRemittance/supplier/generatePdf.service';


@ApiTags('payment-remittance')
@Controller('payment-remittance')
export class PaymentRemittanceController {
    constructor(
        private paymentRemittanceList: GetInvoiceFormService,
        private getPaymentDetails: GetPaymentInvoiceListService,
        private exportPaymentService: ExportPaymentService,
        private exportSupplierService: ExportSupplierPaymentService,
        private supplierPaymentRemittanceService: GetSuplierInvoiceFormService,
        private getSupplierPaymentDetails: GetSupplierPaymentInvoiceListService,
        private getpdfService: GetPDfService,
        private paymentRemittancePdfService: BuyerPaymentRemittancePdfService,
        private supplierpaymentRemittancePdfService: SupplierPaymentRemittancePdfService,
        private getSupplierPdfService:GetSupplierPdfService

    ) { }

    @ApiOperation({ summary: 'Api for buyer payment remittance export' })
    @Get('buyer/export-list')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async exportBuyerPaymentList(
        @User() user: JwtPayload,
        @Query() pagingDto: PaymentRemittanceFilterDto,
        @Res() res: Response
    ) {
        return await this.exportPaymentService.exportPaymentRemittance(res, user, pagingDto);
    }


    @ApiOperation({ summary: 'Api for payment remittance list' })
    @Get('buyer-list')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async buyerPaymentRemittanceList(
        @User() user: JwtPayload,
        @Query() pagingDto: PaymentRemittanceFilterDto,

    ) {
        return await this.paymentRemittanceList.getpaymentRemittanceList(user,pagingDto)
    }

    @ApiOperation({ summary: 'Api for buyer payment details ' })
    @Get('buyer/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getBuyerPaymentById(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.getPaymentDetails.getpaymentRemittanceDetails(this.paymentRemittancePdfService,id)
    }



    @ApiOperation({ summary: 'Api for supplier payment remittance export' })
    @Get('supplier/export-list')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async exportSupplierPaymentList(
        @User() user: JwtPayload,
        @Query() pagingDto: PaymentRemittanceFilterDto,
        @Res() res: Response
    ) {
        return await this.exportSupplierService.exportPaymentRemittance(res,user, pagingDto);
    }


    @ApiOperation({ summary: 'Api for Supplier payment remittance list' })
    @Get('supplier-list')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async supplierPaymentRemittanceList(
        @User() user: JwtPayload,
        @Query() pagingDto: PaymentRemittanceFilterDto,

    ) {
        return await this.supplierPaymentRemittanceService.getpaymentRemittanceSuppierList(user, pagingDto)
    }

    @ApiOperation({ summary: 'Api for supplier payment details ' })
    @Get('supplier/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getPaymentById(
        @User() user: JwtPayload,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.getSupplierPaymentDetails.getpaymentRemittanceDetails(this.supplierpaymentRemittancePdfService,id)
    }


    @Get('/buyer/summary/:paymentId')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    async buyerSummary(@Res() res: Response, @Param('paymentId') paymentId: number) {
        res.json({
            file: await this.getpdfService.paymentRemittanceSummary(res, paymentId),
        });
    }

    @Get('/supplier/summary/:paymentId')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    async supplierSummary(@Res() res: Response, @Param('paymentId') paymentId: number) {
        res.json({
            file: await this.getSupplierPdfService.paymentRemittanceSummary(res, paymentId),
        });
    }

    @Get('/purchase-org-list')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async purchaseOrgList(
        @User() user: JwtPayload,
    ){
        return await this.paymentRemittanceList.purchaseOrgList(user)
    }

}
