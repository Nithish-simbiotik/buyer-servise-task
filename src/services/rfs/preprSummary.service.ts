import { Injectable } from '@nestjs/common';
import { HTMLToPDFOptions } from 'convert-html-to-pdf';
import { Response } from 'express';
import { Submit } from 'src/dto/rfs/support.dto copy';
import { SubmitType } from 'src/enum/rfs/submitType.enum';
import { FileUpload } from '../fileupload/fileupload.service';
import { GetFlatPurchaseOrgService } from '../flat/getFlatPurchaseOrg.service';
import { GetRFSService } from './getRfs.service';
const HTMLToPDF = require('convert-html-to-pdf').default;
const moment = require("moment");

@Injectable()
export class PrePrSummaryPdfService {
  constructor(
    private getRfsService: GetRFSService,
    private pdfExportService: FileUpload,
    private getPurchaseOrg:GetFlatPurchaseOrgService
  ) {}
  async createPdf(res: Response, rfsId: number) {

    const data = await this.getRfsService.getRFSById(rfsId);
    let purchaseOrgAddress= await this.getPurchaseOrg.getFlatPurchaseOrgData(data.purchasingOrg)
   

    let html = `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="x-apple-disable-message-reformatting" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      // <link
      //   href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,500;1,500&display=swap"
      //   rel="stylesheet"
      // />
  
      <style>
        html,
        body {
          margin: 0 auto !important;
          padding: 0 !important;
          height: 100% !important;
          width: 100% !important;
          font-family: "Roboto", sans-serif;
        }
  
        .border1{
          border: 2px solid black;
          margin: 20px;
          height: auto;
          margin-bottom: 20px;
          
          
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
  
        img.g-img + div {
          display: none !important;
        }
  
        p,
        a,
        td {
          line-height: 1.8;
          font-size: 14px;
          font-family: "Roboto";
          font-weight: 400;
        }
  
        th {
          font-weight: 600;
          font-family: "Roboto";
          text-align: left;
        }
  
        .border {
          border: 1px solid #111725;
          width: 100%;
        }
  
        .border td,
        .border th {
          border: 1px solid #111725;
          padding: 4px;
         
        }
  
        .textTab td {
          padding: 3px;
        }
      </style>
    </head>
  
    <body
      style="margin: 0; font-family: 'Roboto', sans-serif; font-weight: 400;padding: 20px; "
    >
    <div style="padding: 20px;" >
      <div style="border: 1px solid black;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
          <td>
          <table align="center" border="0" cellpadding="0" cellspacing="0">
              <tr>
              <td>
                  <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  >
                  <tr bgcolor="#ffffff">
                      <td
                      style="
                          padding-bottom: 0;
                          padding-top: 0;
                          margin-top: 0;
                          margin-bottom: 0;
                      "
                      >
                      <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                          padding-bottom: 0;
                          padding-top: 0;
                          margin-top: 0;
                          margin-bottom: 0;
                          "
                      >
                          <tr
                          style="
                              padding-bottom: 0;
                              padding-top: 0;
                              margin-top: 0;
                              margin-bottom: 0;
                          "
                          >
                          <td
                              align="center"
                              bgcolor="#eaf1f9"
                              style="
                              text-align: center;
                              background: #ffffff;
                              padding-bottom: 0;
                              padding-top: 0;
                              margin-top: 0;
                              margin-bottom: 0;
                              width: auto;
                              height: auto;
                              display: block;
                              "
                          >
                              <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="
                                  padding-bottom: 0;
                                  padding-top: 0;
                                  margin-top: 0;
                                  margin-bottom: 0;
                              "
                              >
                              <tr
                                  style="
                                  padding-bottom: 0;
                                  padding-top: 0;
                                  margin-top: 0;
                                  margin-bottom: 0;
                                  "
                              >
                                  <td
                                  style="
                                      font-size: 0;
                                      mso-line-height-rule: exactly;
                                      line-height: 0;
                                      margin-top: 0;
                                      margin-bottom: 0;
                                  "
                                  width="10"
                                  ></td>
                                  <td
                                  align="center"
                                  bgcolor="#ffffff"
                                  width="640"
                                  style="
                                      padding-bottom: 15px;
                                      padding-top: 20px;
                                      margin-top: 0;
                                      margin-bottom: 0;
                                  "
                                  >
                                  <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                      padding-bottom: 0;
                                      padding-top: 0;
                                      margin-top: 0;
                                      margin-bottom: 0;
                                      "
                                  >
                                      <tr
                                      style="
                                          padding-bottom: 0;
                                          padding-top: 0;
                                          margin-top: 0;
                                          margin-bottom: 0;
                                      "
                                      >
                                      <td
                                          align="center"
                                          bgcolor="#ffffff"
                                          width="120"
                                          style="
                                          padding-bottom: 0;
                                          padding-top: 0;
                                          margin-top: 0;
                                          margin-bottom: 0;
                                          "
                                      >
                                          <div style="width: 33.3%; float: left ;">
                                          
                                          <div style="display: flex;margin-left:5px;">
                                            <div style="width:100px">
                                                <img
                                                width="90"
                                                src=${purchaseOrgAddress.logo}
                                                style="float: center; display: block"
                                            />
                                            </div>
                                             
                                          <div style="margin-left:20px;text-align: left;">
 ${purchaseOrgAddress.address}
                                              </div>
                                          </div>
                                          
                                          <table
                                              style="
                                              width: 100%;
                                              margin-top: 60px !important;
                                              float: left;
                                              "
                                              class="border"
                                              
                                          >
                                              <tr>
                                              <td
                                                  style="
                                                  min-width: 80px;
                                                  padding: 3px;
                                                  text-align: left;
                                                  width: 20%;
                                                  font-weight: bold;
  
                                                  "
                                              >
                                                  Title
                                              </td>
                                              <td style="padding: 3px">${data.title}</td>
                                              </tr>
                                          </table>
                                          </div>
                                          
                                          <div style="width: 33.3%; float: left">
                                          <table
                                              class="border"
                                              style="width: 70%"
                                          >
                                              <tr>
                                              <td
                                                  style="
                                                  min-width: 80px;
                                                  padding: 3px;
                                                  font-weight: bold;
                                                  width: 30%;
                                                  "
                                              >
                                                  Pre-PR ID
                                              </td>
                                              <td style="padding: 3px">${data.id}</td>
                                              </tr>
                                              <tr>
                                              <td
                                                  style="
                                                  min-width: 80px;
                                                  padding: 3px;
                                                  font-weight: bold;
                                                  width: 30%;
                                                  "
                                              >
                                                  Ref. No
                                              </td>
                                              <td style="padding: 3px">${data.internalReferenceNumber}</td>
                                              </tr>
                                          </table>
                                          </div>
                                          <div style="width: 33.3%; float: left">
                                          <table class="border">
                                              <tr>
                                              <td
                                                  style="
                                                  min-width: 140px;
                                                  font-weight: bold;
                                                  width: 30%;
                                                  "
                                              >
                                                  Delivery Address
                                              </td>
                                              <td style="padding: 3px;min-width: 80px;"> 
                                              ${data.deliveryAddress && data.deliveryAddressType=="List"?`${data.deliveryAddress.title?data.deliveryAddress.title+", ":""}${data.deliveryAddress.address_line_1?data.deliveryAddress.address_line_1+", ":""}${data.deliveryAddress.address_line_2?data.deliveryAddress.address_line_2+", ":""}${data.deliveryAddress.city?data.deliveryAddress.city+", ":""}${data.deliveryAddress.state?data.deliveryAddress.state+", ":""}${data.deliveryAddress.zip_code?data.deliveryAddress.zip_code+", ":""}${data.deliveryAddress.country?data.deliveryAddress.country:""}`:data.deliveryAddress}
                                               </td>
                                              </tr>
                                          </table>
                                          <table
                                              class="border"
                                              style="margin-top: 30px !important"
                                          >
                                              <tr>
                                              <td
                                                  style="
                                                  min-width: 80px;
                                                  padding: 3px;
                                                  font-weight: bold;
                                                  width: 30%;
                                                  "
                                              >
                                                  Urgent Job
                                              </td>
                                              <td style="padding: 3px">${data.urgent_job && data.urgent_job==true?"Yes":"No"}</td>
                                              </tr>
  
                                              <tr>
                                              <td
                                                  style="
                                                  min-width: 80px;
                                                  padding: 3px;
                                                  font-weight: bold;
                                                  "
                                              >
                                                  Reason
                                              </td>
                                              <td style="padding: 3px">${data.urgentJobOption}</td>
                                              </tr>
                                          </table>
                                          </div>
                                      </td>
                                      </tr>
                                      <tr
                                      style="
                                          padding-bottom: 0;
                                          padding-top: 0;
                                          margin-top: 0;
                                          margin-bottom: 0;
                                      "
                                      >
                                      <td
                                          align="left "
                                          bgcolor="#ffffff "
                                          width="400 "
                                      >
                                          <table
                                          class="border"
                                          style="
                                              width: 100%;
                                              margin: 30px 0 !important;
                                          "
                                          >
                                          <tr style="min-width: 80px;">
                                              <th style="width: 40px">No</th>
                                              <th style="width: 25%">
                                              Item Name
                                              </th>
                                              <th>Brand</th>
                                              <th>Model</th>
                                              <th style="width: 5%;">UOM</th>
                                              <th style="width: 5%;">Quantity</th>
                                              <th style="width: 10%;">Internal Order No</th>
                                              <th>Work Order No</th>
                                              <th>Part No</th>
                                              <th>Cost Center</th>
                                          </tr>`;
                                          let boq=`
                                          <tr >
                                              <td>1</td>
                                              <td>
                                              Item name<br />
                                              Description<br />
                                              Equivalent Brand Allowed <br />
                                              </td>
                                              <td>
                                              <p>XX</p>
                                              </td>
                                              <td>YY</td>
                                              <td>LOT</td>
                                              <td>1</td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                          </tr>
                                          <tr>
                                              <td>2</td>
                                              <td>
                                              Item name<br />
                                              Description<br />
                                              Equivalent Brand Allowed <br />
                                              </td>
                                              <td>
                                              <p>XX</p>
                                              </td>
                                              <td>YY</td>
                                              <td>LOT</td>
                                              <td>1</td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                          </tr>`;
                                          let boqData = ''; 
                                          for (let i = 0; i < data.boq.length; i++) {
                                              boqData += ` 
                                          <tr>
                                              <td>${
                                                  i +
                                                  1
                                                }</td>
                                              <td>
                                                  ${
                                                      data
                                                        .boq[
                                                        i
                                                      ]
                                                        .itemName}<br />
                                              Description : ${data
                                                  .boq[
                                                  i
                                                ]
                                                  .itemDescription}<br />
                                              Equivalent Brand Allowed : ${
                                                  data
                                                    .boq[
                                                    i
                                                  ]
                                                    .equivalentBrandAllowed==null?"":data
                                                    .boq[
                                                    i
                                                  ]
                                                    .equivalentBrandAllowed}<br/>
                                              </td>
                                              <td>
                                              <p>${
                                                  data
                                                    .boq[
                                                    i
                                                  ]
                                                    .brand
                                                    ? data.boq[
                                                        i
                                                      ].brand
                                                        .split(
                                                          ',',
                                                        )
                                                        .join(
                                                          '<br/>',
                                                        )
                                                    : ""
                                                }</p>
                                              </td>
                                              <td>${
                                                data
                                                  .boq[
                                                  i
                                                ]
                                                  .model
                                                  ? data.boq[
                                                      i
                                                    ].model
                                                      .split(
                                                        ',',
                                                      )
                                                      .join(
                                                        '<br/>',
                                                      )
                                                  : ""
                                              }</td>
                                              <td>${
                                                  data
                                                  .boq[
                                                  i
                                                ]
                                                  .uomName?data
                                                      .boq[
                                                      i
                                                    ]
                                                      .uomName.split('-')[0]:""
                                                  }</td>
                                              <td>${
                                                  data
                                                    .boq[
                                                    i
                                                  ]
                                                    .quantity
                                                }</td>
                                              <td>${
                                                  data
                                                    .boq[
                                                    i
                                                  ]
                                                    .internalOrderName==null?"":data
                                                    .boq[
                                                    i
                                                  ]
                                                    .internalOrderName
                                                }</td>
                                              <td>${
                                                  data
                                                    .boq[
                                                    i
                                                  ]
                                                    .wordOrderNo==null?"":data
                                                    .boq[
                                                    i
                                                  ]
                                                    .wordOrderNo
                                                }</td>
                                              <td style="word-wrap:break-word">${
                                                  data
                                                    .boq[
                                                    i
                                                  ]
                                                    .partNumberName==null?"":data
                                                    .boq[
                                                    i
                                                  ]
                                                    .partNumberName
                                                }</td>
                                              <td>${
                                                  data
                                                    .boq[
                                                    i
                                                  ]
                                                    .costCenterName
                                                }</td>
                                          </tr>`;
                                      }
                                      let restData = `
                                          </table>
                                      </td>
                                      </tr>
                                      <tr
                                      style="
                                          padding-bottom: 0;
                                          padding-top: 0;
                                          margin-top: 0;
                                          margin-bottom: 0;
                                      "
                                      >
                                      <td
                                          align="left "
                                          bgcolor="#ffffff "
                                          width="400 "
                                      >
                                      <div style="width: 50%; float: left">  
                                          <table
                                          class="textTab"
                                          style="width: 60%"
                                         
                                          >
                                          <tr>
                                              <td style="max-width: 200px; font-weight: bold;">
                                              Sourcing Selection
                                              </td>
                                              <td>${data.sourcingSelection==null?"":data.sourcingSelection}</td>
                                          </tr>
                                          <tr>
                                              <td style="max-width: 200px;font-weight: bold;vertical-align: text-top;">
                                              Recommended Supplier
                                              </td>
                                              <td>${data.recommandedSuppliers
                                                  .map(
                                                    (
                                                      supp,
                                                    ) =>
                                                       supp.supplierName,
                                                  )
                                                  .toString().replaceAll(',','<br>')}
                                                 
                                                  </td>
                                          </tr>
                                          <tr>
                                              <td style="max-width: 200px;font-weight: bold;vertical-align: text-top;">
                                              Recommended New Supplier
                                              </td>
                                              <td>${data.recommandedNewSupplier.replaceAll(
                                                  '$',
                                                  '<br>',
                                                )}<br>
                                                 </td>
                                          </tr>
                                          <tr>
                                              <td style="max-width: 200px;font-weight: bold;">
                                              Previous Purchase Request
                                              </td>
                                              <td>${
                                                  data.previousPurchase==null?"": data.previousPurchase
                                                }</td>
                                          </tr>
                                          <tr>
                                              <td style="max-width: 200px;font-weight: bold;">Estimated Cost (Job/Project)</td>
                                           
                                              <td>${
                                                  data.estimateCost==null?"":data.estimateCost.toLocaleString()
                                                }
                                              </td>
                                          </tr>
                                          
                                         
                                          </table>
                                      </div>
                                          <div style="width: 50%; float: left">
                                              <div style="display: flex; ">
                                              <h4 style="min-width:200px;margin-top: 0px;">Justification Of Purchase</h4>
                                              <div>${
                                                  data.justificationOfPurchase
                                                }
                                                  </div>
                                              </div>
                                              </div>
                                      </td>
                                      </tr>
                                      
                                      <tr
                                      style="
                                          padding-bottom: 0;
                                          padding-top: 0;
                                          margin-top: 0;
                                          margin-bottom: 0;
                                      "
                                      >
                                      <td
                                          align="left "
                                          bgcolor="#ffffff "
                                          width="400 "
                                      >
                                          <div style="width: 75%; float: left">
                                          <h4>Approval Workflow</h4>
                                          <table
                                              style="width: 75%"
                                              class="border"
                                          >
                                              <tr>
                                              <th style="width: 20%;min-width:200px;"></th>
                                              <th>Name</th>
                                              <th>Approval Date</th>
                                              </tr>`;
                                              let levelData = ''; 
                                              for (let i = 0; i < data.levels.length; i++) {
                                                  let obj =data.notifications.find(notify => notify.level==data.levels[i].level)
                                                  console.log(obj)
                                                levelData += ` 
                                              <tr>
                                              <td>${data.levels[i].levelName}</td>
                                              <td>${data.levels[i].userName}</td>
                                              <td>${obj!=undefined && obj.status==SubmitType.APPROVED?moment(obj.updated_At).format('DD-MM-YYYY'):""}</td>
                                              </tr>`;
                                          }
                                          let footerData = `
                                          </table>
                                          </div>
                                          <div style="width: 25%; float: left">
                                          <h4>Requestor Details</h4>
                                          <table
                                              style="width: 100%"
                                              class="border"
                                          >
                                          <tr>
                                              <td style="width: 30% ;min-width: 80px;">Name:</td>
                                              <td style="width: 70%">${data.requestor_name}</td>
                                              </tr>
                                              <tr>
                                              <td style="width: 30% ;min-width: 80px;">Dept:</td>
                                              <td style="width: 70%">${data.department}</td>
                                              </tr>
                                              <tr>
                                              <td style="width: 30% ;min-width: 80px;">Contact No:</td>
                                              <td style="width: 70%">${data.requestor_phone_number==null?"":data.requestor_phone_number}</td>
                                              </tr>
                                              <tr>
                                              <td style="width: 30% ;min-width: 80px;">Email:</td>
                                              <td style="width: 70% ;word-wrap:break-word">${data.requestor_email}</td>
                                              </tr>
                                          </table>
                                          </div>
                                      </td>
                                      </tr>
                                  </table>
                                  </td>
                                  <td
                                  style="
                                      font-size: 0;
                                      margin-auto: 0px;
                                      mso-line-height-rule: exactly;
                                      line-height: 0;
                                  "
                                  width="10 "
                                  ></td>
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
  </div>
   </div>
    </body>
  </html>`;
  
    

    const finalData = html + boqData + restData + levelData + footerData;

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
      await this.pdfExportService.uploadPDF(res, pdfBuffer, rfsId,data.internalReferenceNumber);

      // do something with the PDF file buffer
    } catch (err) {
      res.json(err);
    }
    return '';
  }
}

