import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ApprovalLevelDto,
  TeamMembersDto,
  CreateRFSTemplateDto,
} from './create-rfsTemplate.dto';

export class updateRFSTemplateDto extends CreateRFSTemplateDto {
  @ApiPropertyOptional()
  id: number;
}
