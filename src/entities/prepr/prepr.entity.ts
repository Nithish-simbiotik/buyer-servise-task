import { ConflictException } from '@nestjs/common';
import { SubmitType } from 'src/enum/rfs/submitType.enum';
import {
  Column,
  ColumnType,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DepartmentEntity } from '../comon/department.entity';
import { UserEntity } from '../comon/user.entity';
import { RfxEntity } from '../rfx/rfx-form/rfx.entity';
import { PreprBillOfQuantityEntity } from './prepr-bill-of-quantity.entity';
import { PreprCostCenterEntity } from './prepr-cost-center.entity';
import { PreprDeliveryAddressEntity } from './prepr-delivery-address.entitty';
import { PreprSupplierEntity } from './prepr-supplier.entity';
import { PreprSupportingDocumentEntity } from './prepr-supporting-documents.entity';
import { PreprWarrantyEntity } from './prepr-warranty.entity';
import { PreprHistoryEntity } from './prepr_history.entity';
import { PrePrLevelsEntity } from './prepr_Level.entity';
import { PreprNotificationsEntity } from './prepr_notifications.entity';
import { PreprNotificationsHistoryEntity } from './prepr_notificationsHistory';
import { PreprPreviousPurchaseEntity } from './prepr_previousPurchase.entity';
import { PreprTeamMemberEntity } from './prepr_TeamMember.entity';

@Entity({ name: 'PREPR' })
export class PreprEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  templateId: number;

  @Column({ nullable: true })
  templateName: string;

  @Column({ nullable: true })
  requestor_name: string;

  departmentId: number;
  @ManyToOne(() => DepartmentEntity, {
    // orphanedRowAction: 'delete',
    eager: true,
  })
  @JoinColumn({ name: 'departmentId' })
  department: DepartmentEntity;

  @Column({ nullable: true })
  requestor_department: number;

  @Column({ nullable: true })
  form_department: number;

  @Column({ nullable: true })
  template_department: number;

  @Column({ nullable: true })
  requestor_email: string;

  @Column({ nullable: true })
  requestor_phone_number: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  purchasingOrg: number;

  @Column({ nullable: true })
  purchasingOrgName: string;

  @Column({ nullable: true })
  internalReferenceNumber: string;

  @Column({ nullable: true })
  urgent_job: boolean;

  @Column({ nullable: true })
  urgentJobOption: string;

  @Column({ nullable: true })
  justificationOfPurchase: string;

  @Column({ type: 'timestamptz', nullable: true })
  expectedDeliveryLeadTime: Date;

  @Column({ nullable: true })
  deliveryAddressType: string;

  @Column({ nullable: true })
  deliveryAddressId: number;

  @Column({ nullable: true })
  deliveryAddress: string;

  @Column({ nullable: true })
  currency: number;

  // @Column()
  // deliveryAddress: string;

  // @OneToOne(() => PreprDeliveryAddressEntity, (da) => da.rfs)
  // deliveryAddress: PreprDeliveryAddressEntity;

  @Column({ nullable: true })
  warranty: number;

  // @OneToOne(() => PreprWarrantyEntity, (w) => w.rfs,{cascade:true})
  // warranty: PreprWarrantyEntity;

  @OneToMany(() => PreprSupplierEntity, (s) => s.rfs)
  recommandedSuppliers: PreprSupplierEntity[];

  @Column({ nullable: true })
  recommandedNewSupplier: string;

  @Column({ nullable: true })
  costCenter: number;

  @Column({ nullable: true })
  sourcingSelection: string;
  // @OneToOne(() => PreprCostCenterEntity, (cc) => cc.rfs,{cascade:true})
  // costCenter: PreprCostCenterEntity;

  @OneToMany(() => PreprSupportingDocumentEntity, (sd) => sd.rfs)
  supportingDocuments: PreprSupportingDocumentEntity[];

  // @Column()
  // equivalentBrandRequired: string;

  // @Column({nullable:true})
  // acceptableBrands: string;

  @Column({ nullable: true })
  estimateCost: string;

  @OneToMany(() => PreprTeamMemberEntity, (tm) => tm.rfs)
  teamMembers: PreprTeamMemberEntity[];

  @Column({ nullable: true })
  previousPurchase: string;
  // @OneToOne(() => PreprPreviousPurchaseEntity, (pp) => pp.rfs,{cascade:true})
  // previousPurchase: PreprPreviousPurchaseEntity;

  @OneToMany(() => PreprBillOfQuantityEntity, (boq) => boq.rfs)
  boq: PreprBillOfQuantityEntity[];

  @Column({ nullable: true, default: true })
  reminderAlert: boolean;

  @Column({ nullable: true })
  reminderInterval: number;

  @Column({ nullable: true })
  reminderFrequency: number;

  @Column({ default: false, nullable: true })
  notifyMe: boolean;

  @Column({ default: SubmitType.NOT_SUBMITED })
  submitStatus: SubmitType;

  @OneToMany(() => PreprHistoryEntity, (history) => history.rfs)
  history: PreprHistoryEntity[];

  @OneToMany(
    () => PreprNotificationsEntity,
    (notifications) => notifications.rfs,
  )
  notifications: PreprNotificationsEntity[];

  @OneToMany(
    () => PreprNotificationsHistoryEntity,
    (notificationsHistory) => notificationsHistory.rfs,
  )
  notificationsHistory: PreprNotificationsHistoryEntity[];

  @OneToMany(() => PrePrLevelsEntity, (tm) => tm.rfs)
  levels: PrePrLevelsEntity[];

  @Column()
  userId: string;

  @Column({ nullable: true })
  createdById: number;

  @JoinColumn({ name: 'createdById' })
  creator: UserEntity;

  @Column({ nullable: true })
  created_by: string;

  @Column({ nullable: true })
  updated_by: string;

  @CreateDateColumn({ 
    type: 'timestamptz',
  })
  created_At: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updated_At: Date;

  @Column({
    nullable: true,
  })
  final_approval_date: Date;

  @Column({
    nullable: true,
  })
  gpd_acceptance_date: Date;

  @OneToMany(() => RfxEntity, (rfx) => rfx.prePr, { onDelete: 'SET NULL' })
  rfxs: RfxEntity[];
}
