import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateRFSDto } from 'src/dto/rfs/create-rfs.dto';
import { DeleteRFSService } from 'src/services/rfs/deleteRfs.service';
import { GetRFSService } from 'src/services/rfs/getRfs.service';
import { GetRFSByUserService } from 'src/services/rfs/getRfsByUser.service';
import { PreprNotificationService } from 'src/services/rfs/preprNotifitcation.service';
import { UpdateRFSService } from 'src/services/rfs/updateRfs.service';
import { UploadBoqService } from 'src/services/rfs/upload-boq.service';
import { AppService } from '../app.service';
import { PagingDto, SearchDto } from '../dto/paging.dto';
import { RFSService } from '../services/rfs/rfs.service';
import { v4 as uuidv4 } from 'uuid';
import { PreprBillOfQuantityEntity } from 'src/entities/prepr/prepr-bill-of-quantity.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExportBOQService } from 'src/services/rfs/export-boq.service';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { User } from 'src/decorators/auth/auth-user.decorator';
import { CopyRFSService } from 'src/services/rfs/copyRfs.service';
import { SampleBOQService } from 'src/services/rfs/sample-boq.service';
import { ExportDto, SearchExportDto } from 'src/dto/export.dto';
import { ExportPrePrService } from 'src/services/rfs/export-prepr.service';
import { ExportPrePrCopyService } from 'src/services/rfs/export-prepr-copyservice';
import { UpdateRFS_StatusService } from 'src/services/rfs/updateRfsStatus.service';
import { SubmitType } from 'src/enum/rfs/submitType.enum';
import { ApproveRFSService } from 'src/services/rfs/rfsApprove.service';
import { SubmitDocs } from 'src/dto/rfs/supportDocs.dto';
import { RejectRFSService } from 'src/services/rfs/rfsreject.service';
import { PrePrSummaryPdfService } from 'src/services/rfs/preprSummary.service';
import { RFSRepository } from 'src/repos/rfs.repository';
import { Submit } from 'src/dto/rfs/support.dto copy';
import { MailService } from 'src/services/mail/mailservice.service';
import {
  ApproveRejectRFSDto,
  EscalateRFSDto,
} from 'src/dto/rfs/approveReject.dto';
import { UpdateDocsDto } from 'src/dto/rfs/updateDocs.dto';
import { AutoEscalationRFSService } from 'src/services/rfs/autoEscalation.service';
import { FormValidationPipe } from 'src/pipes/prepr/formValidationPipe';
import Axios from 'axios';
import { Response } from 'express';
@ApiTags('prePr')
@Controller('prePr')
export class PrePrController {
  constructor(
    private readonly rfsService: RFSService,
    private readonly prNotificationService: PreprNotificationService,
    private readonly updateRFSService: UpdateRFSService,
    private readonly getRFSService: GetRFSService,
    private readonly deleteRFSService: DeleteRFSService,
    private readonly getRFSByUserService: GetRFSByUserService,
    private readonly uploadBoqService: UploadBoqService,
    private readonly exportSupplierService: ExportBOQService,
    private readonly copyRfsService: CopyRFSService,
    private readonly sampleboqService: SampleBOQService,
    private readonly exportRfsByIdService: ExportPrePrService,
    private readonly exportRfsCopyService: ExportPrePrCopyService,
    private readonly updateStatusService: UpdateRFS_StatusService,
    private readonly approveService: ApproveRFSService,
    private readonly rejectService: RejectRFSService,
    private readonly preprSummaryService: PrePrSummaryPdfService,
    private readonly getPrePrDiff: RFSRepository,
    private readonly mailService: MailService,
    private readonly escalateService: AutoEscalationRFSService,
  ) {}

  @Get('/test')
  testy() {
    Axios.get(`https://api.microaap.org/mailer/mailerReq`, {})
      .then((data11: any) => {
        console.log('logged', data11);
      })
      .catch((err: any) => {
        console.log('err', err);
      });
  }
  @Post('/create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createRFS(
    @User() user: JwtPayload,
    @Body() createRfsDto: CreateRFSDto,
  ) {
    return this.rfsService.createRFS(user, createRfsDto);
  }

  @Get('/list')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getRFSList(@Query() pagingDto: PagingDto, @Res() res: Response) {
    return this.getRFSService.getRFSList(res, pagingDto);
  }

  @Get('/listByUser')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getRFSListByUser(
    @Query() pagingDto: SearchDto,

    @Res() res: Response,
    @User() user: JwtPayload,
  ) {
    return this.getRFSByUserService.getRFSListByUser2(res, pagingDto, user);
  }

  @Get('/notifications')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getNotificationList() {
    return await this.prNotificationService.getNotificationList();
  }

  @Patch('/updateStatus')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateRFS_StatusById(
    @User() user: JwtPayload,
    @Query('prepr_id') prepr_id: number,
    @Query('submitStatus') submitStatus: SubmitType,
  ) {
    console.log('A');
    return this.updateStatusService.updateRFS_Status(
      prepr_id,
      submitStatus,
      user,
    );
  }

