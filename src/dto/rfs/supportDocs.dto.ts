
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class SubmitDocs {

    @ApiPropertyOptional()
    preprId: number;
  
    @ApiPropertyOptional()
    docID: number[];
    
  }