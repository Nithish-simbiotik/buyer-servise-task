import { DepartmentEntity } from 'src/entities/comon/department.entity';
import { UserEntity } from 'src/entities/comon/user.entity';
import { SupportingDocumentEntity } from 'src/entities/documents/supporting-documents.entity';
import { PreprEntity } from 'src/entities/prepr/prepr.entity';
import { SubmitType } from 'src/enum/rfs/submitType.enum';
import { RfxFormStatus } from 'src/enum/rfx/rfx-form-status.enum';
import {
  BaseEntity,
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
import { RfxTemplateEntity } from '../rfx-template/rfx-template.entity';
import { RfxApprovalEntity } from './rfx-approvals/rfx-approval.entity';
import { RfxBillOfQuantityEntity } from './rfx-billofquantity.entity';
import { RfxEnvelopeEntity } from './rfx-envelope.entity';
import { RfxFormQuestionnairEntity } from './rfx-form-questionnair.entity';
import { RfxMeetingEntity } from './rfx-meeting.entity';
import { RfxSourcingProposalEntity } from './rfx-proposal-approval/rfx-proposal-approval.entity';
import { RfxRequestorEntity } from './rfx-requestor.entity';
import { RfxSupplierEntity } from './rfx-supplier.entity';
import { RfxSupportingDocumentEntity } from './rfx-supporting-document';
import { RfxTeamMemberEntity } from './rfx-team-member.entity';
import { RfxUnmaskOwnerEntity } from './rfx-unmask-owners.entity';

@Entity()
export class RfxEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // new keys by aman ->
  @Column({ nullable: true })
  eventType: string;
  //   1. carry forwarded from pre-pr:.
  @Column({ nullable: true })
  urgentJob: boolean;
  //   1. carry forwarded from pre-pr:.

  @Column({ nullable: true })
  urgentJobOption: string;
  //   1. carry forwarded from pre-pr:.

  @Column({ nullable: true })
  internalReferenceNumber: string;
  //   1. carry forwarded from pre-pr:.

  @Column({ nullable: true })
  justificationOfPurchase: string;
  //   1. carry forwarded from pre-pr:.

  @Column({ nullable: true })
  title: string;
  //new
  @Column({ type: 'timestamptz', nullable: true })
  closingDate: Date;
  //   1. carry forwarded from pre-pr:.

  @Column({ type: 'timestamptz', nullable: true })
  expectedDeliveryLeadTime: Date;
  //   1. carry forwarded from pre-pr:.

  @Column({ nullable: true, type: 'text' })
  deliveryAddress: string;
  //   1. carry forwarded from pre-pr:.

  @Column({ nullable: true })
  warranty: string;
  //   1. carry forwarded from pre-pr:.

  @Column({ nullable: true })
  previousPurchase: string;
  //   1. carry forwarded from pre-pr:.

  @Column({ nullable: true })
  estimateCost: string;
  //   1. carry forwarded from pre-pr:.

  @Column({ nullable: true })
  costCenterCode: string;

  // @OneToOne(() => RfxRequestorEntity, (requestor) => requestor.rfx)
  // requestor: RfxRequestorEntity;
  //   1. carry forwarded from pre-pr:.

  @OneToMany(() => RfxRequestorEntity, (requestor) => requestor.rfx, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  requestor: RfxRequestorEntity[];

  //   1. carry forwarded from pre-pr:.

  @Column({ nullable: true })
  currency: number;
  //   1. carry forwarded from pre-pr:.

  @Column({ nullable: true })
  purchasingOrg: number;
  //  will remove column
  @Column({ nullable: true })
  purchasingOrgCode: string;

  //  2. carry forwarded from rfx-template:
  @Column({ nullable: true })
  quotationValidity: number;
  //from template
  @OneToMany(() => RfxEnvelopeEntity, (envelope) => envelope.rfx, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    cascade: true,
  })
  envelopes: RfxEnvelopeEntity[];
  // addEnvelop(envelop: RfxEnvelopeEntity) {
  //   if (this.envelopes == null) {
  //     this.envelopes = Array<RfxEnvelopeEntity>();
  //   }
  //   this.envelopes.push(envelop);
  // }
  @OneToOne(() => RfxSupplierEntity,(supplier)=>supplier.rfx,{
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  // @JoinColumn()
  supplier: RfxSupplierEntity;
  //rfx template
  @OneToMany(() => RfxTeamMemberEntity, (tm) => tm.rfx, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    onUpdate: 'CASCADE',
  })
  teamMembers: RfxTeamMemberEntity[];
  //new key
  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  referenceNumber: string;
  @Column({ nullable: true })
  preprId: number;
  @ManyToOne(() => PreprEntity, { eager: true })
  @JoinColumn({ name: 'preprId' })
  prePr: PreprEntity;
  @Column({ nullable: true })
  rfxTemplateId: number;
  @ManyToOne(() => RfxTemplateEntity, (rfxTemplate) => rfxTemplate.rfx, {
    // orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'rfxTemplateId' })
  rfxTemplate: RfxTemplateEntity;
  //  2. carry forwarded from rfx:

  @Column({ nullable: true })
  baseCurrency: string;
  //
  @OneToMany(() => RfxMeetingEntity, (meeting) => meeting.rfx, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  meeting: RfxMeetingEntity[];
  //from template
  @OneToMany(
    () => RfxFormQuestionnairEntity,
    (questionair) => questionair.rfx,
    { cascade: true, eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  questionnaire: RfxFormQuestionnairEntity[];
  //rfx templte
  @OneToOne(() => RfxApprovalEntity, (approval) => approval.rfx, {
    cascade: true,
    eager: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  approvalRoute: RfxApprovalEntity;
  //rfx template
  @OneToOne(() => RfxSourcingProposalEntity, (approval) => approval.rfx, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  sourcingProposalRoute: RfxSourcingProposalEntity;
  //FROM PPR
  @OneToMany(() => RfxBillOfQuantityEntity, (boq) => boq.rfx, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  boq: RfxBillOfQuantityEntity[];
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ nullable: true })
  eventStartDate: Date;
  // additional from rfx template
  //##########################################
  @Column({ nullable: true })
  enableSupplierNameMaskingForEvaluation: boolean;

  @Column({ nullable: true })
  selectUnmaskOwners_visible: boolean;

  @Column({ nullable: true })
  canCloseEnvelope: boolean;

  @Column({ nullable: true })
  canCloseEnvelope_visible: boolean;

  @Column({ nullable: true })
  canAddSupplier: boolean;

  @Column({ nullable: true })
  canAddSupplier_visible: boolean;

  @Column({ nullable: true })
  enableSupplierTnC: boolean;

  @Column({ nullable: true })
  supplierTnCDeclarationId: number;

  @Column({ nullable: true })
  supplierTnC_visible: boolean;

  @Column({ nullable: true })
  supplierTnC_readonly: boolean;

  @Column({ default: RfxFormStatus.NOT_SUBMITED, nullable: true })
  status: RfxFormStatus;

  @Column({ default: RfxFormStatus.NOT_SUBMITED, nullable: true })
  sourcingProposalStatus: RfxFormStatus;

  @OneToMany(
    () => RfxSupportingDocumentEntity,
    (supportDoc) => supportDoc.rfx,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  supportingDocuments: RfxSupportingDocumentEntity[];
  @OneToMany(
    () => RfxUnmaskOwnerEntity,
    (unmaskOwner) => unmaskOwner.rfx,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  unmaskOwners: RfxUnmaskOwnerEntity[]
  @Column({ default: false, nullable: true })
  isDocumentRequired: boolean;
  @Column({ default: false, nullable: true })

  costCenter_visible: boolean
  @Column({ default: false, nullable: true })

  costCenter_readonly: boolean
  @Column({ default: false, nullable: true })

  baseCurrency_readonly: boolean
  @Column({ default: false, nullable: true })

  baseCurrency_visible: boolean
  @Column({ default: false, nullable: true })

  title_readonly: boolean
  @Column({ default: false, nullable: true })

  purchasingOrg_readonly: boolean
  @Column({ default: false, nullable: true })

  isMeetingRequired: boolean
  @Column({ default: false, nullable: true })

  isQuestionnaireRequired: boolean
  @Column({ nullable: true })

  departmentId: number;
  @ManyToOne(() => DepartmentEntity, {
    // orphanedRowAction: 'delete',
    eager: true,
  })
  @JoinColumn({ name: 'departmentId' })
  department: DepartmentEntity;
  @Column({ nullable: true })
  createdById: number;
  @Column({ nullable: true, default: false })
  canSuspendEvent: boolean;
  @Column({ nullable: true })
  suspendedEvent_visible: boolean;
  @Column({ nullable: true })
  canEvaluateConclusion: boolean;
  @Column({ nullable: true })

  selectConclusionOwners_visible: boolean;
  @ManyToOne(() => UserEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'createdById' })
  creator: UserEntity;
  @Column({ nullable: true })
  canEditBillOfQuantity:boolean;
  @Column({ nullable: true ,type:'varchar'})
  addressType:string;
  @Column({ nullable: true} )
  documentId:number;
  @ManyToOne(() => SupportingDocumentEntity, {
    cascade: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'documentId' })
  termsAndConditionDoc: SupportingDocumentEntity;

}
