import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PRTemplateRepository } from 'src/repos/pr_Repos/prTemplateNew.repository';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { ProcStorageService } from 'src/services/azure-storage-service/storage-service';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { Environment } from 'src/env/environment';
import { Workbook } from 'exceljs';
import { GetFlatPurchaseOrgService } from 'src/services/flat/getFlatPurchaseOrg.service';
import { GetFlatCostService } from 'src/services/flat/getFlatCost.service';
import { GetFlatCurrencyService } from 'src/services/flat/getFlatCurrency.service';
import { GetDepartmentService } from 'src/services/user/getDepartment.service';
import { GetAllUsers } from 'src/services/user/getAllUser.service';

@Injectable()
export class ImportPrTemplateService {
  constructor(
    // private procStorageService: ProcStorageService,
    private prTemplateRepo: PRTemplateRepository,
    private getPurchaseOrgService: GetFlatPurchaseOrgService,
    private getCostCenterService: GetFlatCostService,
    private getCurrencyService: GetFlatCurrencyService,
    private getDeparmentService: GetDepartmentService,
    private getUserSevice: GetAllUsers,
  ) {}

  // async upload(res: Response, file: Express.Multer.File, user: JwtPayload) {
  //   try {
  //     let uploadData = await this.procStorageService.getfileStream;

  //     this.prTemplateRepo.importSourcingTemplate(res, uploadData, user);
  //   } catch (error) {
  //     return error;
  //   }
  // }

  getBlobClient(imageName: string): BlockBlobClient {
    const blobClientService = BlobServiceClient.fromConnectionString(
      Environment.azureStorage.connectionName,
    );
    const containerClient = blobClientService.getContainerClient(
      Environment.azureStorage.containerName,
    );
    const blobClient = containerClient.getBlockBlobClient(imageName);
    return blobClient;
  }

  async upload(res: Response, file: Express.Multer.File, user: JwtPayload) {
    const blobClient = this.getBlobClient(file.originalname);
    await blobClient.uploadData(file.buffer);
    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = await this.streamToBuffer(
      downloadBlockBlobResponse.readableStreamBody,
    );
    this.prTemplateRepo.importPrTemplate(
      res,
      downloaded,
      user,
      this.getCostCenterService,
      this.getPurchaseOrgService,
      this.getCurrencyService,
      this.getDeparmentService,
      this.getUserSevice,
    );
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
