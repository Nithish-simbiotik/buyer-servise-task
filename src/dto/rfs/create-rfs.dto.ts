import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { EquivalentBrandAllowedTypeEnum } from 'src/enum/rfs/equivalentBrand.enum';
import { SubmitType } from 'src/enum/rfs/submitType.enum';
import { TeamMemberType } from 'src/enum/team-member/team-member-type.enum';

export class DeliveryAddressDto {
  @ApiPropertyOptional({ default: 'Office Address' })
  title: string;

  @ApiPropertyOptional({ default: 'Street 1' })
  addressLine1: string;

  @ApiPropertyOptional({ default: 'Streeet 2' })
  addressLine2: string;

  @ApiPropertyOptional({ default: 'Petaling Jaya' })
  city: string;

  @ApiPropertyOptional({ default: 'Selangor' })
  state: string;

  @ApiPropertyOptional({ default: '12345' })
  zipCode: string;

  @ApiPropertyOptional({ default: 'Malaysia' })
  country: string;
}

export class WarrantyDto {
  @ApiPropertyOptional({ default: 'Test Warranty' })
  name: string;
}

export class SupplierDto {
  // @ApiPropertyOptional()
  // name: string;

  @ApiPropertyOptional()
  supplierId: number;
}

export class CostCenterDto {
  @ApiPropertyOptional({ default: 'code' })
  code: string;

  @ApiPropertyOptional({ default: 'code description' })
  description: string;

  @ApiPropertyOptional({ default: 'company code' })
  companycode: string;
}

export class TeamMemberDto {
  @ApiPropertyOptional({ required: true })
  userId: number;

  @ApiProperty({ default: TeamMemberType.VIEWER })
  viewStatus: TeamMemberType;
}

export class PreviousPurchaseDto {
  @ApiPropertyOptional({ default: 'Previous purchase' })
  previousPurchase: string;
}

export class SupportingDocumentsDto {
  @ApiPropertyOptional({ default: '1234' })
  preprId: number;

  // @ApiPropertyOptional({ default: '1234' })
  // fileId: string;

  // @ApiPropertyOptional({ default: 'application/pdf' })
  // fileType: string;

  // @ApiPropertyOptional({ default: 'Document' })
  // documentType: string;

  @ApiPropertyOptional({ default: new Date() })
  uploadDate: Date;

  // @ApiPropertyOptional({ default: 'file path' })
  // filePath: string;

  @ApiPropertyOptional({ default: 'original name' })
  fileOriginalName: string;

  @ApiPropertyOptional({ default: 'original name' })
  availability: string;

  @ApiPropertyOptional({ default: 'original name' })
  description: string;
}

export class BillOfQuantityDto {
  @ApiPropertyOptional({ default: 'Item 1', nullable: true })
  itemName: string;

  @ApiPropertyOptional({ default: 'Item Description 1', nullable: true })
  itemDescription: string;

  @ApiPropertyOptional({ default: 'Sony', nullable: true })
  brand: string;

  @ApiPropertyOptional({ default: 'MF11', nullable: true })
  model: string;

  @ApiPropertyOptional({ nullable: true })
  uomId: number;

  @ApiPropertyOptional({ nullable: true })
  quantity: number;

  @ApiPropertyOptional({ nullable: true })
  partNumberId: number;

  @ApiPropertyOptional({ nullable: true })
  equivalentBrandAllowed: EquivalentBrandAllowedTypeEnum;

  @ApiPropertyOptional({ default: 'AJJ1', nullable: true })
  wordOrderNo: string;

  @ApiPropertyOptional({ nullable: true })
  internalOrderNoId: number;

  @ApiPropertyOptional({ nullable: true })
  costCenterId: number;
}

export class ApprovalLevelDto {
  @ApiPropertyOptional()
  level: number;

  @ApiPropertyOptional()
  levelName: string;

  @ApiPropertyOptional()
  userRole: string;

  @ApiPropertyOptional({ default: 0 })
  activeLevel: number;

  @ApiPropertyOptional()
  departmentId: number;

  @ApiPropertyOptional()
  userId: number;

  @ApiPropertyOptional()
  departmentTypeForm: boolean;
}

export class NotificationsDto {
  @ApiPropertyOptional()
  level: number;

