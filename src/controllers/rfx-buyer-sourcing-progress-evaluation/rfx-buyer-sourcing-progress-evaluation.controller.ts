import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/auth/auth-user.decorator';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { RfxBuyerAttendanceResponseService } from 'src/services/rfx/manage-rfx-buyer-response/rfx-buyer-attendance-response/rfx-buyer-attendance-response.service';
import { RfxBuyerProgressResponseService } from 'src/services/rfx/manage-rfx-buyer-response/rfx-buyer-progress-response/rfx-buyer-progress-response.service';

@ApiTags('rfx-buyer-sourcing-progress-evaluation')
@Controller('rfx-buyer-sourcing-progress-evaluation')
export class RfxBuyerSourcingProgressEvaluationController {
    constructor(
        private buyerAttendanceService: RfxBuyerAttendanceResponseService,
        private rfxBuyerProgressService: RfxBuyerProgressResponseService
    ) {

    }
    @ApiOperation({ summary: 'Api for buyer progress tab' })
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @Get('/progress/:rfxId')
    async rfxFilter(
        // @User() user: JwtPayload,
        @Param('rfxId') rfxId: number
    ) {
        return await this.rfxBuyerProgressService.getBuyerEventProgressDetails(rfxId)

    }
}
