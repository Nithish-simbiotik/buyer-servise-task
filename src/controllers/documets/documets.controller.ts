import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UnprocessableEntityException,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PagingDto } from 'src/dto/paging.dto';
import { Response } from 'express';
import { RfxTempModuleStatus } from 'src/enum/rfx/rfx.enum';
import { Environment } from 'src/env/environment';
import { v4 as uuidv4 } from 'uuid';
import {
  Attachment,
  GeneralFile,
  GeneralFileDto,
} from 'src/interface/common/rfx-attachment.interface';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { User } from 'src/decorators/auth/auth-user.decorator';
import { AzureStorageAnyFileInterceptor } from 'src/storage/azure-storage-AnyfileInterceptor';
import {
  DocUpdateDto,
  MultipleFileUploaderDto,
  SingleFileUploaderDto,
  SupportingDocCreationDto,
  UpdatedDto,
} from 'src/dto/documents/documents.dto';
import { DocumentUploadService } from 'src/services/documentUpload/document-upload.service';
import { AzureStorageFileInterceptor } from '@nestjs/azure-storage';
import { AzureStorageFilesInterceptor } from 'src/storage/azure-storage-MultipleFileInterceptor';
import { ProcStorageService } from 'src/services/azure-storage-service/storage-service';

@ApiTags('documents')
@Controller('documents')
export class DocumetsController {
  constructor(
    private readonly docUploadservice: DocumentUploadService,
    private readonly procStorageService: ProcStorageService,
  ) {}

  @ApiOperation({ summary: ' API for Uploading files' })
  // @ApiOperation({ summary: ' API for Uploading files' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiBody({ type: SupportingDocCreationDto })
  @Post('/supporting-docs')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    AzureStorageFileInterceptor('uploadFile', {
      limits: {
        fileSize: 1024 * 1024 * 1000,
      },
      fileFilter(req, file, cb) {
        file.filename = file.originalname;
        const i = file.originalname.lastIndexOf('.');
        const fileExt = i < 0 ? '' : file.originalname.substr(i);
        file.originalname = uuidv4() + fileExt;
        file.path = `${Environment.storagePath}/${file.originalname}`;
        cb(null, true);
      },
    }),
  )
  async uploaddocument(
    @UploadedFile() file: Attachment,
    @Body() requestBody: SupportingDocCreationDto,
    @User() user: JwtPayload,
  ) {
    console.log('files', file);
    if (file) {
      requestBody.path = file.path;
      requestBody.filename = file.filename;
      requestBody.originalname = file.originalname;
    }
    return await this.docUploadservice.uploadFiledocuments(requestBody, user);
  }

  @ApiOperation({ summary: ' API for to get all the supporting documents' })
  @Get('supporting-doc-list')
  async getupportingDocList(
    @Query() pagingDto: PagingDto,
    @Res() res: Response,
  ) {
    return await this.docUploadservice.listSupportingDoc(res, pagingDto);
  }
  @ApiQuery({
    name: 'module',
    enum: RfxTempModuleStatus,
  })
  @ApiOperation({ summary: ' API to get the document list with Active Status' })
  @Get('suppliers-terms-cond-list')
  async getRfxTermsCondSupplierList(
    @Query('module') module: RfxTempModuleStatus,
  ) {
    return await this.docUploadservice.listRfxTermsCondSupplier(module);
  }
  
  @ApiOperation({ summary: ' API to update the supporting documents' })
  @Patch('/supportingdocs/:id')
  @ApiBearerAuth()
  @ApiBody({ type: DocUpdateDto })
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    AzureStorageFileInterceptor('uploadFile', {
      limits: {
        fileSize: 1024 * 1024 * 1000,
      },
      fileFilter(req, file, cb) {
        file.filename = file.originalname;
        const i = file.originalname.lastIndexOf('.');
        const fileExt = i < 0 ? '' : file.originalname.substr(i);
        file.originalname = uuidv4() + fileExt;
        file.path = `${Environment.storagePath}/${file.originalname}`;
        cb(null, true);
      },
    }),
  )
  async updateDocs(
    @Res() res: Response,
    @Param() param: { id: number },
    @User() user: JwtPayload,
    @Body() docs: DocUpdateDto,
    @UploadedFile() file: Attachment,
  ) {
    console.log('file', file);

    if (file) {
      docs.path = file.path;
      docs.filename = file.filename;
      docs.originalname = file.originalname;
    }
    return await this.docUploadservice.updateSupportingDoc(res, param.id, docs);
  }
  //#############################################

  @ApiOperation({ summary: ' API for single file Uploader' })
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  @ApiBody({ type: SingleFileUploaderDto })
  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    AzureStorageFileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 1000,
      },
      fileFilter(req, file, cb) {
        file.filename = file.originalname;
        const i = file.originalname.lastIndexOf('.');
        const fileExt = i < 0 ? '' : file.originalname.substr(i);
        file.originalname = uuidv4() + fileExt;
        file.path = `${Environment.storagePath}/${file.originalname}`;
        file['createdDate'] = new Date();
        cb(null, true);
      },
    }),
  )
  async azureSingleFileUploader(
    @UploadedFile() file: GeneralFile,
    // @User() user: JwtPayload,
  ) {
    if (file) {
      return {
        fieldname: file.fieldname,
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
        size: file.size,
        createdDate: file.createdDate,
      };
    } else {
      throw new UnprocessableEntityException(`Failed to upload file`);
    }
  }
  @Post('file/delete')
  async deleteAzureFiles(@Body() files: GeneralFileDto[]) {
    return this.procStorageService.delete(files);
  }
  @Post('file/download')
  async downLoadAzureFiles(@Body() file: GeneralFileDto) {
    return this.procStorageService.getfileStream(file.originalname);
  }
}
