import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  PrType,
  ViewerType,
  PrTemplateStatus,
  DeliveryType,
} from 'src/enum/prTemplate/prTemplates.enum';
import { isEnum, IsEnum, IsOptional, IsString } from 'class-validator';

/**========================================================================
 *                           Team Members DTO PR
 *========================================================================**/
export class PrTemplateTeamMembersDto {
  @ApiPropertyOptional()
  @IsOptional()
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  userId: number;

  @ApiPropertyOptional()
  @IsEnum(ViewerType)
  viewStatus: ViewerType;

  prTemplateId: number;
}

/**========================================================================
 *                           APPROVAL Template Level DTO PR
 *========================================================================**/

export class PrTemplateApprovalLevelDto {
  //?Approval Route
  @ApiPropertyOptional()
  @IsOptional()
  enableApprovalReminder: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  enableForALlApprovalLevelsVisible: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  reminderEmailSentHours: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  maximumNumbersOfEmailReminder: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  notifyRequestOwnerReminder: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  allowToAddAdditionalApproval: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  allowToAddAdditionalApprovalReadOnly: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  allowToAddAdditionalApprovalVisible: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  allowToAddAdditionalApprovalOptional: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  minApprovalLimit: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  allowToEscalate: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  allowToEditPR: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  approvalLevels: {
    levelName: string;
    userId: number;
    levelSequence: number;
  }[];
}

/**========================================================================
 *                           Template User Assigned DTO
 *========================================================================**/
export class TemplateUserDto {
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  userId: number;
}

/**========================================================================
 *                           ECAPEX Template Level DTO PR
 *========================================================================**/
export class ECAPEXTemplateApprovalLevelDto {
  //?Approval Route ECAPEX
  @ApiPropertyOptional()
  @IsOptional()
  enableApprovalReminderECAPEX: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  enableForALlApprovalLevelsVisibleECAPEX: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  reminderEmailSentHoursECAPEX: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  maximumNumbersOfEmailReminderECAPEX: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  notifyRequestOwnerReminderECAPEX: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  allowToAddAdditionalApprovalECAPEX: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  allowToAddAdditionalApprovalReadOnlyECAPEX: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  allowToAddAdditionalApprovalVisibleECAPEX: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  allowToAddAdditionalApprovalOptionalECAPEX: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  maxApprovalLimitECAPEX: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  allowToEscalateECAPEX: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  allowToEditPRECAPEX: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  approvalLevelsECAPEX: {
    levelName: string;
    userId: number;
    levelSequence: number;
  }[];
}

/**========================================================================
 *                           Create Pr Template DTO
 *========================================================================**/
export class CreatePrTemplateDto {
  @ApiPropertyOptional()
  @IsOptional()
  id?: number;

  //? TemplateCreation
  @ApiPropertyOptional()
  @IsOptional()
  templateName: string;

  @ApiPropertyOptional()
  @IsOptional()
  departmentId: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsEnum(PrTemplateStatus)
  prStatus: PrTemplateStatus;

  // departmentName : string;

  @ApiProperty({ default: false })
  @IsString()
  @IsEnum(PrType)
  prType: PrType; //enum    ( "CAPEX", "OPEX")

  //?General Information
  @ApiProperty({ default: false })
  @IsOptional()
  enableCAPExPRWorkflow: boolean;

  @ApiProperty({ default: false })
  @IsOptional()
  reasonForExpenditure: boolean;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsString()
  prName: string;

  @ApiProperty({ default: false })
  @IsOptional()
  prNameReadOnly: boolean;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  deliveryAddressId: number; // join with Master Data

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  customDeliveryAddress: string;

  @ApiPropertyOptional({ required: false })
  @IsEnum(DeliveryType)
  @IsOptional()
  deliveryAddressType: DeliveryType;

  // deliveryAddress;

  //?Bill OF Quantity Control
  @ApiPropertyOptional({ default: false })
  @IsOptional()
  allowToEditOfBillQuantity: boolean;

  //? Finance
  @ApiPropertyOptional({ required: false })
  @IsOptional()
  baseCurrencyId: number; // join with Master Data

  // baseCurrency

  @ApiProperty({ default: false })
  @IsOptional()
  baseCurrencyReadOnly: boolean;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  decimalId: number; // join with Master Data

  // decimal

  @ApiProperty({ default: false })
  @IsOptional()
  decimalReadOnly: boolean;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  costCenterId: number; // join with Master Data

  // costCenter;

  @ApiProperty({ default: false })
  @IsOptional()
  costCenterReadOnly: boolean;

  @ApiProperty({ default: false })
  @IsOptional()
  costCenterVisible: boolean;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  purchaseOrgId: number; // join with Master Data

  // purchasingOrg;

  @ApiProperty({ default: false })
  @IsOptional()
  purchaseOrgReadOnly: boolean;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  availableBudgetId: number; // join with Master Data

  // budget

  @ApiProperty({ default: false })
  @IsOptional()
  availableBudgetVisible: boolean;

  @ApiProperty({ default: false })
  @IsOptional()
  availableBudgetReadOnly: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  availableBudgetOptional: boolean;

  @ApiProperty({ default: false })
  @IsOptional()
  enableBudgetLocking: boolean;

  //?Team Members
  @ApiPropertyOptional({ type: [PrTemplateTeamMembersDto] })
  @IsOptional()
  teamMembers: PrTemplateTeamMembersDto[];

  @ApiPropertyOptional()
  @IsOptional()
  teamMemberReadOnly = false;

  @ApiProperty()
  @IsOptional()
  approvalRoute: PrTemplateApprovalLevelDto;

  @ApiPropertyOptional()
  @IsOptional()
  ECAPEXApprovalRoute: ECAPEXTemplateApprovalLevelDto;

  @ApiPropertyOptional({ type: [TemplateUserDto] })
  @IsOptional()
  templateUsers: TemplateUserDto[];

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  templateUsersReadOnly: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  templateUsersControl: boolean;

  @IsOptional()
  createdById: number;

  @IsOptional()
  updatedById: number;
}

// export class UpdatePRTemplateDto extends PartialType(CreatePrTemplateDto) {}
