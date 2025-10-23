import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class PRApproverDto {

  @ApiProperty()
  @IsBoolean()
  approve: boolean;

  @ApiPropertyOptional()
  approverRemarks: string;
}