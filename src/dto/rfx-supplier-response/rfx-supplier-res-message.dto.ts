import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SupplierMessageDocumentDto {
  @ApiPropertyOptional()
  @IsOptional()
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  filename: string;

  @ApiPropertyOptional()
  @IsOptional()
  originalname: string;

  @ApiPropertyOptional()
  @IsOptional()
  path: string;

  @ApiPropertyOptional()
  @IsOptional()
  availabitly: string;

  @ApiPropertyOptional()
  @IsOptional()
  description: string;
}

export class RfxSupplierResponseMessageDto {
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  fromSupplierId: number;

  @ApiPropertyOptional()
  @IsOptional()
  toBuyerId: number;

  @ApiPropertyOptional()
  @IsOptional()
  subject: string;

  @ApiPropertyOptional()
  @IsOptional()
  content: string;

  @ApiPropertyOptional({
    type: [SupplierMessageDocumentDto],
  })
  @IsOptional()
  supportingDocuments: SupplierMessageDocumentDto[];
}
