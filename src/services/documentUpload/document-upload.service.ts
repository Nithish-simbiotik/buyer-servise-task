import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RFSRepository } from 'src/repos/rfs.repository';
import {
  BlobClient,
  BlobServiceClient,
  BlockBlobClient,
  newPipeline,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { Environment } from 'src/env/environment';
import { RfxTemplateRepository } from 'src/repos/rfx.template.repository';
import { PagingDto } from 'src/dto/paging.dto';
import { Response } from 'express';
import { RfxTempModuleStatus } from 'src/enum/rfx/rfx.enum';
import { getRepository, ILike, Like } from 'typeorm';
import { Attachment } from 'src/interface/common/rfx-attachment.interface';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import {
  DocUpdateDto,
  SupportingDocCreationDto,
  UpdatedDto,
} from 'src/dto/documents/documents.dto';
import { SupportingDocumentEntity } from 'src/entities/documents/supporting-documents.entity';
import { DocumentsRepository } from 'src/repos/rfx-repos/documents/documents.repository';
import { PreprSupportingDocumentEntity } from 'src/entities/prepr/prepr-supporting-documents.entity';
@Injectable()
export class DocumentUploadService {
  constructor(
    @InjectRepository(DocumentsRepository)
    private documentRepo: DocumentsRepository,
  ) {}

  async uploadFiledocuments(
    documents: SupportingDocCreationDto,
    user: JwtPayload,
  ) {
    console.log('documents', documents);

    let category = this.documentRepo.create(documents);
    let data = await this.documentRepo.save(category);
    console.log('data', data);
    return data;
  }

  // async uploadFiledocuments1(
  //   documents: SupportingDocCreationDto,
  //   user: JwtPayload,
  // ): Promise<SupportingDocumentEntity> {
  //   const fileupload = this.documentRepo.create({
  //     documentName: documents.documentName,
  //     status: documents.status,
  //     module: documents.module,
  //     originalname: documents.originalname,
  //     filename: documents.filename,
  //     path: documents.path,
  //     createdById: user.userId,
  //     modifiedById: user.userId,
  //   });
  //   return await this.documentRepo.save(fileupload);
  // }

  async listSupportingDoc(res: Response, pagingDto: PagingDto) {
    const keyword: string = pagingDto.keyword || '';
    let qb = this.documentRepo
      .createQueryBuilder('doc')
      .orderBy('doc.createdAt', 'DESC')
      .leftJoinAndSelect('doc.createdBy', 'creator')
      .leftJoinAndSelect('doc.updatedBy', 'updator')
      .where('doc.documentName ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('creator.name ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('updator.name ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('doc.module ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('doc.status ILIKE :q', {
        q: `%${keyword}%`,
      });
    const page: number = pagingDto.page || 1;
    const limit: number = pagingDto.size || 10;
    const total = await qb.getCount();
    qb.offset((page - 1) * limit).limit(limit);
    return res.send({
      data: await qb.getMany(),
      total,
      page,
    });
  }

  // async listSupportingDoc1(res: Response, pagingDto: PagingDto) {
  //   const keyword: string = pagingDto.keyword || '';
  //   const data = this.documentRepo
  //     .createQueryBuilder('doc')
  //     .leftJoinAndSelect('doc', 'creator')
  //     .leftJoinAndSelect('doc', 'updator')
  //     .orderBy('doc.createdAt', 'DESC');

  //   data
  //     .where('doc.documentName ILIKE :q', {
  //       q: `%${keyword}%`,
  //     })
  //     .orWhere('doc.module ILIKE :q', {
  //       q: `%${keyword}%`,
  //     })

  //     .orWhere('creator.name ILIKE :q', {
  //       q: `%${keyword}%`,
  //     })
  //     .orWhere('updator.name ILIKE :q', {
  //       q: `%${keyword}%`,
  //     })
  //     // .orWhere('doc.createdBy ILIKE :q', {
  //     //   q: `%${keyword}%`,
  //     // })
  //     // .orWhere('doc.modifiedBy ILIKE :q', {
  //     //   q: `%${keyword}%`,
  //     // })

  //     .orWhere('doc.status ILIKE :q', {
  //       q: `%${keyword}%`,
  //     });
  //   const page: number = pagingDto.page || 1;
  //   const limit: number = pagingDto.size || 10;
  //   const total = await data.getCount();
  //   data.offset((page - 1) * limit).limit(limit);
  //   console.log('data', data);

  //   return res.send({
  //     data: await data.getMany(),
  //     total,
  //     page,
  //   });
  // }

  async listRfxTermsCondSupplier(module: RfxTempModuleStatus) {
    console.log('api call');

    let data = await this.documentRepo
      .createQueryBuilder('doc')
      .where('doc.module=:module', { module: module })
      .andWhere('status=:status', { status: 'Active' })
      .select(['doc.id', 'doc.status', 'doc.documentName', 'doc.module'])
      .getMany();
    return data;
  }

  async updateSupportingDoc(res: Response, id: number, docs: DocUpdateDto) {
    docs.id = Number(docs.id);
    let updatedDoc = this.documentRepo.create(docs);
    let data = await updatedDoc.save();

    return res.send(data);
  }
}
