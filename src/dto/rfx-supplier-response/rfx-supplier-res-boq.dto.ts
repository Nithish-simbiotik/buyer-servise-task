import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { EquivalentBrandAllowedTypeEnum } from 'src/enum/rfs/equivalentBrand.enum';

export class RfxSupplierResponseBoqItemDto {
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  itemName: string;

  @ApiPropertyOptional()
  @IsOptional()
  itemDescription: string;

  @ApiPropertyOptional()
  @IsOptional()
  brand: string;

  @ApiPropertyOptional()
  @IsOptional()
  model: string;

  @ApiPropertyOptional()
  @IsOptional()
  equivalentBrandAllowed: EquivalentBrandAllowedTypeEnum;

  @ApiPropertyOptional()
  @IsOptional()
  costCenterId: number;

  @ApiPropertyOptional()
  @IsOptional()
  wordOrderNo: string;

  @ApiPropertyOptional()
  @IsOptional()
  internalOrderNoId: number;

  @ApiPropertyOptional()
  @IsOptional()
  partNumberId: number;

  @ApiPropertyOptional()
  @IsOptional()
  uomId: number;

  @ApiPropertyOptional()
  @IsOptional()
  quantity: number;

  @ApiPropertyOptional()
  @IsOptional()
  remark: string;

  @ApiPropertyOptional()
  @IsOptional()
  unitPrice: number;

  @ApiPropertyOptional()
  @IsOptional()
  totalAmountBeforeTax: number;

  @ApiPropertyOptional()
  @IsOptional()
  taxPercentage: number;

  @ApiPropertyOptional()
  @IsOptional()
  taxAmount: number;

  @ApiPropertyOptional()
  @IsOptional()
  totalAmountAfterTax: number;

  @ApiPropertyOptional()
  @IsOptional()
  supplierBrandOption: string;

  @ApiPropertyOptional()
  @IsOptional()
  supplierBrand: string;

  @ApiPropertyOptional()
  @IsOptional()
  supplierModel: string;

  @ApiPropertyOptional()
  @IsOptional()
  priceIncluded: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  unableToQuote: boolean;
}

export class RfxSupplierResponseBoqDto {
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  remark: string;

  @ApiPropertyOptional()
  @IsOptional()
  totalAmountBeforeTax: number;

  @ApiPropertyOptional()
  @IsOptional()
  totalTax: number;

  @ApiPropertyOptional()
  @IsOptional()
  grandTotal: number;

  @ApiPropertyOptional({
    type: [RfxSupplierResponseBoqItemDto],
  })
  @IsOptional()
  items: RfxSupplierResponseBoqItemDto[];
}
