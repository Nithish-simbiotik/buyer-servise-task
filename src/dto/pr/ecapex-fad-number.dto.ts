import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class ECAPEXFADNoDto {

  @MaxLength(50)
  @ApiProperty()
  @IsNotEmpty()
  fadNumber: string;
}