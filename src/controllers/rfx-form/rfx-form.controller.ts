import {
  Body,
  Controller,
  Get,
  NotAcceptableException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/auth/auth-user.decorator';
import { RfxListFilterDto, RfxSearchFilter } from 'src/dto/paging.dto';
import {
  CreateRfxFormDto,
  RfxFormApprovalDto,
  UpdateRfxDto,
} from 'src/dto/rfx-form/create-rfx-form.dto';
import { RfxApprovalLevelUpdateDto } from 'src/dto/rfx-form/rfx-approval-level-update.dto';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { AddRfxFormService } from 'src/services/rfx/manage-rfx-form/add-rfx-form/add-rfx-form.service';
import { GetRfxFormService } from 'src/services/rfx/manage-rfx-form/get-rfx-form/get-rfx-form.service';
import { RfxApprovalLevelHistoryService } from 'src/services/rfx/manage-rfx-form/manage-rfx-approval/rfx-approval-level-history/rfx-approval-level-history.service';
import { RfxApprovalService } from 'src/services/rfx/manage-rfx-form/manage-rfx-approval/rfx-approval/rfx-approval.service';
import { ManageSupplierService } from 'src/services/rfx/manage-rfx-form/manage-supplier/manage-supplier.service';
import { UpdateRfxFormService } from 'src/services/rfx/manage-rfx-form/update-rfx-form/update-rfx-form.service';

@ApiTags('rfx-form')
@Controller('rfx-form')
export class RfxFormController {
  constructor(
    private readonly rfxService: AddRfxFormService,
    private readonly rfxUpdateService: UpdateRfxFormService,
    private readonly querService: GetRfxFormService,
    private rfxApprovalService: RfxApprovalService,
    private rfxApprovalHistoryService: RfxApprovalLevelHistoryService,
    private rfxApprovalRouteService: RfxApprovalService,
    private manageSupplierService: ManageSupplierService,
  ) { }
  @ApiOperation({ summary: 'Api for create rfx from ppr list' })
  @Post('create')
  async addRfx(
    @Body() dto: CreateRfxFormDto,
    // @User() user: JwtPayload
  ) {
    console.log('#########Sudanshu Request Body##########');
    console.log(dto);
    console.log('#########The End  ##########');

    return await this.rfxService.createatRfx(dto);
  }
  @ApiOperation({ summary: 'Api for filter rfx list' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/rfx/list/search')
  async rfxFilter(
    @Query() pagingDto: RfxSearchFilter,
    @User() user: JwtPayload,
  ) {
    return await this.querService.rfxSearch(user.userId, pagingDto, pagingDto);
  }

  @ApiOperation({ summary: 'Api for update rfx ' })
  @Put('update')
  async updateRfx(
    // @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRfxDto,
    // @User() user: JwtPayload
  ) {
    return await this.rfxUpdateService.updateRfx(dto);
  }
  @ApiOperation({ summary: 'Api for get rfx list' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  async getRfxList(
    @User() user: JwtPayload,
    // @Param('id', ParseIntPipe) id: number,
    @Query() pagingDto: RfxListFilterDto,
  ) {
    // console.log('user', user);

    return await this.querService.getRfxList(user.userId, pagingDto);
  }
  @ApiOperation({ summary: 'Api for get rfx form data  can use for summary ' })
  @Get('rfx/:id')
  async getRfxById(
    @Param('id', ParseIntPipe) id: number,
    // @User() user: JwtPayload
  ) {
    return await this.querService.getRfxDetailsById(id);
    // return await this.querService.getRfxById(id);
  }
  @ApiOperation({ summary: 'Api for pre fill rfx form data' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Get('rfx/data/:templateId/:pprId')
  async getPrefillData(
    @Param('templateId', ParseIntPipe) templateId: number,
    @Param('pprId', ParseIntPipe) pprId: number,
    // @User() user: JwtPayload
  ) {
    return await this.querService.getPrefilledRfxFormData(templateId, pprId);
  }
  @ApiOperation({ summary: `Highly inflamable....  Please don't touch this` })
  @Get('droptables/:password')
  async dropTables(@Param('password') pwd: string) {
    if (pwd != 'fire_p2p') {
      throw new NotAcceptableException('Lol🤪....😡😡😡😡😡');
    }
    return await this.rfxService.rfxFormDown();
  }

  // approval code here------------------------------------------------------

  @ApiOperation({ summary: 'Api for submitting an rfx future approvals' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('submit-for-approval')
  async rfxSubmitForApproval(
    @Query('rfxId') rfxId: number,
    @User() user: JwtPayload,
  ) {
    return await this.rfxUpdateService.submitRfxForApproval(rfxId, user);
  }

  @ApiOperation({ summary: 'Api for updating rfx approval status' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('approval/change-status')
  async rfxApprovalStatusUpdate(
    @Body() dto: RfxApprovalLevelUpdateDto,
    @User() user: JwtPayload,
  ) {
    return await this.rfxApprovalService.updateOneLevel(user, dto);
  }

  @ApiOperation({ summary: 'Api for updating an rfx approval route' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('approval/update-route')
  async rfxApprovalRouteUpdate(
    @Body() dto: RfxFormApprovalDto,
    @User() user: JwtPayload,
  ) {
    return await this.rfxApprovalService.updateAnApprovalRoute(user, dto);
  }

  @ApiOperation({ summary: 'get all history for one approval route' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('approval/list-history')
  async rfxHistoryByApproval(@Query('rfxId') rfxId: number) {
    return await this.rfxApprovalHistoryService.getHistoryFromAllLevels(rfxId);
  }

  @ApiOperation({ summary: 'get one approval route by approvalId' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('approval/get-one')
  async getRfxApprovalRoute(@Query('approvalId') approvalId: number) {
    return await this.rfxApprovalRouteService.getApprovalById(approvalId);
  }
  // test api
  @Get('testApi')
  async testApi() {
    return await this.rfxUpdateService.inviteSuppliers(31);
  }
}
