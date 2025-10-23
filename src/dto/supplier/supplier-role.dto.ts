import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class SupplierRoleDto {
  @ApiProperty()
  supplierRoleName: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  supplierId: number[];

  @ApiProperty()
  supplierSelection: string;

  @ApiProperty()
  moduleAccessRightsId: number[];

  @ApiProperty()
  userAccessRights: string[];

  @ApiPropertyOptional()
  createdBy: string;

  @ApiProperty()
  createdAt: string;

  @ApiPropertyOptional()
  updatedBy: string;

  @ApiProperty()
  updatedAt: string;
}
