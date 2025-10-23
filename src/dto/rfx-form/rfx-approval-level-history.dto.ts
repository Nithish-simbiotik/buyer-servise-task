import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  RfxApprovalAction,
  RfxFormStatus,
} from 'src/enum/rfx/rfx-form-status.enum';
import { Column } from 'typeorm';

export class RfxApprovalLevelHistoryDto {
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  rfxId: number;

  @ApiPropertyOptional()
  @IsOptional()
  actionTakenById: number;

  @ApiPropertyOptional()
  @IsOptional()
  action: RfxApprovalAction;

  @Column({ default: RfxFormStatus.NOT_SUBMITED })
  levelStatus: RfxFormStatus;

  @Column({ nullable: true })
  remark: string;
}
