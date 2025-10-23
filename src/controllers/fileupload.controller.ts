import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
// import { AppService } from './app.service';
import { SampleDto } from '../dto/file.dto';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Environment } from '../env/environment';
import { FileUpload } from 'src/services/fileupload/fileupload.service';
import { ExcelService } from 'src/services/fileupload/excelupload.service';
import { arrayBuffer } from 'stream/consumers';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(
    private readonly uploadservice: FileUpload,
    private readonly excelService: ExcelService,
  ) {}

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
  // @UseInterceptors(FileInterceptor('files',{}))
  @Post('supporting-docs')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log(body, 'body');
    // console.log(body.data[0].name,"name")
    const data = JSON.parse(body.data);
    console.log(data, 'data');
    const docs = await this.uploadservice.uploadFiles(files, data);
    return {
      docs: docs,
    };
  }

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
  @Post('/upload-excel')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Body() filePath, @UploadedFile() file: Express.Multer.File) {
    const data = await this.excelService.upload(file);
    return data;
  }

  @Get('/export-excel')
  // @UseInterceptors(FileInterceptor("file"))
  async exportExcel() {
    // @UploadedFile() file: Express.Multer.File // @Res() res: Response,
    const users = [
      {
        id: 1,
        templateName: 'First N',
        purchasingOrg: 'string',
        purchasingOrg_readonly: false,
        purchasingOrg_visible: false,
        department: 'string',
        department_readonly: false,
        department_visible: false,
        urgent_job_readonly: false,
        urgent_job_visible: false,
        urgentJob_option: '',
        status: false,
        baseCurrency: 'string',
        baseCurrency_readonly: false,
        baseCurrency_visible: false,
        costCenter: 'string',
        costCenter_readonly: false,
        costCenter_visible: false,
        reminderAlert: true,
        reminderInterval: 1,
        reminderFrequency: 1,
        notifyMe: true,
        addApprovalRouting: false,
        approvalRouting_readonly: false,
        approvalRouting_visible: false,
        teamMembers: [
          {
            id: 2,
            userId: 0,
            userName: 'Sarthak',
            name: 'string',
            emailAddress: 'string',
            userRole: 'string',
            viewStatus: 'viewer',
          },
          {
            id: 1,
            userId: 0,
            userName: 'Jack',
            name: 'string',
            emailAddress: 'string',
            userRole: 'string',
            viewStatus: 'viewer',
          },
        ],
        levels: [
          {
            id: 2,
            level: 0,
            userRole: 'string',
            departmentId: null,
          },
        ],
        approvalRouting_optional: false,
      },
    ];
    const filtered = users.map((obj) => {
      // get totals to add them later to keep column order (or use `header` param for columns order)
      const { teamMembers, levels, approvalRouting_optional, ...rest } = obj;

      // flatten..
      teamMembers.map((el) => {
        rest[el['userName']] = el.userName;
      });

      return { ...rest, levels, approvalRouting_optional };
    });
    const workSheetName = 'Users';
    const filePath = './outputFiles/excel-from-js.xlsx';
    const data = await this.excelService.exportExcel(
      filtered,
      workSheetName,
      filePath,
    );
    return data;   
  }
}
