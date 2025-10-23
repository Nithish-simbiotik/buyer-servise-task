import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class ExportDto {
  @ApiPropertyOptional({ required: false })
  keyword: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  offset: number;

  constructor(search: string, offset: number) {
    this.keyword = search;
    this.offset = offset;
  }
}

export class SearchExportDto {
  @ApiProperty({ required: false })
  keyword: string;

  @ApiProperty({ required: false })
  status: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  offset: number;

  constructor(search: string, offset: number) {
    this.keyword = search;
    this.offset = offset;
  }
}

export class PaymentExportDto extends ExportDto{

  @ApiPropertyOptional({ required: false })
  fromDate: Date;
  @ApiPropertyOptional({ required: false })
  toDate: Date;
  @ApiPropertyOptional({ required: false })
  purchaseOrg: number;
}
