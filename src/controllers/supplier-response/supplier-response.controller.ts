import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/auth/auth-user.decorator';
import { RfxSupplierResponseMeetingAtendeeDto } from 'src/dto/rfx-supplier-response/rfx-supplier-res-meeting-attendees.dto';
import { RfxSupplierResponseMessageDto } from 'src/dto/rfx-supplier-response/rfx-supplier-res-message.dto';
import { RfxSupplierResponseDto } from 'src/dto/rfx-supplier-response/rfx-supplier-res.dto';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { RfxBuyerAttendanceResponseService } from 'src/services/rfx/manage-rfx-buyer-response/rfx-buyer-attendance-response/rfx-buyer-attendance-response.service';
import { AddRfxSupplierResponseService } from 'src/services/rfx/manage-rfx-supplier-response/add-rfx-supplier-response/add-rfx-supplier-response.service';
import { GetRfxSupplierResponseService } from 'src/services/rfx/manage-rfx-supplier-response/get-rfx-supplier-response/get-rfx-supplier-response.service';
import { RfxSupplierAttendanceResponseService } from 'src/services/rfx/manage-rfx-supplier-response/rfx-supplier-attendance-response/rfx-supplier-attendance-response.service';
import { RfxSupplierMessageResponseService } from 'src/services/rfx/manage-rfx-supplier-response/rfx-supplier-message-response/rfx-supplier-message-response.service';

@ApiTags('supplier response')
@Controller('supplier-response')
export class SupplierResponseController {
  constructor(
    private addRfxSupplierResponseService: AddRfxSupplierResponseService,
    private getRfxSupplierResponseService: GetRfxSupplierResponseService,
    private rfxBuyerAttendanceResponse: RfxBuyerAttendanceResponseService,
    private rfxSupplierAttendanceResponse: RfxSupplierAttendanceResponseService,
    private rfxSupplierMessageResponse: RfxSupplierMessageResponseService,
  ) {}

  @ApiOperation({ summary: 'submit a response by a supplier' })
  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createSupplierResponse(
    @Body() supplierResponseDto: RfxSupplierResponseDto,
    @User() user: JwtPayload,
  ) {
    return await this.addRfxSupplierResponseService.createRfxSupplierResponse(
      supplierResponseDto,
      user,
    );
  }

  @ApiOperation({ summary: 'get one supplier response by id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('get-one')
  async getRfxApprovalRoute(@Query('responseId') responseId: number) {
    return await this.getRfxSupplierResponseService.getRfxSupplierResponse(
      responseId,
    );
  }

  @Patch('update-one')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateRfxTemplate(
    @Body() dto: RfxSupplierResponseDto,
    @User() user: JwtPayload,
  ) {
    return await this.addRfxSupplierResponseService.updateRfxSupplierResponse(
      dto,
      user,
    );
  }

  @Patch('buyer/update-attendance')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateAttendanceByBuyer(
    @Body() dto: RfxSupplierResponseDto,
    @User() user: JwtPayload,
  ) {
    return await this.rfxBuyerAttendanceResponse.updateSupplierAttendance(
      dto,
      user,
    );
  }

  @ApiOperation({
    summary: 'api where a supplier adds an attendee for a rfx meeting',
  })
  @Patch('supplier/update-attendance')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateAttendanceBySupplier(
    @Body() dto: RfxSupplierResponseMeetingAtendeeDto,
    @User() user: JwtPayload,
  ) {
    return await this.rfxSupplierAttendanceResponse.updateAttendanceBySupplier(
      dto,
      user,
    );
  }

  @ApiOperation({ summary: 'api where a supplier sends a message for a buyer' })
  @Patch('supplier/send-message')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateMessageBySupplier(
    @Body() dto: RfxSupplierResponseMessageDto,
    @User() user: JwtPayload,
  ) {
    return await this.rfxSupplierMessageResponse.sendMessageBySupplier(
      dto,
      user,
    );
  }

  @ApiOperation({
    summary: 'check if the current supplier has responded to the rfx',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('check-if-responded')
  async doesSupplierHaveResponse(
    @Query('rfxId') rfxId: number,
    @User() user: JwtPayload,
  ) {
    return await this.getRfxSupplierResponseService.checkIfSupplierHasResponded(
      rfxId,
      user,
    );
  }
}
