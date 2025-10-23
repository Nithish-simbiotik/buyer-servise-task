
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateRFSDto } from "./create-rfs.dto";

export class Submit {

    @ApiPropertyOptional()
    preprId: number;
  
    @ApiPropertyOptional()
    createRFSDto: CreateRFSDto;
    
    
  
  }