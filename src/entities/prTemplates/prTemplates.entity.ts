import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  PrType,
  PrTemplateStatus,
  DeliveryType,
} from 'src/enum/prTemplate/prTemplates.enum';
import { UserEntity } from '../comon/user.entity';
import { DepartmentEntity } from '../comon/department.entity';
import { PrTemplateTeamMembersEntity } from './prTemplateTeamMembers.entity';
import { PrTemplateApprovalEntity } from './prTemplateApprovalRoute/prTemplateApproval.entity';
import { PrECAPEXTemplateApprovalEntity } from './prTemplateECAPEXApprovalRoute/prTemplateECAPEXApproval.entity';
import { PrTemplateUserEntity } from './prTemplateUser.entity';
import { CostCenterEntity } from '../masterData/costCentre.entity';
import { DecimalEntity } from '../masterData/decimal.entity';
import { PurchaseOrgEntity } from '../masterData/purchaseOrg.entity';
import { CurrencyEntity } from '../masterData/currency.entity';
import { DeliveryAddressEntity } from '../masterData/delivery-address.entity';

@Entity({ name: 'PRTEMPLATE' })
export class PrTemplateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  templateName: string;

  @Column({ nullable: true })
  departmentId: number;

  @ManyToOne(() => DepartmentEntity, { eager: true, cascade: true })
  @JoinColumn({ name: 'departmentId' })
  department: DepartmentEntity;

  @Column({ nullable: true })
  prStatus: PrTemplateStatus;

  @Column({ nullable: true })
  prType: PrType; //enum    ( "CAPEX", "OPEX")

  //?General Information
  @Column({ nullable: true })
  enableCAPExPRWorkflow: boolean;

  @Column({ nullable: true })
  reasonForExpenditure: boolean;

  @Column({ nullable: true })
  prName: string;

  @Column({ nullable: true })
  prNameReadOnly: boolean;

  @Column({ nullable: true })
  deliveryAddressId: number;

  @Column({ nullable: true })
  customDeliveryAddress: string;

  @Column({ nullable: true })
  deliveryAddressType: DeliveryType;

  // @ManyToOne(() => DeliveryAddressEntity, { eager: true , cascade: true })
  // @JoinColumn({ name: 'deliveryAddressId' })
  // baseCurrency: DeliveryAddressEntity;

  //?Bill OF Quantity Control
  @Column({ nullable: true })
  allowToEditOfBillQuantity: boolean;

  //?Finance
  @Column({ nullable: true })
  baseCurrencyId: number; // join with Master Data

  // @ManyToOne(() => CurrencyEntity, { eager: true , cascade: true })
  // @JoinColumn({ name: 'baseCurrencyId' })
  // baseCurrency: CurrencyEntity;

  @Column({ nullable: true })
  baseCurrencyReadOnly: boolean;

  @Column({ nullable: true })
  decimalId: number; // join with Master Data

  // @ManyToOne(() => DecimalEntity, { eager: true , cascade: true })
  // @JoinColumn({ name: 'decimalId' })
  // decimal: DecimalEntity;

  @Column({ nullable: true })
  decimalReadOnly: boolean;

  @Column({ nullable: true })
  costCenterId: number; // join with Master Data

  // @ManyToOne(() => CostCenterEntity, { eager: true ,cascade: true })
  // @JoinColumn({ name: 'costCenterId' })
  // costCentre: CostCenterEntity;

  @Column({ nullable: true })
  costCenterReadOnly: boolean;

  @Column({ nullable: true })
  costCenterVisible: boolean;

  @Column({ nullable: true })
  purchaseOrgId: number; // join with Master Data

  // @ManyToOne(() => PurchaseOrgEntity, { eager: true ,cascade: true })
  // @JoinColumn({ name: 'purchaseOrgId' })
  // purchaseOrg: PurchaseOrgEntity;

  @Column({ nullable: true })
  purchaseOrgReadOnly: boolean;

  @Column({ nullable: true })
  availableBudgetId: number; // join with Master Data

  //need budget id from master data entity

  @Column({ nullable: true })
  availableBudgetVisible: boolean;

  @Column({ nullable: true })
  availableBudgetReadOnly: boolean;

  @Column({ nullable: true })
  availableBudgetOptional: boolean;

  @Column({ nullable: true })
  enableBudgetLocking: boolean;

  //?Team Members
  @OneToMany(() => PrTemplateTeamMembersEntity, (tm) => tm.prTemplate, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    onUpdate: 'CASCADE',
  })
  teamMembers: PrTemplateTeamMembersEntity[];

  @Column({ nullable: true })
  teamMemberReadOnly: boolean;

  @OneToOne(() => PrTemplateApprovalEntity, (approval) => approval.prTemplate, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  approvalRoute: PrTemplateApprovalEntity;

  @OneToOne(
    () => PrECAPEXTemplateApprovalEntity,
    (approval) => approval.prTemplate,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      eager: true,
    },
  )
  ECAPEXApprovalRoute: PrECAPEXTemplateApprovalEntity;

  //?Template User
  @OneToMany(() => PrTemplateUserEntity, (au) => au.prTemplate, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    onUpdate: 'CASCADE',
  })
  templateUsers: PrTemplateUserEntity[];

  @Column({ nullable: true })
  templateUsersReadOnly: boolean;

  @Column({ nullable: true })
  templateUsersControl: boolean;

  @Column({ nullable: true })
  createdById: number;

  @ManyToOne(() => UserEntity, { eager: true, cascade: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: UserEntity;

  @Column({ nullable: true })
  updatedById: number;

  @ManyToOne(() => UserEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'updatedById' })
  updatedBy: UserEntity;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true, default: null })
  updatedAt: Date;
}
