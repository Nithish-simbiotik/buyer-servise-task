import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class RfxTemplateDepartmentDto {
  @ApiPropertyOptional()
  @IsOptional()
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  created_by: string;

  @ApiPropertyOptional()
  @IsOptional()
  department_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  display_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  purchasing_org: string;

  @ApiPropertyOptional()
  @IsOptional()
  status: string;

  @ApiPropertyOptional()
  @IsOptional()
  updated_by: string;
}