  @ApiPropertyOptional()
  reminderInterval: number;

  @ApiPropertyOptional()
  reminderFrequency: number;

  @ApiPropertyOptional()
  createdAt: Date;

  @ApiPropertyOptional()
  updatedAt: Date;

  @ApiPropertyOptional()
  status: SubmitType;

  @ApiPropertyOptional()
  userRole: string;

  @ApiPropertyOptional()
  departmentId: number;

  @ApiPropertyOptional()
  remark: string;
}

export class CreateRFSDto {
  @ApiPropertyOptional({ default: 1 })
  templateId: number;

  @ApiPropertyOptional({ default: 'Test' })
  title: string;

  @ApiPropertyOptional({ default: 'Test Templete' })
  templateName: string;

  @ApiPropertyOptional()
  purchasingOrg: number;

  @ApiPropertyOptional({ default: 'IRR/1' })
  internalReferenceNumber: string;

  @ApiProperty({ default: false })
  urgent_job: boolean;

  @ApiProperty({ default: '' })
  urgentJobOption: string;

  @ApiPropertyOptional({ default: 'For Internal Purpose' })
  justificationOfPurchase: string;

  @ApiPropertyOptional({ default: new Date() })
  expectedDeliveryLeadTime: Date;

  @ApiPropertyOptional()
  deliveryAddress: string;

  @ApiPropertyOptional()
  deliveryAddressId: number;

  @ApiPropertyOptional()
  sourcingSelection: string;

  @ApiPropertyOptional({ default: 'Manual' })
  deliveryAddressType: string;

  @ApiPropertyOptional()
  warranty: number;

  @ApiProperty({ type: [SupplierDto] })
  recommandedSuppliers: SupplierDto[];

  @ApiPropertyOptional({ default: 'Apple' })
  recommandedNewSupplier: string;

  @ApiPropertyOptional()
  costCenter: number;

  @ApiPropertyOptional()
  currency: number;

  @ApiPropertyOptional({ type: [TeamMemberDto] })
  teamMembers: TeamMemberDto[];

  @ApiPropertyOptional({ type: [SupportingDocumentsDto] })
  supportingDocuments: SupportingDocumentsDto[];

  // @ApiPropertyOptional({ default: 'YES' })
  // equivalentBrandRequired: string;

  // @ApiPropertyOptional({ default: 'HP' })
  // acceptableBrands: string;

  @ApiPropertyOptional()
  previousPurchase: string;

  @ApiPropertyOptional()
  estimateCost: string;

  @ApiPropertyOptional({ type: [BillOfQuantityDto] })
  boq: BillOfQuantityDto[];

  @ApiPropertyOptional({ default: true })
  reminderAlert: boolean;

  @ApiPropertyOptional({ default: 1 })
  reminderInterval: number;

  @ApiPropertyOptional({ default: 1 })
  reminderFrequency: number;

  @ApiPropertyOptional({ default: false })
  notifyMe: boolean;

  @ApiPropertyOptional({ default: SubmitType.NOT_SUBMITED })
  submitStatus: SubmitType;

  @ApiPropertyOptional({ type: [ApprovalLevelDto] })
  levels: ApprovalLevelDto[];

  @ApiPropertyOptional()
  userId: string;

  @ApiPropertyOptional()
  @IsOptional()
  createdById: number;

  @ApiPropertyOptional({ default: 'User 1' })
  created_by: string;

  @ApiPropertyOptional({ default: 'User 1' })
  updated_by: string;

  @ApiPropertyOptional()
  requestor_name: string;

  @ApiPropertyOptional()
  requestor_department: number;

  @ApiPropertyOptional()
  @IsOptional()
  departmentId: number;

  @ApiPropertyOptional()
  template_department: number;

  @ApiPropertyOptional()
  form_department: number;

  @ApiPropertyOptional()
  requestor_email: string;

  @ApiPropertyOptional()
  requestor_phone_number: string;

  @ApiPropertyOptional({ nullable: true })
  final_approval_date: Date;

  @ApiPropertyOptional({ nullable: true })
  gpd_acceptance_date: Date;

  @ApiPropertyOptional({ nullable: true })
  isDraftAS: boolean;
}
