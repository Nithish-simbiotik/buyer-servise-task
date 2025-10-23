import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ECAPEXBudgetRefCodeDto {

  @ApiProperty()
  @IsNotEmpty()
  budgetRefCode: string;
}