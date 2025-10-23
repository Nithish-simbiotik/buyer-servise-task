import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { CheckList } from "src/enum/pr/checklist-selection.enum";
import { ExpenditureReason } from "src/enum/pr/expenditure-reason.enum";
import { PrStatus } from "src/enum/pr/pr-status.enum";
import { PrType, ViewerType } from "src/enum/prTemplate/prTemplates.enum";
import { SupplierStatus } from "src/enum/rfx/rfx-form-status.enum";

export class PRTeamMemberDto {
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  userId: number;

  @ApiPropertyOptional()
  @IsOptional()
  viewStatus: ViewerType;
}

export class PRRouteUserDto {
  @ApiPropertyOptional()
  userId: number;
}

export class PRApproverRouteDto {

  id?: number;

  @ApiPropertyOptional()
  level: number;

  @ApiPropertyOptional()
  levelName: string;

  @ApiPropertyOptional({
    type: [PRRouteUserDto]
  })
  @IsOptional()
  users: PRRouteUserDto[];

  @ApiPropertyOptional()
  allowToEscalate: boolean;

  @ApiPropertyOptional()
  allowToEditPR: boolean;

  @ApiPropertyOptional()
  maxApprovalLimit: number;
}

export class PRSupplierDto {

  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  supplierId: number;

  @ApiPropertyOptional()
  @IsOptional()
  remark: string;

  @ApiPropertyOptional()
  @IsOptional()
  totalAmount: number;

  @ApiPropertyOptional()
  @IsOptional()
  status: SupplierStatus;
}

export class PRDocumentDto {
  @ApiPropertyOptional()
  @IsOptional()
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  filename: string;

  @ApiPropertyOptional()
  @IsOptional()
  originalname: string;

  @ApiPropertyOptional()
  @IsOptional()
  path: string;

  @ApiPropertyOptional()
  @IsOptional()
  description: string;
}

export class CreatePRDto {

  id?: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  prTemplateId: number;

  @ApiProperty()
  @IsNotEmpty()
  prType: PrType;

  @ApiPropertyOptional()
  @Type(() => Number)
  rfxId: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  preprId: number;

  @ApiPropertyOptional()
  referenceNumber: string;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional()
  enableBudgetLocking: boolean;

  @ApiPropertyOptional()
  reasonForExpenditure: ExpenditureReason;

  @ApiPropertyOptional()
  baseCurrency: string;

  @ApiPropertyOptional()
  baseCurrencyReadOnly: boolean;

  @ApiPropertyOptional()
  baseCurrencyViewOnly: boolean;

  @ApiPropertyOptional()
  costCenter: string;

  @ApiPropertyOptional()
  costCenterReadOnly: boolean;

  @ApiPropertyOptional()
  costCenterVisible: boolean;

  @ApiPropertyOptional()
  purchasingOrg: number;

  @ApiPropertyOptional()
  purchaseOrgReadOnly: boolean;

  @ApiPropertyOptional({ default: PrStatus.ECAPEX_DRAFT })
  prStatus: PrStatus;

  @ApiPropertyOptional()
  availableBudgetReadOnly: boolean;

  @ApiPropertyOptional()
  availableBudgetVisible: boolean;

  @ApiPropertyOptional()
  urgentJob: boolean;

  @ApiPropertyOptional()
  urgentJobOption: string;

  @ApiPropertyOptional()
  prApprovedDate: Date;

  @ApiPropertyOptional() // validate according to PR temp.
  reason: string;

  @ApiPropertyOptional()
  plant: string;

  @ApiPropertyOptional()
  budgetRefCode: string;

  @ApiPropertyOptional()
  fadNumber: string;

  @ApiPropertyOptional({ type: [PRTeamMemberDto] })
  @IsOptional()
  teamMembers: PRTeamMemberDto[]; //relation  no sub

  @ApiPropertyOptional({
    type: [PRDocumentDto],
  })
  @IsOptional()
  justificationPaper: PRDocumentDto[];

  @ApiPropertyOptional({
    type: [PRDocumentDto],
  })
  @IsOptional()
  excoDocument: PRDocumentDto[];

  @ApiPropertyOptional()
  excoMinutesData: Date;

  @ApiPropertyOptional({
    type: [PRDocumentDto],
  })
  @IsOptional()
  otherDocument: PRDocumentDto[];

  @ApiPropertyOptional({
    type: [PRApproverRouteDto],
  })
  @IsOptional()
  approvalRoute: PRApproverRouteDto[];

  @ApiPropertyOptional({
    type: [PRApproverRouteDto],
  })
  @IsOptional()
  ecapexApprovalRoute: PRApproverRouteDto[];

  @ApiPropertyOptional({ type: [PRSupplierDto] })
  @IsOptional()
  rfxSupplier: PRSupplierDto[];

  @ApiPropertyOptional()
  glCode: string;

  @ApiPropertyOptional()
  accountAssignment: string;

  @ApiPropertyOptional()
  checkListSelection: CheckList;

  @ApiPropertyOptional()
  ageOfEquipment: number;

  @ApiPropertyOptional()
  numberOfRepair: number;

  @ApiPropertyOptional()
  DANSReportNo: string;

  @ApiPropertyOptional()
  supplier: string;

  @ApiPropertyOptional()
  newUnitPrice: number;

  @ApiPropertyOptional()
  caprRefNo: string;

  @ApiPropertyOptional()
  msdsRefNo: string;

  @ApiPropertyOptional()
  deliveryDate: Date;

  @ApiPropertyOptional()
  receiverPhoneNumber: string;

  @ApiPropertyOptional()
  receiverName: string;

  @ApiPropertyOptional()
  receivingLocation: string;

  @ApiPropertyOptional()
  receiverDepartment: string;

  @ApiPropertyOptional()
  isDeliveryAddressManual: boolean;

  @ApiPropertyOptional()
  deliveryAddress: string;

  @ApiProperty()
  @IsOptional()
  createdBy: number;

  @ApiProperty()
  @IsOptional()
  updatedBy: number;
}

export class UpdatePrDto extends PartialType(CreatePRDto) { }