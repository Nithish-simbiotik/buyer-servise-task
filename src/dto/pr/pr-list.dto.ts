import { ApiProperty } from "@nestjs/swagger";
import { PagingDto } from "../paging.dto";

export class PRListDto extends PagingDto {
  @ApiProperty({ required: false })
  fromDate: Date;
  @ApiProperty({ required: false })
  toDate: Date;
}