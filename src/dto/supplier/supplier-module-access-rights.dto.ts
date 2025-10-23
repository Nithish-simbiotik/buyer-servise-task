import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SupplierModuleAccessRightsDto {
  @ApiProperty()
  accessRightName: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  userAccessRights: string[];

  @ApiProperty()
  createdAt: string;

  @ApiPropertyOptional()
  createdBy: string;

  @ApiProperty()
  updatedAt: string;

  @ApiPropertyOptional()
  updatedBy: string;
}
