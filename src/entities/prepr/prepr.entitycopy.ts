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
import { RfxEntity } from '../rfx/rfx-form/rfx.entity';
import { PreprBillOfQuantityEntity } from './prepr-bill-of-quantity.entity';
import { PreprBillOfQuantityCopyEntity } from './prepr-bill-of-quantity.entityCopy';
import { PreprCostCenterEntity } from './prepr-cost-center.entity';
import { PreprDeliveryAddressEntity } from './prepr-delivery-address.entitty';
import { PreprSupplierEntity } from './prepr-supplier.entity';
import { PreprSupplierCopyEntity } from './prepr-supplier.entitycopy';
import { PreprSupportingDocumentEntity } from './prepr-supporting-documents.entity';
import { PreprWarrantyEntity } from './prepr-warranty.entity';
import { PreprHistoryEntity } from './prepr_history.entity';
import { PrePrLevelsEntity } from './prepr_Level.entity';
import { PrePrLevelsCopyEntity } from './prepr_Level.entitycopy';
import { PreprNotificationsEntity } from './prepr_notifications.entity';
import { PreprNotificationsHistoryEntity } from './prepr_notificationsHistory';
import { PreprPreviousPurchaseEntity } from './prepr_previousPurchase.entity';
import { PreprTeamMemberEntity } from './prepr_TeamMember.entity';
import { PreprTeamMemberCopyEntity } from './prepr_TeamMember.entitycopy';

@Entity({ name: 'PREPR_COPY' })
export class PreprCopyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  preprId: number;

  // @Column()
  // templateId: number;

  @Column({ nullable: true })
  templateName: string;

  @Column({ nullable: true })
  requestor_name: string;

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

  @Column({ nullable: true })
  warranty: number;

  @OneToMany(() => PreprSupplierCopyEntity, (s) => s.rfs)
  recommandedSuppliers: PreprSupplierCopyEntity[];

  @Column({ nullable: true })
  recommandedNewSupplier: string;

  @Column({ nullable: true })
  costCenter: number;

  @Column({ nullable: true })
  sourcingSelection: string;

  @OneToMany(() => PreprSupportingDocumentEntity, (sd) => sd.rfs)
  supportingDocuments: PreprSupportingDocumentEntity[];

  @Column({ nullable: true })
  estimateCost: string;

  @OneToMany(() => PreprTeamMemberCopyEntity, (tm) => tm.rfs)
  teamMembers: PreprTeamMemberCopyEntity[];

  @Column({ nullable: true })
  previousPurchase: string;

  @OneToMany(() => PreprBillOfQuantityCopyEntity, (boq) => boq.rfs)
  boq: PreprBillOfQuantityCopyEntity[];

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

  @OneToMany(() => PrePrLevelsCopyEntity, (tm) => tm.rfs)
  levels: PrePrLevelsCopyEntity[];

  @Column()
  userId: string;

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

  @Column({ nullable: true, default: true })
  firstTimeCheck: boolean;
}
