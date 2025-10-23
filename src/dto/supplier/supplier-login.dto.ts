import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SupplierLoginDto {
    @ApiPropertyOptional()
    userName?:string;
    @ApiPropertyOptional()
    email?:string;
    @ApiPropertyOptional()
    password:string
}