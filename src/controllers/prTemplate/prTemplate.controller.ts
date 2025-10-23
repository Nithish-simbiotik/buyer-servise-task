import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Res,
  UnprocessableEntityException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PagingDto } from 'src/dto/paging.dto';
import { CreatePrTemplateDto } from 'src/dto/prTemplate/createPrTemplate.dto';
import { AddPRTemplateService } from 'src/services/prTemplate/addPrTemplate/createPrTemplate.service';
import { GetPrTemplateService } from 'src/services/prTemplate/getPrTemplate/getPrTemplate.service';
import { ExportPrTemplateService } from 'src/services/prTemplate/exportPrTemplate/exportPrTemplate.service';
import { Response } from 'express';
import { UpdatePrTemplateService } from 'src/services/prTemplate/updatePrTemplate/updatePrTemplate.service';
import { ExportDto } from 'src/dto/export.dto';
import { User } from 'src/decorators/auth/auth-user.decorator';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { v4 as uuidv4 } from 'uuid';
import { Environment } from 'src/env/environment';
import { AzureStorageFileInterceptor } from '@nestjs/azure-storage';
import { ImportPrTemplateService } from 'src/services/prTemplate/importPrTemplate/importPrTemplate.service';
import { SampleExportPrTemplateService } from 'src/services/prTemplate/samplePrTemplate/sampleExportPrTemplate.service';
import { SingleFileUploaderDto } from 'src/dto/documents/documents.dto';
import { GeneralFile } from 'src/interface/common/pr-Attachment.interface';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('PrTemplate')
@Controller('prTemplate')
export class PrTemplateController {
  constructor(
    private addPRTemplateService: AddPRTemplateService,
    private getPrTemplateService: GetPrTemplateService,
    private exportSamplePrTemplate: SampleExportPrTemplateService,
    private updatePrTemplateService: UpdatePrTemplateService,
    private exportPrTemplateService: ExportPrTemplateService,
    // private importPrTemplateService: ImportPrTemplateService,
    private importPrTemplateServ: ImportPrTemplateService,
  ) {}

  /**========================================================================
   *                           Create PR Template
   *========================================================================**/
  @Post('add')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async addPrTemplate(
    @Body() dto: CreatePrTemplateDto,
    @User() user: JwtPayload,
  ) {
    return await this.addPRTemplateService.createPrTemplate(user, dto);
  }

  /**========================================================================
   *                            Get PR Template By ID
   *========================================================================**/
  @Get('get-by-id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getRfxTemplate(@Query('id') id: string) {
    return await this.getPrTemplateService.getPrTemplateById(+id);
  }

  /**========================================================================
   *                           Update PR Template
   *========================================================================**/
  @Patch('update')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateRfxTemplate(
    @Body() dto: CreatePrTemplateDto,
    @User() user: JwtPayload,
  ) {
    dto.updatedById = user.userId;
    dto.createdById = user.userId;
    if (dto.deliveryAddressId == null) {
      dto.deliveryAddressId = 0;
    } else {
      dto.deliveryAddressId = dto.deliveryAddressId;
    }

    if (dto.customDeliveryAddress == null) {
      dto.customDeliveryAddress = '';
    } else {
      dto.customDeliveryAddress = dto.customDeliveryAddress;
    }
    return await this.updatePrTemplateService.updatePrTemplate(dto);
  }

  /**========================================================================
   *                           Get PR Template List / Filter
   *========================================================================**/
  @Get('list')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getRFSList(@Query() pagingDto: PagingDto, @Res() res: Response) {
    return await this.getPrTemplateService.listPrTemplate(res, pagingDto);
  }

  /**========================================================================
   *                           Export PR Template Excel
   *========================================================================**/
  @Get('export-sample-pr-template')
  async exportSamplePrTemplateData(@Res() res: Response) {
    return await this.exportSamplePrTemplate.samplePr(res);
  }

  //export PR-template api
  @Post('export-pr-template-list')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async exportRfxTemplateList(
    @Res() res: Response,
    @Query() exportDto: ExportDto,
  ) {
    return await this.exportPrTemplateService.exportPRTemplate(res, exportDto);
  }

  /**========================================================================
   *                           Download PR Template Excel
   *========================================================================**/
  @Post('/download-sourcing-template-format')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async downloadPrTemplate(@Res() res: Response) {
    return await this.exportPrTemplateService.downloadPrTemplate(res);
  }

  /**========================================================================
   *                           Import PR Template
   *========================================================================**/

  @ApiOperation({ summary: ' API for single file import in pr template' })
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  // @ApiBody({ type: SingleFileUploaderDto })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/import-pr-template')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    //   AzureStorageFileInterceptor('file', {
    //     limits: {
    //       fileSize: 1024 * 1024 * 1000,
    //     },
    //     fileFilter(req, file, cb) {
    //       file.filename = file.originalname;
    //       const i = file.originalname.lastIndexOf('.');
    //       const fileExt = i < 0 ? '' : file.originalname.substr(i);
    //       file.originalname = uuidv4() + fileExt;
    //       file.path = `${Environment.storagePath}/${file.originalname}`;
    //       file['createdDate'] = new Date();
    //       cb(null, true);
    //     },
    //   }),
    // )
    // async azureSingleFileUploader(
    //   @UploadedFile() file: GeneralFile,
    //   // @User() user: JwtPayload,
    // ) {
    //   if (file) {
    //     return {
    //       fieldname: file.fieldname,
    //       originalname: file.originalname,
    //       filename: file.filename,
    //       path: file.path,
    //       size: file.size,
    //       createdDate: file.createdDate,
    //     };
    //   } else {
    //     throw new UnprocessableEntityException(`Failed to upload file`);
    //   }
    // }

    //  //new
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    // @ApiConsumes('multipart/form-data')
    // @ApiBody({
    //   schema: {
    //     type: 'object',
    //     properties: {
    //       file: {
    //         type: 'string',
    //         format: 'binary',
    //       },
    //     },
    //   },
    // })
    // @Post('/import-prepr-template')
    // @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        let i = file.originalname.lastIndexOf('.');
        let fileExt = i < 0 ? '' : file.originalname.substr(i);
        file.filename = uuidv4() + fileExt;
        file.originalname = file.filename;
        if (file) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      },
    }),
  )
  async upload(
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
    @User() user: JwtPayload,
  ) {
    await this.importPrTemplateServ.upload(res, file, user);
  }
}
