import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";
import { Environment } from "src/env/environment";
import { Workbook } from "exceljs";
import { Response } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierRepository } from "src/repos/supplier-repos/supplier.repository";

@Injectable()
export class UploadSupplierService {
  constructor(
    @InjectRepository(SupplierRepository)
    private supplierRepository: SupplierRepository
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

  async upload(res: Response, file: Express.Multer.File) {
    const blobClient = this.getBlobClient(file.originalname);
    await blobClient.uploadData(file.buffer);
    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = await this.streamToBuffer(
      downloadBlockBlobResponse.readableStreamBody
    );
    this.supplierRepository.importSupplier(res, downloaded);
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
