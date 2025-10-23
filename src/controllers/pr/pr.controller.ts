import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Res, UseGuards, UsePipes } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "src/decorators/auth/auth-user.decorator";
import { CreatePRDto, UpdatePrDto } from "src/dto/pr/create-pr.dto";
import { ECAPEXBudgetRefCodeDto } from "src/dto/pr/ecapex-budget-ref-code.dto";
import { ECAPEXFADNoDto } from "src/dto/pr/ecapex-fad-number.dto";
import { PRApproverDto } from "src/dto/pr/pr-approver.dto";
import { PRListDto } from "src/dto/pr/pr-list.dto";
import { JwtPayload } from "src/interface/user/jwt.payload.interface";
import { PrService } from "src/services/pr/pr.service";
import { Response } from 'express';
import { PRApprovalValidationPipe } from "src/pipes/pr/pr-approval-validation.pipe";

@ApiTags('pr')
@Controller('pr')
export class PrController {
  constructor(
    private readonly createPrService: PrService
  ) { }

  @Post('/create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createPr(
    @User() user: JwtPayload,
    @Body() createPRDto: CreatePRDto,
  ) {
    return await this.createPrService.createPr(
      user,
      createPRDto,
    );
  }

  @Put('/update')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updatePr(
    @User() user: JwtPayload,
    @Body() updatePRDto: UpdatePrDto,
  ) {
    return await this.createPrService.updatePr(
      user,
      updatePRDto,
    );
  }

  @ApiOperation({ summary: 'Api for get pr list' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  async getRfxList(
    @User() user: JwtPayload,
    @Query() pagingDto: PRListDto,
  ) {
    return await this.createPrService.getPrList(user.userId, pagingDto);
  }

  @Get('/:prId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getPrDetails(
    @User() user: JwtPayload,
    @Param('prId', ParseIntPipe) prId: number,
  ) {
    return await this.createPrService.getPrDetails(
      user,
      prId
    );
  }

  @Patch('/submitECAPEXForApproval/:prId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async ecapexForApproval(
    @User() user: JwtPayload,
    @Param('prId', ParseIntPipe) prId: number
  ) {
    return await this.createPrService.ecapexForApproval(
      user,
      prId
    );
  }

  @Patch('/submitPRForApproval/:prId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async prForApproval(
    @User() user: JwtPayload,
    @Param('prId', ParseIntPipe) prId: number
  ) {
    return await this.createPrService.ecapexForApproval(
      user,
      prId
    );
  }

  @Post('createPRFromECAPEx/:prId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createPRFromECAPEx(
    @User() user: JwtPayload,
    @Param('prId', ParseIntPipe) prId: number,
  ) {
    return await this.createPrService.createPRFromECAPEx(user, prId);
  }

  @Patch('/ecapexApproval/:prId/:prApproverRouteId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async approveECAPEX(
    @User() user: JwtPayload,
    @Param('prApproverRouteId', ParseIntPipe) prApproverRouteId: number,
    @Param('prId', ParseIntPipe) prId: number,
    @Body(new PRApprovalValidationPipe()) prApproverDto: PRApproverDto
  ) {
    return await this.createPrService.ecapexApproval(
      user,
      prApproverRouteId,
      prId,
      prApproverDto
    );
  }

  @Patch('/prApproval/:prId/:prApproverRouteId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'For OPEX/PR approval route users' })
  @UseGuards(AuthGuard('jwt'))
  async approvePR(
    @User() user: JwtPayload,
    @Param('prApproverRouteId', ParseIntPipe) prApproverRouteId: number,
    @Param('prId', ParseIntPipe) prId: number,
    @Body(new PRApprovalValidationPipe()) prApproverDto: PRApproverDto
  ) {
    return await this.createPrService.prApproval(
      user,
      prApproverRouteId,
      prId,
      prApproverDto
    );
  }

  @Patch(':prId/changeFADNo')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async editFADNo(
    @User() user: JwtPayload,
    @Param('prId', ParseIntPipe) prId: number,
    @Body() ecapexFADNoDto: ECAPEXFADNoDto
  ) {
    return await this.createPrService.changeFADNo(user, prId, ecapexFADNoDto);
  }

  @Patch(':prId/changeBudgetRefCode')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async editBudgetRefCode(
    @User() user: JwtPayload,
    @Param('prId', ParseIntPipe) prId: number,
    @Body() ecapexBudgetRefCodeDto: ECAPEXBudgetRefCodeDto
  ) {
    return await this.createPrService.changeBudgetRefCode(user, prId, ecapexBudgetRefCodeDto);
  }

  @Post('exportExcel')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async exportExcel(
    @User() user: JwtPayload,
    @Body() prListDto: PRListDto,
    @Res() res: Response,
  ) {
    return await this.createPrService.exportPRList(user, prListDto, res);
  }
}