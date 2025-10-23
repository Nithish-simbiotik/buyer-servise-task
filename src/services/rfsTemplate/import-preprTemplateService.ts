import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";
import { Environment } from "src/env/environment";
import { Workbook } from "exceljs";
import { Response } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { RFSTemplateRepository } from "src/repos/rfsTemplate.repository";
import { JwtPayload } from "src/interface/user/jwt.payload.interface";
import { GetFlatCostService } from "../flat/getFlatCost.service";
import { GetFlatPurchaseOrgService } from "../flat/getFlatPurchaseOrg.service";
import { GetFlatCurrencyService } from "../flat/getFlatCurrency.service";
import { GetDepartmentService } from "../user/getDepartment.service";
import { GetAllUsers } from "../user/getAllUser.service";

@Injectable()
export class ImportPreprTemplateService {
  constructor(
    @InjectRepository(RFSTemplateRepository)
		private rfsTemplateRepo: RFSTemplateRepository,
    private getPurchaseOrgService: GetFlatPurchaseOrgService,
		private getCostCenterService: GetFlatCostService,
		private getCurrencyService: GetFlatCurrencyService,
    private getDeparmentService : GetDepartmentService,
    private getUserSevice : GetAllUsers
  ) {}

  getBlobClient(imageName: string): BlockBlobClient {
    const blobClientService = BlobServiceClient.fromConnectionString(
      Environment.azureStorage.connectionName
    );
    const containerClient = blobClientService.getContainerClient(
      Environment.azureStorage.containerName
    );
    const blobClient = containerClient.getBlockBlobClient(imageName);
    return blobClient;
  }

  async upload(res: Response, file: Express.Multer.File,user:JwtPayload) {
    const blobClient = this.getBlobClient(file.originalname);
    await blobClient.uploadData(file.buffer);
    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = await this.streamToBuffer(
      downloadBlockBlobResponse.readableStreamBody
    );
    this.rfsTemplateRepo.importPrePrTemplate(res, downloaded,user,this.getCostCenterService,this.getPurchaseOrgService,this.getCurrencyService,this.getDeparmentService,this.getUserSevice );
  }

  async streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
      const workbook = new Workbook();
      const supplierList = [];
      workbook.xlsx.read(readableStream).then(function () {
        let worksheet = workbook.getWorksheet(1);
        worksheet.eachRow({ includeEmpty: true }, function (row) {
          if (worksheet.rowCount > 0) {
            supplierList.push(row.values);
          } else {
            reject;
          }
        });
        resolve(JSON.stringify(supplierList));
      });
    });
  }
}
