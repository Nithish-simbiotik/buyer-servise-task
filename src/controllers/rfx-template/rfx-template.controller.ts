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
import { PagingDto, RfxTemplateDropDown } from 'src/dto/paging.dto';
import { CreateRfxTemplateDto } from 'src/dto/rfx-template/create.rfx.template.dto';
import { AddRfxTemplateService } from 'src/services/rfx/manage-rfx-template/add-rfx-template/add-rfx-template.service';
import { GetRfxTemplateService } from 'src/services/rfx/manage-rfx-template/get-rfx-template/get-rfx-template.service';
import { ExportSampleRfxTemplateService } from 'src/services/rfx/manage-rfx-template/sample-rfx-template/sample-export-rfx-template.service';
import { ExportRfxTemplateListService } from 'src/services/rfx/manage-rfx-template/export-rfx-template.service/export-rfx-template.service';
import { Response } from 'express';
import { RfxTemplateEntity } from 'src/entities/rfx/rfx-template/rfx-template.entity';
import { UpdateRfxTemplateService } from 'src/services/rfx/manage-rfx-template/update-rfx-template/update-rfx-template.service';
import { ExportDto } from 'src/dto/export.dto';
import { ManageRfxTemplateEnvelopeService } from 'src/services/rfx/manage-rfx-template/manage-rfx-template-envelope/manage-rfx-template-envelope.service';
import { User } from 'src/decorators/auth/auth-user.decorator';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { Environment } from 'src/env/environment';
import { AzureStorageFileInterceptor } from '@nestjs/azure-storage';
import { ImportRfxTemplateService } from 'src/services/rfx/manage-rfx-template/import-rfx-template/import-rfx-template.service';
import { SingleFileUploaderDto } from 'src/dto/documents/documents.dto';
import { GeneralFile } from 'src/interface/common/rfx-attachment.interface';

@ApiTags('rfxTemplate')
@Controller('rfx-template')
export class RfxTemplateController {
  constructor(
    private addRfxTemplateService: AddRfxTemplateService,
    private getRfxTemplateService: GetRfxTemplateService,
    private exportSampleRfxTemplateService: ExportSampleRfxTemplateService,
    private exportRfxTemplateListService: ExportRfxTemplateListService,
    private updateRfxTemplateService: UpdateRfxTemplateService,
    private getEnvelopListService: ManageRfxTemplateEnvelopeService,
    private importRfxTemplateService: ImportRfxTemplateService,
  ) {}

  @Post('add')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async addRfxTemplate(
    @Body() dto: CreateRfxTemplateDto,
    @User() user: JwtPayload,
  ) {
    return await this.addRfxTemplateService.createatRfxTemplate(user, dto);
  }

  @Get('get-by-id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getRfxTemplate(@Query('id') id: string) {
    return await this.getRfxTemplateService.getRfxTemplateById(+id);
  }

  @Patch('update')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateRfxTemplate(
    @Body() dto: CreateRfxTemplateDto,
    @User() user: JwtPayload,
  ) {
    console.log('user', user);
    console.log(dto, 'User DTo');

    dto.updatedById = user.userId;
    return await this.updateRfxTemplateService.updateRfxTemplate(dto);
  }

  @Get('list')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getRFSList(@Query() pagingDto: PagingDto, @Res() res: Response) {
    return this.getRfxTemplateService.listRfxTemplates(res, pagingDto);
  }

  @Get('export-sample-rfx-template')
  async exportSampleRfxTemplate(@Res() res: Response) {
    return await this.exportSampleRfxTemplateService.sampleRfx(res);
  }
  //export rfx-template api
  @Post('export-rfx-template-list')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async exportRfxTemplateList(
    @Res() res: Response,
    @Query() exportDto: ExportDto,
  ) {
    return await this.exportRfxTemplateListService.exportRfx(res, exportDto);
  }
  //download rfx-template api
  @Post('/download-sourcing-template-format')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async downloadRfxTemplateFormat(@Res() res: Response) {
    return await this.exportRfxTemplateListService.downloadRfxTemplateFormat(
      res,
    );
  }

  //import rfx-template api

  @ApiOperation({ summary: ' API for single file import in rfx template' })
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  @ApiBody({ type: SingleFileUploaderDto })
  @Post('/importrfxtemplate')
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
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
  // @Post('/import-sourcing-template')
  // @UseInterceptors(
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
  // async upload(
  //   @Res() res: Response,
  //   @UploadedFile() file: Express.Multer.File,
  //   @User() user: JwtPayload,
  // ) {
  //   await this.importRfxTemplateService.upload(res, file, user);
  // }
  @Get('envelop-list')
  async getEnvelopList() {
    return await this.getEnvelopListService.getEnvelopes();
  }
  @Get('dropdown')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getRfxTemplateForRfxFormDropdown(
    @User() user: JwtPayload,
    @Query() eventType: RfxTemplateDropDown,
  ) {
    return await this.getRfxTemplateService.getRfxTemplateListDropDown(
      user,
      eventType,
    );
  }
}
