import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";
import { Environment } from "src/env/environment";
import { Workbook } from "exceljs";
import { Response } from "express";
import { Stream } from "stream";
import { InjectRepository } from "@nestjs/typeorm";
const xlsx = require('xlsx');
const path = require('path');

@Injectable()
export class ExcelService {
    constructor(

    ) { }

    getBlobClient(imageName: string): BlockBlobClient {
        const blobClientService = BlobServiceClient.fromConnectionString(
            Environment.azureStorage.connection
        );
        const containerClient = blobClientService.getContainerClient(
            Environment.azureStorage.containerName
        );
        const blobClient = containerClient.getBlockBlobClient(imageName);
        return blobClient;
    }

    async upload(file: Express.Multer.File) {
        const blobClient = this.getBlobClient(file.originalname);
        await blobClient.uploadData(file.buffer);
        const downloadBlockBlobResponse = await blobClient.download();
        const downloaded = await this.streamToBuffer(
            downloadBlockBlobResponse.readableStreamBody
        );
        return downloaded;
    }
    async streamToBuffer(readableStream) {
        return new Promise((resolve, reject) => {
            const workbook = new Workbook();
            const data = [];
            workbook.xlsx.read(readableStream).then(function () {
                let worksheet = workbook.getWorksheet(1);
                worksheet.eachRow({ includeEmpty: true }, function (row) {
                    if (worksheet.rowCount > 0) {
                        data.push(row.values);
                    } else {
                        reject;
                    }
                });
                resolve(JSON.stringify(data));
            });
        });
    }



    
   async exportExcel (data,  workSheetName, filePath) {
        const workBook = xlsx.utils.book_new();
        const workSheetData = [
            // workSheetColumnNames,
            ... data
        ];
        const workSheet = xlsx.utils.json_to_sheet(workSheetData);
        xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
        xlsx.writeFile(workBook, path.resolve(filePath));
    }
    
    async exportUsersToExcel (users, workSheetName, filePath) {
        const data = users.map(user => {
            return true;
        });
        this.exportExcel(data, workSheetName, filePath);
    }
    
}
