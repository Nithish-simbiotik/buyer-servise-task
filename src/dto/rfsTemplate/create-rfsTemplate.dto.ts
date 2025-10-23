import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TeamMemberType } from 'src/enum/team-member/team-member-type.enum';

export class TeamMembersDto {
  @ApiPropertyOptional({ required: true })
  userId: number;

  @ApiProperty({ default: TeamMemberType.VIEWER })
  viewStatus: TeamMemberType;
}

export class TemplateUserDto {
  @ApiPropertyOptional({ required: true })
  userId: number;
}

export class ApprovalLevelDto {
  @ApiPropertyOptional()
  level: number;

  @ApiPropertyOptional()
  levelName: string;

  @ApiPropertyOptional()
  userRole: string;

  @ApiPropertyOptional()
  userId: number;

  @ApiPropertyOptional()
  departmentId: number;
}

export class CreateRFSTemplateDto {
  @ApiPropertyOptional()
  templateName: string;

  @ApiPropertyOptional()
  purchasingOrgId: number;

  @ApiProperty({ default: false })
  purchasingOrg_readonly: boolean;

  @ApiProperty({ default: false })
  purchasingOrg_visible: boolean;

  @ApiPropertyOptional({ required: true })
  departmentId: number;

  @ApiProperty({ default: false })
  department_readonly: boolean;

  @ApiProperty({ default: false })
  department_visible: boolean;

  @ApiProperty({ default: false })
  urgent_job_visible: boolean;

  @ApiProperty({ default: 'String' })
  urgentJobOption: string;

  @ApiProperty({ default: false })
  status: string;

  @ApiPropertyOptional({ required: true })
  baseCurrencyId: number;

  @ApiProperty({ default: false })
  baseCurrency_readonly: boolean;

  @ApiProperty({ default: false })
  baseCurrency_visible: boolean;

  @ApiPropertyOptional({ required: true })
  costCenterId: number;

  @ApiProperty({ default: false })
  costCenter_readonly: boolean;

  @ApiProperty({ default: false })
  costCenter_visible: boolean;

  @ApiPropertyOptional({ type: [TeamMembersDto] })
  teamMembers: TeamMembersDto[];

  @ApiPropertyOptional({ default: true })
  reminderAlert: boolean;

  @ApiPropertyOptional({ default: 1 })
  reminderInterval: number;

  // @ApiPropertyOptional({ default: 1 })
  // reminderAlert_visible: number;

  @ApiPropertyOptional({ default: true })
  reminderAlert_visible: boolean;

  @ApiPropertyOptional({ default: 1 })
  reminderFrequency: number;

  @ApiPropertyOptional({ default: true })
  notifyMe: boolean;

  @ApiPropertyOptional({ default: false })
  addApprovalRouting: boolean;

  @ApiPropertyOptional({ default: false })
  approvalRouting_readonly: boolean;

  @ApiPropertyOptional({ default: false })
  approvalRouting_visible: boolean;

  @ApiPropertyOptional({ default: false })
  approvalRouting_optional: boolean;

  @ApiPropertyOptional({ type: [ApprovalLevelDto] })
  levels: ApprovalLevelDto[];

  @ApiPropertyOptional({ default: 'User 1' })
  createdBy: string;

  @ApiPropertyOptional()
  updatedBy: string;

  @ApiPropertyOptional({ type: [TemplateUserDto] })
  templateUser: TemplateUserDto[];
}
