import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class SupplierDto {
  @ApiProperty()
  communicationEmailAddress: string;

  @ApiProperty()
  windowPersonName: string;

  @ApiProperty()
  windowPersonPhoneNumber: string;

  @ApiPropertyOptional()
  @IsArray()
  industryCategoryId: number[];

  @ApiPropertyOptional()
  @IsArray()
  supplierTagId: number[];

  @ApiProperty()
  status: string;
}

class SelectedSupplierDto {
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  supplierId: number;
}

export class CategorySupplierDto {
  @ApiPropertyOptional()
  id?: number;

  @ApiPropertyOptional()
  categoryName: string;

  @ApiProperty()
  status: string;

  @ApiProperty({ type: [SelectedSupplierDto] })
  selectedSuppliers: SelectedSupplierDto[];

  @ApiPropertyOptional()
  @IsOptional()
  createdById: number;

  @ApiPropertyOptional()
  @IsOptional()
  updatedById: number;

  // @ApiPropertyOptional()
  // createdBy: number;

  // @ApiPropertyOptional()
  // updatedBy: number;
}

export class SupplierCatUpdateDto extends PartialType(CategorySupplierDto) {}
