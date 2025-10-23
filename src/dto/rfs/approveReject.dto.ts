import { ApiPropertyOptional } from "@nestjs/swagger";

export class ApproveRejectRFSDto {

    @ApiPropertyOptional()
    prepr: number;
  
    @ApiPropertyOptional()
    remarks: string;
}

export class EscalateRFSDto {

    @ApiPropertyOptional()
    prepr: number;
  
    @ApiPropertyOptional()
    remarks: string;

    @ApiPropertyOptional()
    activeLevel:number

    @ApiPropertyOptional()
    escalatedDepartment:number

    @ApiPropertyOptional()
    escalatedUserRole:string
}