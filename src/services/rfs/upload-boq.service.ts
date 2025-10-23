import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { Environment } from 'src/env/environment';
import { Workbook } from 'exceljs';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { UOMService } from '../flat/uom.service';
import { GetFlatCostService } from '../flat/getFlatCost.service';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { InternalOrderService } from '../flat/internalOrder.service';
import { PreprBillOfQuantityEntity } from 'src/entities/prepr/prepr-bill-of-quantity.entity';
import { PartNumberService } from '../flat/partNumber.service';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class UploadBoqService {
  constructor(
    private getUOMService: UOMService,
    private getCostCenterService: GetFlatCostService,
    private getinternalOrderService: InternalOrderService,
    private getPartNumber: PartNumberService,
  ) { }

  getBlobClient(imageName: string): BlockBlobClient {
    const blobClientService = BlobServiceClient.fromConnectionString(
      Environment.azureStorage.connection,
    );
    const containerClient = blobClientService.getContainerClient(
      Environment.azureStorage.containerName,
    );
    const blobClient = containerClient.getBlockBlobClient(imageName);
    return blobClient;
  }

  async upload(res: Response, file: Express.Multer.File) {
    const blobClient = this.getBlobClient(file.originalname);
    await blobClient.uploadData(file.buffer);
    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = await this.streamToBuffer(
      downloadBlockBlobResponse.readableStreamBody,
    );
    let dataOBbj = await this.importBOQ(
      res,
      downloaded,
      this.getCostCenterService,
      this.getUOMService,
      this.getinternalOrderService,
      this.getPartNumber,
    );
    //  console.log(dataOBbj,"dataobj");
    //   return dataOBbj;
  }
  async streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
      const workbook = new Workbook();
      let data = [];
      workbook.xlsx.read(readableStream).then(function () {
        let worksheet = workbook.getWorksheet(1);
        worksheet.eachRow({ includeEmpty: true }, function (row) {
          if (worksheet.rowCount > 0) {
            console.log(row.values);
            data.push(row.values);
          } else {
            reject;
          }
        });
        resolve(JSON.stringify(data));
      });
    });
  }

  public async importBOQ(
    res: Response,
    downloaded,
    getCostService: GetFlatCostService,
    getUOMService: UOMService,
    getinternalOrderService: InternalOrderService,
    getPartNumber: PartNumberService,
  ) {
    let preprTemplateList = [];
    const array = JSON.parse(downloaded);
    try {
      let newTemplate;
      let arrobj = [];
      console.log(array.length, 'length');
      //file header check
      if (array[0][1] == "Item Name*" || array[0][2] == "Item Description" || array[0][3] == "Equivalent Brand Allowed ?*" || array[0][4] == "Brand" || array[0][5] == "Model" || array[0][7]=="UOM*" || array[0][6]=="Quantity*" || array[0][8]=="Cost Center*" || array[0][9]=="Work Order No" || array[0][10]=="Internal Order No" || array[0][11]=="Part Number"){

        if (array && array.length > 1) {
          for (let i = 1; i < array.length; i++) {
            // let levelData = [];
            // let levelId = 0;

            let equivalent = ['Yes', 'Yes with option', 'Not applicable', 'No'];
            newTemplate = new PreprBillOfQuantityEntity();
            if (array[i][1]) {
              newTemplate.itemName = array[i][1];
            } else {
              throw new HttpException(
                {
                  status: HttpStatus.UNPROCESSABLE_ENTITY,
                  error: `Error uploading due to invalid data in Item Name in row ${i}`,
                },
                HttpStatus.UNPROCESSABLE_ENTITY,
              );
            }
            newTemplate.itemDescription = array[i][2];
            if (equivalent.includes(array[i][3])) {
              newTemplate.equivalentBrandAllowed = array[i][3];
            } else {
              throw new HttpException(
                {
                  status: HttpStatus.UNPROCESSABLE_ENTITY,
                  error: `Error uploading due to invalid data in Equivalent Brand Allowed in row ${i}`,
                },
                HttpStatus.UNPROCESSABLE_ENTITY,
              );
            }
            newTemplate.brand = array[i][4];
            newTemplate.model = array[i][5];
            if (array[i][7]) {
              array[i][7]= array[i][7].toString()
              let uomIndex = array[i][7].indexOf("-")
              console.log(uomIndex, "index")
              if (uomIndex >= 1) {
                array[i][7] = array[i][7].replace("-", "@")
                let uomID = array[i][7].toString().split("@");
                // console.log(uomID,"")


                newTemplate.uomId = await getUOMService.getUOMIdByName(uomID[0].trim(), uomID[1].trim());
                if (newTemplate.uomId == 0) {
                  throw new HttpException(
                    {
                      status: HttpStatus.UNPROCESSABLE_ENTITY,
                      error: `Error uploading due to invalid data in UOM in row ${i}`,
                    },
                    HttpStatus.UNPROCESSABLE_ENTITY,
                  );
                }
              }
              else{
                throw new HttpException(
                  {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    error: `Error uploading due to invalid data in UOM in row ${i}`,
                  },
                  HttpStatus.UNPROCESSABLE_ENTITY,
                );
              }
             
            } else {
              throw new HttpException(
                {
                  status: HttpStatus.UNPROCESSABLE_ENTITY,
                  error: `Error uploading due to empty data in UOM in row ${i}`,
                },
                HttpStatus.UNPROCESSABLE_ENTITY,
              );
            }
            if (array[i][6]) {
              newTemplate.quantity = array[i][6];
            } else {
              throw new HttpException(
                {
                  status: HttpStatus.UNPROCESSABLE_ENTITY,
                  error: `Error uploading due to empty data in Quantity in row ${i}`,
                },
                HttpStatus.UNPROCESSABLE_ENTITY,
              );
            }
            if (array[i][8]) {
              array[i][8]=array[i][8].toString()
              let costIndex = array[i][8].indexOf("-")
              // console.log(uomIndex,"index")
              if (costIndex >= 1) {
                array[i][8] = array[i][8].replace("-", "@")
                let costID = array[i][8].toString().split("@")
                console.log(costID,"costID")
                newTemplate.costCenterId =
                  await getCostService.getFlatCostCenterIdByNameandDescription(Number(costID[0].trim()),costID[1].trim());
                  if (newTemplate.costCenterId == 0) {
                    throw new HttpException(
                      {
                        status: HttpStatus.UNPROCESSABLE_ENTITY,
                        error: `Error uploading due to invalid data in Cost Center in row ${i}`,
                      },
                      HttpStatus.UNPROCESSABLE_ENTITY,
                    );
                  }
              }else{
                throw new HttpException(
                  {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    error: `Error uploading due to invalid data in Cost Center in row ${i}`,
                  },
                  HttpStatus.UNPROCESSABLE_ENTITY,
                );
              }
             
            } else {
              throw new HttpException(
                {
                  status: HttpStatus.UNPROCESSABLE_ENTITY,
                  error: `Error uploading due to empty data in Cost Center in row ${i}`,
                },
                HttpStatus.UNPROCESSABLE_ENTITY,
              );
            }
            newTemplate.wordOrderNo = array[i][9];
            if (array[i][10]) {
              array[i][10]=array[i][10].toString()
              let costIndex = array[i][10].indexOf("-")
              // console.log(uomIndex,"index")
              if (costIndex >= 1) {
                array[i][10] = array[i][10].replace("-", "@")
                let internalId = array[i][10].toString().split("@")
                console.log(internalId,"idd")
                newTemplate.internalOrderNoId =
                  await getinternalOrderService.getInternalOrderNumberIdByName(
                    Number(internalId[0].trim()), internalId[1]
                  );
                if (newTemplate.internalOrderNoId == 0) {
                  throw new HttpException(
                    {
                      status: HttpStatus.UNPROCESSABLE_ENTITY,
                      error: `Error uploading due to invalid data in Internal Order Number in row ${i}`,
                    },
                    HttpStatus.UNPROCESSABLE_ENTITY,
                  );
                }
              }else{
                throw new HttpException(
                  {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    error: `Error uploading due to invalid data in Internal Order Number in row ${i}`,
                  },
                  HttpStatus.UNPROCESSABLE_ENTITY,
                );
              }
            }


            if (array[i][11]) {
              array[i][11]=array[i][11].toString()
              let costIndex = array[i][11].indexOf("-")
              // console.log(uomIndex,"index")
              if (costIndex >= 1) {
                array[i][11] = array[i][11].replace("-", "@")
                let partno = array[i][11].toString().split("@")
                console.log(partno,"part no")
                newTemplate.partNumberId = await getPartNumber.getPartNumberIdByName(Number(partno[0].trim()), partno[1].trim());
                if (newTemplate.partNumberId == 0) {
                  throw new HttpException(
                    {
                      status: HttpStatus.UNPROCESSABLE_ENTITY,
                      error: `Error uploading due to invalid data in Part Number in row ${i}`,
                    },
                    HttpStatus.UNPROCESSABLE_ENTITY,
                  );
                }
              }
              else{
                throw new HttpException(
                  {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    error: `Error uploading due to invalid data in Part Number in row ${i}`,
                  },
                  HttpStatus.UNPROCESSABLE_ENTITY,
                );
              }
            }
            // else {
            //   throw new HttpException(
            //     {
            //       status: HttpStatus.UNPROCESSABLE_ENTITY,
            //       error: `Error uploading due to empty data in Part Number in row ${i}`,
            //     },
            //     HttpStatus.UNPROCESSABLE_ENTITY,
            //   );
            // }
            arrobj.push(newTemplate);
            if (array.length - 1 === i) {
              res.send(arrobj);
            }
          }
        } else {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              error: `Please fill all mandatory BQ fields`,
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      }else{
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            error: `Unable to process uploaded file`,
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      // console.log(arrobj,"arr obj");
    } catch (error) {
      console.log(error, "Error")
      res.send(error);
    }
  }
}
