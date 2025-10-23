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
} from '@nestjs/swagger';
import { User } from 'src/decorators/auth/auth-user.decorator';
import { CreateRFSDto } from 'src/dto/rfs/create-rfs.dto';
import { CreateRFSTemplateDto } from 'src/dto/rfsTemplate/create-rfsTemplate.dto';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { UserRolesService } from 'src/services/flat/userRoles.service';
import { CopyRFSTemplateService } from 'src/services/rfsTemplate/copyRfsTemplate.service';
import { CreateRFSTemplateService } from 'src/services/rfsTemplate/createRfsTemplate.service';
import { DeleteRFSTemplateService } from 'src/services/rfsTemplate/deleteRfsTemplate.service';
import { ExportPrePrTemplateService } from 'src/services/rfsTemplate/export-preprTemplate.service';
import { GetRFSTemplateService } from 'src/services/rfsTemplate/getRfsTemplate.service';
import { GetRFSByUserTemplateService } from 'src/services/rfsTemplate/getRfsTemplateBuUser.service';
import { UpdateRFSTemplateService } from 'src/services/rfsTemplate/updateRfsTemplate.service';
import { AppService } from '../app.service';
import { PagingDto } from '../dto/paging.dto';
import { RFSService } from '../services/rfs/rfs.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { ImportPreprTemplateService } from 'src/services/rfsTemplate/import-preprTemplateService';
import { ExportDto } from 'src/dto/export.dto';
import { MailService } from 'src/services/mail/mailservice.service';

@ApiTags('preprTemplate')
@Controller('preprTemplate')
export class PreprTemplateController {
  constructor(
    private readonly rfsTemplateService: CreateRFSTemplateService,
    private readonly getRfsTemplateService: GetRFSTemplateService,
    private readonly updateRfsTemplateService: UpdateRFSTemplateService,
    private readonly deleteRfsTemplateService: DeleteRFSTemplateService,
    private readonly getRfsByUserTemplateService: GetRFSByUserTemplateService,
    private readonly copyRfsTemplateService: CopyRFSTemplateService,
    private readonly exportRfsTemplateByIdService: ExportPrePrTemplateService,
    private readonly importRfsTemplateByIdService: ImportPreprTemplateService,
    private readonly mailService: MailService,
  ) {}

  @Post('/create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createRFS(
    @User() user: JwtPayload,
    @Body() createRFSTemplateDto: CreateRFSTemplateDto,
  ) {
    return await this.rfsTemplateService.createRFSTemplate(
      user,
      createRFSTemplateDto,
    );
  }

  // @Get('/sendMail')
  // //@ApiBearerAuth()
  // //@UseGuards(AuthGuard('jwt'))
  // async sendMail(
  //   //@User() user: JwtPayload,

  // ) {
  //   return await this.mailService.sendMail();
  // }

  @Get('/list')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getRFSTemplateList(
    @User() user: JwtPayload,
    @Query() pagingDto: PagingDto,
    @Res() res: Response,
  ) {
    return await this.getRfsTemplateService.getRFSTemplateList(res, pagingDto);
  }

  @Get('/user-preprTemplatelist')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getUserRFSTemplateList(@User() user: JwtPayload) {
    return await this.getRfsByUserTemplateService.getPreprTemplateByUserId(
      user.userId,
    );
  }

  @Get('/listByUser')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getRFSTemplateListByUser(
    @User() user: JwtPayload,
    @Query() pagingDto: PagingDto,
    @Res() res: Response,
  ) {
    return await this.getRfsByUserTemplateService.getRFSTemplateListByUser(
      res,
      pagingDto,
    );
  }

  @Post('/export-prepr-template-by-id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async exportRFSTemplateListById(
    @Res() res: Response,
    @User() user: JwtPayload,
    @Query() exportDto: ExportDto,
  ) {
    return await this.exportRfsTemplateByIdService.exportPreprTemplate(
      res,
      exportDto,
    );
  }

  @Post('/export-prepr-template-format')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async exportRFSTemplateFormat(
    @Res() res: Response,
    @User() user: JwtPayload,
  ) {
    return await this.exportRfsTemplateByIdService.exportPreprTemplateFormat(
      res,
    );
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
  @Post('/import-prepr-template')
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
    @User() user: JwtPayload,
  ) {
    await this.importRfsTemplateByIdService.upload(res, file, user);
  }

  @Post('/copyTemplateById')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async copyRFSTemplateListByUser(
    @User() user: JwtPayload,
    @Query('id') id: number,
  ) {
    return await this.copyRfsTemplateService.copyRFSTemplate(id, user);
  }

  @ApiParam({
    name: 'id',
    description: 'Gets the Action id',
  })
  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getRFSTemplateById(
    @User() user: JwtPayload,
    @Param() param: { id: number },
  ) {
    return await this.getRfsTemplateService.getRFSTemplateById(param.id);
  }

  @ApiParam({
    name: 'id',
    description: 'Gets the Action id',
  })
  @Patch('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateRFSTemplateById(
    @User() user: JwtPayload,
    @Param() param: { id: number },
    @Body() createRFSTemplateDto: CreateRFSTemplateDto,
  ) {
    // console.log(createRFSTemplateDto);
    return await this.updateRfsTemplateService.updateRFSTemplate(
      param.id,
      user,
      createRFSTemplateDto,
    );
  }

  @ApiParam({
    name: 'id',
    description: 'Gets the Action id',
  })
  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteRFSTemplateById(
    @User() user: JwtPayload,
    @Param() param: { id: number },
  ) {
    return await this.deleteRfsTemplateService.deleteRFSTemplate(param.id);
  }
}
