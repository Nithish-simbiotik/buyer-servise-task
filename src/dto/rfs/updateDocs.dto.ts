
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class DocDto{
  @ApiPropertyOptional()
  description:string;

  @ApiPropertyOptional()
  availability:string;

  @ApiPropertyOptional()
  docID: number;
}
export class UpdateDocsDto {
  
    @ApiPropertyOptional({ type: [DocDto] })
    docData: DocDto[];
    
  }