  @Get('status-list')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getStatusList(@Res() res: Response) {
    return this.updateStatusService.statusList(res);
  }

  @ApiParam({
    name: 'id',
    description: 'Gets the Action id',
  })
  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getRFSById(@Param() param: { id: number }) {
    return this.getRFSService.getRFSById(param.id);
  }

  @ApiParam({
    name: 'id',
    description: 'Update the Action id',
  })
  @Patch('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateRFSById(
    @User() user: JwtPayload,
    @Param() param: { id: number },
    @Body(new FormValidationPipe()) createRFSDto: CreateRFSDto,
    @Res() res: Response,
  ) {
    console.log(createRFSDto, 'cre');
    return this.updateRFSService.updateRFS(param.id, user, createRFSDto, res);
  }

  @Post('/copyRFSById')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async copyRFSTemplateListByUser(
    @User() user: JwtPayload,
    @Query('id') id: number,
  ) {
    return await this.copyRfsService.copyRFS(id, user);
  }

  @Post('/pre_pr_summary/:rfsId')
  async preprSummary(@Res() res: Response, @Param('rfsId') rfsId: number) {
    res.json({
      file: await this.getRFSService.pdfSummay(rfsId),
    });
  }

  @ApiParam({
    name: 'id',
    description: 'Gets the Action id',
  })
  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteRFSById(@Param() param: { id: number }) {
    return this.deleteRFSService.deleteRFS(param.id);
  }

  //boq exel upload
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
  @Post('/upload-boq')
  @UseInterceptors(
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
  ) {
    return await this.uploadBoqService.upload(res, file);
  }

  @ApiQuery({
    name: 'purchaseOrg',
    required: true,
  })
  @Post('/export-boq')
  async downloadBoq(
    @Res() res: Response,
    @Body() boqObject: PreprBillOfQuantityEntity,
    @Query() purchaseOrgValue: { purchaseOrg: String },
  ) {
    console.log(purchaseOrgValue.purchaseOrg, 'value');
    return await this.exportSupplierService.exportSupplier(
      res,
      boqObject,
      purchaseOrgValue.purchaseOrg,
    );
  }

  //download sample boq
  @Post('/sample-boq')
  async sampleboq(@Res() res: Response) {
    return await this.sampleboqService.sampleBOQ(res);
  }

  @Post('/export-prepr-by-id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async exportRFSList(
    @Res() res: Response,
    @User() user: JwtPayload,
    @Query() exportDto: SearchExportDto,
  ) {
    return await this.exportRfsByIdService.exportPrepr(res, exportDto, user);
  }
  @Post('/export-prepr-copy')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async exportRFSListCopy(
    @Res() res: Response,
    @User() user: JwtPayload,
    @Query() exportDto: ExportDto,
  ) {
    return await this.exportRfsCopyService.exportPreprCopy(res, exportDto);
  }

  @Post('/prepr-copyList')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async RFSListCopy(
    @Query() pagingDto: PagingDto,
    @Res() res: Response,
    @User() user: JwtPayload,
  ) {
    return await this.copyRfsService.getCopyRfsList(res, pagingDto);
  }

  //updating supporting docs
  @Patch('/supportingdocs/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateDocs(
    @Res() res: Response,
    @Param() param: { id: number },
    @User() user: JwtPayload,
    @Body() docs: UpdateDocsDto,
  ) {
    return await this.rfsService.updateSupportingDocs(res, param.id, docs);
  }

  @Post('/approve-prepr')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async approvePrepr(
    @User() user: JwtPayload,
    @Body() prepr: ApproveRejectRFSDto,
    @Res() res: Response,
  ) {
    return await this.approveService.approveRFS(res, user, prepr);
  }

  @Post('/reject-prepr')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async rejectPrepr(
    @User() user: JwtPayload,
    @Body() prepr: ApproveRejectRFSDto,
    @Res() res: Response,
  ) {
    return await this.rejectService.rejectRfs(res, user, prepr);
  }

  @Post('/escalate-prepr')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async escalatePrepr(
    @User() user: JwtPayload,
    @Body() prepr: EscalateRFSDto,
    @Res() res: Response,
  ) {
    return await this.escalateService.escalateRfs(res, user, prepr);
  }

  @Post('/deleteSupportingDocs')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async sumbitPrepr(
    @User() user: JwtPayload,
    @Body() docs: SubmitDocs,
    @Res() res: Response,
  ) {
    return await this.rfsService.deleteSupportingDocs(res, docs);
  }

  // @Post('/test')
  // async getDiff(
  //   @Body() prepId: Submit,
  // ) {
  //   return await this.getPrePrDiff.getPrePrDiff(
  //     prepId.preprId,
  //     prepId.createRFSDto,
  //   );
  // }

  @Post('/testMail')
  async getTestMail(@Body() prepId: Submit) {
    await this.mailService.sendMailApprovalReminder(
      'gurnain.s@simbiotiktech.com',
      'Greeting from NestJS NodeMailer',
      'Ajay',
      138,
      'I001',
      'My Title',
    );
  }
}
