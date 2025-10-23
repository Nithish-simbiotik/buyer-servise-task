import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { SupplierCategoryStatusEnum } from 'src/enum/supplier/supplierCategoryStatus.enum';

export class SuppierPagingDto {
  @ApiProperty({ required: false, default: '' })
  keyword: string;

  @ApiProperty({ required: false, default: 10 })
  @Type(() => Number)
  size: number;

  @ApiProperty({
    required: false,
    enum: SupplierCategoryStatusEnum,
    default: SupplierCategoryStatusEnum.ALL,
  })
  @IsOptional()
  status: SupplierCategoryStatusEnum;

  @ApiProperty({ required: false, default: 1 })
  @Type(() => Number)
  page: number;

  constructor(
    search: string,
    size: number,
    status: SupplierCategoryStatusEnum,
    page: number,
  ) {
    this.keyword = search;
    this.size = size;
    this.status = status;
    this.page = page;
  }
}
export class SupplierIds {
  @ApiProperty({
    required: false,
    type: [Number]
  })
  categoryIds: number[]
}
