import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { RfxSupplierResponseAnswerDto } from './rfx-supplier-res-answer.dto';
import { RfxSupplierResponseBoqDto } from './rfx-supplier-res-boq.dto';
import { SupplierResponseDocumentDto } from './rfx-supplier-res-doc.dto';
import { RfxSupplierResponseMeetingAtendeeDto } from './rfx-supplier-res-meeting-attendees.dto';
import { RfxSupplierResponseMessageDto } from './rfx-supplier-res-message.dto';

export class RfxSupplierResponseDto {
  id?: number;

  supplierId: number;

  @ApiPropertyOptional()
  @IsOptional()
  rfxId: number;

  @ApiPropertyOptional()
  @IsOptional()
  rfxSupplierId: number;

  @ApiPropertyOptional({
    type: [RfxSupplierResponseAnswerDto],
  })
  @IsOptional()
  answers: RfxSupplierResponseAnswerDto[];

  @ApiPropertyOptional({
    type: [RfxSupplierResponseMessageDto],
  })
  messages: RfxSupplierResponseMessageDto[];

  @ApiPropertyOptional()
  @IsOptional()
  billOfQuantity: RfxSupplierResponseBoqDto;

  @ApiPropertyOptional({
    type: [RfxSupplierResponseMeetingAtendeeDto],
  })
  @IsOptional()
  meetingAttendees: RfxSupplierResponseMeetingAtendeeDto[];

  @ApiPropertyOptional({
    type: [SupplierResponseDocumentDto],
  })
  @IsOptional()
  supportingDocuments: SupplierResponseDocumentDto[];
}
