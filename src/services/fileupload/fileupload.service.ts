import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRFSDto } from 'src/dto/rfs/create-rfs.dto';
import { CreateRFSTemplateDto } from 'src/dto/rfsTemplate/create-rfsTemplate.dto';
import { PagingDto } from 'src/dto/paging.dto';
import { RFSRepository } from 'src/repos/rfs.repository';
// import { FlatRepository } from "src/repos/flats/flat.repository";
import { getRepository, Repository } from 'typeorm';
import {
  BlobClient,
  BlobServiceClient,
  BlockBlobClient,
  newPipeline,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { Environment } from 'src/env/environment';
import { Response } from 'express';
import { PrePdfEntity } from 'src/entities/prepr/prepr_pdf.entity';
import {BuyerPaymentRemittancePdfEntity } from 'src/entities/paymentRemittance/buyer-invoice/paymentRemittancePdf.entity';
import { SupplierPaymentRemittancePdfEntity } from 'src/entities/paymentRemittance/supplier-invoice/paymentRemittancePdf.entity';


// const getBlobName = (originalName) => {
  var identifier = Math.random().toString();
  // return `${identifier}`;
// };

const azureConnection = Environment.azureStorage.connection;
const containerName = `${Environment.azureStorage.containerName}/${identifier}`;
const accountName = Environment.azureStorage.accountName;
const accountKey = Environment.azureStorage.sasKey;

// const getBlobName = (originalName) => {
//   const identifier = Math.random().toString().replace(/0\./, '');
//   return `${identifier}-${originalName}`;
// };

const blobClientService =
  BlobServiceClient.fromConnectionString(azureConnection);

@Injectable()
export class FileUpload {
  constructor(
    @InjectRepository(RFSRepository)
    private rfsRepo: RFSRepository,
  ) {}

  getBlobClient(imageName: string): BlockBlobClient {
    const blobClientService =
      BlobServiceClient.fromConnectionString(azureConnection);
    const containerClient = blobClientService.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(imageName);
    // console.log(blobClient.url)
    return blobClient;
  }

  async upload(files: Array<Express.Multer.File>) {
    console.log(files.length, 'files');
    for (let i = 0; i < files.length; i++) {
      const blobClient = this.getBlobClient(files[i].originalname);
      await blobClient.uploadData(files[i].buffer);
      console.log(blobClient.url[i]);
      return 'uploaded';
    }
  }
  async uploadPDF(res: Response, pdfBuffer, rfsId,refNo) {
    const filename = 'Summary' + rfsId + '.pdf';
    const filenamee= 'Pre-PR Summary '+`(${rfsId}) `+`${refNo}`+'.pdf';
    const blobClient = this.getBlobClient(filenamee);
    await blobClient.uploadData(pdfBuffer);
    const url = blobClient.url;
    let pr =  await getRepository(PrePdfEntity)
    let data =  await pr.findOne({preprId:rfsId})
    if(data){
      pr.update({preprId:rfsId},{pdfUrl:url })
    }
    else{
      let pdfObj = new PrePdfEntity();
      pdfObj.pdfUrl =url;
      pdfObj.preprId =rfsId;
      console.log(pdfObj,"pDfobj")
     pr.save(pdfObj);
    }
  }

//payment remittance pdf upload
  async uploadPaymentRemittance( pdfBuffer,paymentId:number,referenceNumber) {
    const filename = `${referenceNumber}`+'.pdf';
    var containerClient =
    blobClientService.getContainerClient(`${containerName}/${Math.random()}`);
    var blobClient = containerClient.getBlockBlobClient(filename);
    try {
    await blobClient.uploadData(pdfBuffer);
    const url = blobClient.url;
    console.log(url)
    let pr =  await getRepository(BuyerPaymentRemittancePdfEntity)
    let data =  await pr.findOne({paymentRemittanceId:paymentId})
    if(data){
      // pr.update({paymentRemittanceId:paymentId},{pdfUrl:url })
      console.log("found")
    }
    else{
      let pdfObj = new  BuyerPaymentRemittancePdfEntity();
      pdfObj.pdfUrl =url;
      pdfObj.paymentRemittanceId =paymentId;
      console.log(pdfObj,"pDfobj")
     pr.save(pdfObj);
    }
  }catch(err){
    console.log(err)
  }
  }


  async uploadSupplierPaymentRemittance( pdfBuffer,paymentId:number,referenceNumber) {
    const filename = `${referenceNumber}`+'.pdf';
    var containerClient =
    blobClientService.getContainerClient(`${containerName}/${Math.random()}`);
    var blobClient = containerClient.getBlockBlobClient(filename);
    await blobClient.uploadData(pdfBuffer);
    const url = blobClient.url;
    let pr =  await getRepository(SupplierPaymentRemittancePdfEntity)
    let data =  await pr.findOne({paymentRemittanceId:paymentId})
    if(data){
      pr.update({paymentRemittanceId:paymentId},{pdfUrl:url })
    }
    else{
      let pdfObj = new SupplierPaymentRemittancePdfEntity();
      pdfObj.pdfUrl =url;
      pdfObj.paymentRemittanceId =paymentId;
      console.log(pdfObj,"pDfobj")
     pr.save(pdfObj);
    }
  }

  async uploadFiles(files: Array<Express.Multer.File>, filedata) {
    const docs: any = files;
    const fileObj = filedata;
    if (files != null && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        // var blobName = getBlobName(files[i].originalname);
        var containerClient =
          blobClientService.getContainerClient(containerName);
         
        var blockBlobClient = containerClient.getBlockBlobClient(files[i].originalname);
        try {
          await blockBlobClient.uploadData(files[i].buffer);
          console.log(blockBlobClient.url, 'url');
          // const docs:any = files
          docs[i].url = blockBlobClient.url;
          if (i === files.length - 1) {
            console.log('success', {
              message: 'File uploaded to Azure Blob storage.',
            });
          }
        } catch (err) {
          console.log('error', { message: err.message });
        }
      }
    }
    console.log(docs, 'Docs');
    let data = await this.rfsRepo.rfsSupportingDocument(fileObj, docs);
    return data;
  }
}
