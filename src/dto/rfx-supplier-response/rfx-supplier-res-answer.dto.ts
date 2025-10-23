import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class RfxSupplierResponseAnswerDto {
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  sNo: number;

  @ApiPropertyOptional()
  @IsOptional()
  questionId: number;

  @ApiPropertyOptional()
  @IsOptional()
  answer: any;
}
