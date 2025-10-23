import { ExpenditureReason } from "src/enum/pr/expenditure-reason.enum";
import { PrStatus } from "src/enum/pr/pr-status.enum";
import { PrType } from "src/enum/prTemplate/prTemplates.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PrApprovalRouteEntity } from "./pr-approval-route.entity";
import { PrECAPEXApprovalRouteEntity } from "./pr-capex-approval.entity";
import { PrEXCODocumentEntity } from "./pr-exco-document.entity";
import { PrJustificationDocumentEntity } from "./pr-justification-document.entity";
import { PrOtherDocumentEntity } from "./pr-other-document.entity";
import { PRSupplierEntity } from "./pr_supplier.entity";
import { PRTeamMemberEntity } from "./pr_teamMembers.entity";
import { UserEntity } from 'src/entities/comon/user.entity';
import { CheckList } from "src/enum/pr/checklist-selection.enum";

@Entity({ name: 'PR' })
export class PREntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parentPRId: number;

  @Column()
  prTemplateId: number; // from PR template

  @Column()
  prType: PrType;

  @Column()
  rfxId: number; // from RFx

  @Column()
  preprId: number; // from RFx

  @Column()
  referenceNumber: string; // from RFx

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  reasonForExpenditure: ExpenditureReason;

  @Column({ nullable: true })
  reason: string;

  @Column({ nullable: true })
  enableBudgetLocking: boolean; // from PR template

  @Column({ nullable: true })
  baseCurrency: string; // from RFx

  @Column({ nullable: true })
  costCenter: string; // from RFx

  @Column({ nullable: true })
  purchasingOrg: number; // from RFx

  @Column({ nullable: true })
  plant: string; // based on purchasingOrg

  @Column({ nullable: true })
  budgetRefCode: string;

  @Column({ nullable: true })
  fadNumber: string;

  @OneToMany(
    () => PrJustificationDocumentEntity,
    (doc) => doc.pr,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  justificationDocuments: PrJustificationDocumentEntity[];

  @Column({ nullable: true })
  excoMinutesData: Date;

  @OneToMany(
    () => PrEXCODocumentEntity,
    (doc) => doc.pr,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  excoDocument: PrEXCODocumentEntity[];

  @OneToMany(
    () => PrOtherDocumentEntity,
    (doc) => doc.pr,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  otherDocument: PrOtherDocumentEntity[];

  @OneToMany(
    () => PRTeamMemberEntity,
    (tm) => tm.pr
  )
  teamMembers: PRTeamMemberEntity[];

  @Column()
  prStatus: PrStatus; //enum

  @Column({ nullable: true })
  baseCurrencyReadOnly: boolean; // from RFx

  @Column({ nullable: true })
  baseCurrencyViewOnly: boolean; // from PR

  @Column({ nullable: true })
  costCenterReadOnly: boolean; // from PR

  @Column({ nullable: true })
  costCenterVisible: boolean; // from PR

  @Column({ nullable: true })
  purchaseOrgReadOnly: boolean; // from PR

  @Column({ nullable: true })
  availableBudgetVisible: boolean; // from PR

  @Column({ nullable: true })
  availableBudgetReadOnly: boolean; // from PR

  @Column({ nullable: true })
  createdBy: number;

  @Column({ nullable: true })
  updatedBy: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_At: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_At: Date;

  @Column({ nullable: true })
  urgentJob: boolean; // from RFx

  @Column({ nullable: true })
  urgentJobOption: string; // from RFx

  @OneToMany(
    () => PrApprovalRouteEntity,
    (doc) => doc.pr,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  approvalRoute: PrApprovalRouteEntity[];

  @Column({ nullable: true })
  prApprovedDate: Date;

  @OneToMany(
    () => PrECAPEXApprovalRouteEntity,
    (doc) => doc.pr,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  ecapexApprovalRoute: PrECAPEXApprovalRouteEntity[];

  @OneToMany(
    () => PRSupplierEntity,
    (doc) => doc.pr,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  rfxSupplier: PRSupplierEntity[];

  @Column({ nullable: true })
  checkListSelection: CheckList;

  @Column({ nullable: true })
  ageOfEquipment: number;

  @Column({ nullable: true })
  numberOfRepair: number;

  @Column({ nullable: true })
  DANSReportNo: string;

  @Column({ nullable: true })
  supplier: string;

  @Column({ nullable: true })
  newUnitPrice: number;

  @Column({ nullable: true })
  caprRefNo: string;

  @Column({ nullable: true })
  msdsRefNo: string;

  @Column({ nullable: true })
  glCode: string;

  @Column({ nullable: true })
  accountAssignment: string;

  @Column({ nullable: true })
  deliveryDate: Date;

  @Column({ nullable: true })
  receiverPhoneNumber: string;

  @Column({ nullable: true })
  receiverName: string;

  @Column({ nullable: true })
  receivingLocation: string;

  @Column({ nullable: true })
  receiverDepartment: string;

  @Column({ nullable: true })
  isDeliveryAddressManual: boolean;

  @Column({ nullable: true })
  deliveryAddress: string;

  @ManyToOne(() => UserEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'createdBy' })
  creator: UserEntity;
}