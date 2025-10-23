import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  RfxApprovalAction,
  RfxFormStatus,
} from 'src/enum/rfx/rfx-form-status.enum';

export class RfxApprovalLevelUpdateDto {
  @ApiPropertyOptional()
  @IsOptional()
  rfxId: number;

  @ApiPropertyOptional()
  @IsOptional()
  approvalId: number;

  @ApiPropertyOptional()
  @IsOptional()
  action: RfxApprovalAction;

  @ApiPropertyOptional()
  @IsOptional()
  remark: string;

  @ApiPropertyOptional()
  @IsOptional()
  levelStatus: RfxFormStatus;

  @ApiPropertyOptional()
  @IsOptional()
  levelSequence: number;
}
