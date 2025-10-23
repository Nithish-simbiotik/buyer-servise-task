import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BUYER_RESPONSE_STATUS } from 'src/enum/rfx/meeting-status.enum';

export class RfxSupplierResponseMeetingAtendeeDto {
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  phoneNumber: number;

  @ApiPropertyOptional()
  @IsOptional()
  didTheyAttend: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  buyerResponseStatus: BUYER_RESPONSE_STATUS;

  @ApiPropertyOptional()
  @IsOptional()
  rfxMeetingId: number;
}
