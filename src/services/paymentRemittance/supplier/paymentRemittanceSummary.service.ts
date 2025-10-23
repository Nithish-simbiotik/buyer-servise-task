import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HTMLToPDFOptions } from 'convert-html-to-pdf';
import { Response } from 'express';
import { PaymentRemittanceRepository } from 'src/repos/payment-remittance/payment-remittance.repository';
import { FileUpload } from 'src/services/fileupload/fileupload.service';
import { GetFlatPurchaseOrgService } from 'src/services/flat/getFlatPurchaseOrg.service';
import { GetRFSService } from 'src/services/rfs/getRfs.service';
// import { GetPaymentInvoiceListService } from './payment-invoice-details.service';
const HTMLToPDF = require('convert-html-to-pdf').default;
const moment = require("moment");



@Injectable()
export class SupplierPaymentRemittancePdfService {
  constructor(
    @InjectRepository(PaymentRemittanceRepository)
    private paymentRemittanceRepo: PaymentRemittanceRepository,
    private getRfsService: GetRFSService,
    private pdfExportService: FileUpload,
    private getPurchaseOrg:GetFlatPurchaseOrgService,
    // private getInvoiceDetails:GetPaymentInvoiceListService
  ) {}
  
   async createPdf(invoiceId: number,data):Promise<any> {
    // let data=data

    // const data = await this.getInvoiceDetails.getpaymentRemittanceDetails(res,invoiceId);

let html = `<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
    rel="stylesheet">

  <style>
    html,
    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      font-family: 'Roboto', sans-serif;
    }

    * {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    div[style*="margin: 16px 0"] {
      margin: 0 !important;
    }

    table,
    td {
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }

    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      /* margin: 0 auto !important; */

    }

    table table table {
      table-layout: auto;

    }

    img {
      -ms-interpolation-mode: bicubic;
    }

    *[x-apple-data-detectors],
    .x-gmail-data-detectors,
    .x-gmail-data-detectors *,
    .aBn {
      border-bottom: 0 !important;
      cursor: default !important;
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      mso-line-height-rule: inherit !important;
    }

    .a6S {
      display: none !important;
      opacity: 0.01 !important;
    }

    img.g-img+div {
      display: none !important;
    }

    p,
    a,
    td {
      line-height: 2;
      font-size: 14px;
      font-weight: 400;
    }

    th {
      font-weight: 600;
      text-align: left;
    }

    .border {
      border: 1px solid #111725;
      width: 100%;
    }

    .border td,
    .border th {
      border: 1px solid #111725;
      padding: 4px 10px;
    height: 35px;
    }

    .textTab td {
      padding: 3px;
    }
  </style>
</head>

<body style="margin: 0; font-family: 'Roboto', sans-serif; font-weight: 400;padding: 20px; ">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <table align="center" border="0" cellpadding="0" cellspacing="0">
                <tr bgcolor="#ffffff">
                  <td style="
                    padding-bottom: 0;
                    padding-top: 0;
                    margin-top: 0;
                    margin-bottom: 0;
                ">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="
                    padding-bottom: 0;
                    padding-top: 0;
                    margin-top: 0;
                    margin-bottom: 0;
                    ">
                      <tr style="
                        padding-bottom: 0;
                        padding-top: 0;
                        margin-top: 0;
                        margin-bottom: 0;
                    ">
                        <td align="center" bgcolor="#eaf1f9" style="
                        text-align: center;
                        background: #ffffff;
                        padding-bottom: 0;
                        padding-top: 0;
                        margin-top: 0;
                        margin-bottom: 0;
                        width: auto;
                        height: auto;
                        display: block;
                        ">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="
                            padding-bottom: 0;
                            padding-top: 0;
                            margin-top: 0;
                            margin-bottom: 0;
                        ">
                            <tr style="
                            padding-bottom: 0;
                            padding-top: 0;
                            margin-top: 0;
                            margin-bottom: 0;
                            ">
                              <td style="
                                font-size: 0;
                                mso-line-height-rule: exactly;
                                line-height: 0;
                                margin-top: 0;
                                margin-bottom: 0;
                            " width="10"></td>
                              <td align="left" bgcolor="#ffffff" width="640" style="
                                padding-bottom: 15px;
                                padding-top: 20px;
                                margin-top: 0;
                                margin-bottom: 0;
                            ">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="
                                padding-bottom: 0;
                                padding-top: 0;
                                margin-top: 0;
                                margin-bottom: 0;
                                ">
                                  <tr style="
                                    padding-bottom: 0;
                                    padding-top: 0;
                                    margin-top: 0;
                                    margin-bottom: 0;
                                ">


                                  <tr style="
                                    padding-bottom: 0;
                                    padding-top: 0;
                                    margin-top: 0;
                                    margin-bottom: 0;
                                ">
                                 <h3 style="margin-bottom: 20px;">Payment Remittance Details</h3>
                                    <td align="left " bgcolor="#ffffff " width="400">
                                     
                                      <table border="0" cellpadding="0" cellspacing="0" width="80%">
                                        <tr style="height: 40px;">
                                          <td style="max-width: 30%;">Payment Reference</td>
                                          <td style="width: 70%;">: ${data.referenceNumber}</td>
                                        </tr>
                                        <tr style="height: 40px;">
                                            <td style="max-width: 30%;">Payment Date</td>
                                            <td style="width: 70%;">: ${moment(data.paymentDate).format('DD/MM/YYYY')}</td>
                                          </tr>
                                          <tr style="height: 40px;">
                                            <td style="max-width: 30%;">Payment Method</td>
                                            <td style="width: 70%;">: ${data.paymentMethod}</td>
                                          </tr>
                                          <tr style="height: 40px;">
                                            <td style="max-width: 30%;">Company</td>
                                            <td style="width: 70%;text-transform: uppercase;">: ${data.purchaseOrg}</td>
                                          </tr>
                                      </table>

                                    </td>
                                  </tr>

                                  <tr style="
                                    padding-bottom: 0;
                                    padding-top: 0;
                                    margin-top: 0;
                                    margin-bottom: 0;
                                ">
                                    <td align="left " bgcolor="#ffffff " width="400 ">
                                      <h3 style="margin: 20px 0;"><u>Remitted Invoice Listing</u></h3>
                                      <table style="width: 100%;" class="border">
                                        <tbody>
                                            <tr style="background: #c1ebff;">
                                                <th width="80">No</th>
                                                <th>Invoice Number</th>
                                                <th>Invoice Date</th>
                                                <th style="text-align: right;">Invoice Amount</th>
                                            </tr>`
                                            let invoiceData ='';
                                            for(let i=0;i<data.invoiceDetails.length;i++){
                                                invoiceData+=`
                                            <tr>
                                                <td>${i+1}</td>
                                                <td>${data.invoiceDetails[i].invoiceNumber}</td>
                                                <td>${moment(data.invoiceDetails[i].invoiceDate).format('DD/MM/YYYY')}</td>
                                                <td style="text-align: right;">${data.invoiceDetails[i].invoiceAmount}</td>
                                            </tr>`;
                                            }
                                            let resData=`
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td style="font-weight: 600;">Grand Total(MYR)</td>
                                                <td style="font-weight: 600; text-align: right;">${data.totalAmount}</td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td style="
                                font-size: 0;
                                margin-auto: 0px;
                                mso-line-height-rule: exactly;
                                line-height: 0;
                            " width="10 "></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>

</html>`

const finalData = html + invoiceData + resData;

let options: HTMLToPDFOptions = {
    browserOptions: {
      executablePath: '/usr/bin/google-chrome',
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process',
      ],
    },
 
    pdfOptions: {
      format: 'A3',
      landscape: true,
    },
  };
  const htmlToPDF = new HTMLToPDF(finalData, options); 
  console.log('htmlToPDF-->', htmlToPDF);

  try {
    const pdfBuffer = await htmlToPDF.convert();
    const pdfUrl = await this.pdfExportService.uploadSupplierPaymentRemittance(pdfBuffer,data.id,data.referenceNumber);
    // res.json("done")
    // do something with the PDF file buffer
  } catch (err) {
    return err ;
    // return "done";
  }
}
}