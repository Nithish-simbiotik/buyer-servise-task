import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SupplierResponseDocumentDto {
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
