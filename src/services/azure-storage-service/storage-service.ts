import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { AzureStorageService } from '@nestjs/azure-storage';
import { Injectable } from '@nestjs/common';
import { Environment } from 'src/env/environment';
import { Express } from 'express';
import {
  GeneralFile,
  GeneralFileDto,
} from 'src/interface/common/rfx-attachment.interface';

@Injectable()
export class ProcStorageService {
  constructor() {} // private readonly azureStorage: AzureStorageService
  getBlobClient(imageName: string): BlockBlobClient {
    try {
      const blobClientService = BlobServiceClient.fromConnectionString(
        Environment.getAzureStorageOptionsConst().azureConnection,
      );
      const containerClient = blobClientService.getContainerClient(
        Environment.getAzureStorageOptionsConst().containerName,
      );
      const blobClient = containerClient.getBlockBlobClient(imageName);
      console.log(blobClient.url);
      return blobClient;
    } catch (error) {
      return error;
    }
  }

  async delete(files: GeneralFileDto[]) {
    let deletedfile;
    for (const file of files) {
      let blobClient = this.getBlobClient(file.originalname);
      deletedfile = await blobClient.deleteIfExists();
    }
    return deletedfile;
  }

  async getfileStream(fileName: string) {
    try {
      const blobClient = this.getBlobClient(fileName);
      var blobDownloaded = await blobClient.download();
      console.log(blobDownloaded, 'Line on 44 Storage Service 👌👌');
      return blobDownloaded.readableStreamBody;
    } catch (error) {
      return error.message;
    }
  }
}
