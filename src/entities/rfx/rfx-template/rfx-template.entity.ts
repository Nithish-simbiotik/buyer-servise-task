import { DepartmentEntity } from 'src/entities/comon/department.entity';
import { UserEntity } from 'src/entities/comon/user.entity';
import { RfxEventType, RfxTemplateStatus } from 'src/enum/rfx/rfx.enum';
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
import { RfxEntity } from '../rfx-form/rfx.entity';
import { RfxTemplateApprovalRouteEntity } from './rfx-template-approval-route/rfx-template-approval-route.entity';
import { RfxTemplateConclusionOwnerEntity } from './rfx-template-conclusion-owner.entity';
import { RfxTemplateEnvelopeEntity } from './rfx-template-envelope/rfx-template-envelope.entity';
import { RfxTemplateQuestionnaireEntity } from './rfx-template-questionnaire/rfx-template-questionnaire.entity';
import { RfxTemplateSourcingProposalRouteEntity } from './rfx-template-sourcing-proposal-route/rfx-template-sourcing-proposal-route.entity';
import { RfxTemplateTeamMemberEntity } from './rfx-template-team-member.entity';
import { RfxTemplateUnmaskOwnerEntity } from './rfx-template-unmask-owner.entity';
import { RfxTemplateUserEntity } from './rfx-template-user.entity';

@Entity()
export class RfxTemplateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  templateName: string;

  @Column({ nullable: true })
  departmentId: number;

  @ManyToOne(() => DepartmentEntity, { eager: true })
  @JoinColumn({ name: 'departmentId' })
  department: DepartmentEntity;

  @Column({ nullable: true })
  eventType: RfxEventType;

  @Column({ nullable: true })
  status: RfxTemplateStatus;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  title_readonly: boolean;

  @Column({ nullable: true })
  supplierCategory: string;

  @Column({ nullable: true })
  supplierCategory_visible: boolean;

  @Column({ nullable: true })
  supplierCategory_readonly: boolean;

  @Column({ nullable: true })
  quotationValidity: string;

  @Column({ nullable: true })
  quotationValidity_readonly: boolean;

  @Column({ nullable: true })
  warranty: string;

  @Column({ nullable: true })
  warranty_visible: boolean;

  @Column({ nullable: true })
  warranty_readonly: boolean;

  @Column({ nullable: true })
  closingDaysCounter: number;

  @Column({ nullable: true })
  closingTime: string;

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

  @Column({ nullable: true })
  canEvaluateConclusion: boolean;

  @OneToMany(
    () => RfxTemplateConclusionOwnerEntity,
    (owner) => owner.rfxTemplate,
    { cascade: true, eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  conclusionOwners: RfxTemplateConclusionOwnerEntity[];

  @Column({ nullable: true })
  selectConclusionOwners_visible: boolean;

  @Column({ nullable: true })
  baseCurrencyId: number;

  @Column({ nullable: true })
  baseCurrency_readonly: boolean;

  @Column({ nullable: true })
  baseCurrency_visible: boolean;

  @Column({ nullable: true })
  decimal_visible: boolean;

  @Column({ nullable: true })
  decimal_readonly: boolean;

  @Column({ nullable: true })
  decimal: number;

  @Column({ nullable: true })
  costCenter_visible: boolean;

  @Column({ nullable: true })
  costCenter_readonly: boolean;

  @Column({ nullable: true })
  costCenterCode: string;

  @Column({ nullable: true })
  purchasingOrgCode: string;

  @Column({ nullable: true })
  purchasingOrg_readonly: boolean;

  @Column({ nullable: true })
  canEditBillOfQuantity: boolean;

  @OneToOne(
    () => RfxTemplateApprovalRouteEntity,
    (approval) => approval.rfxTemplate,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      eager: true,
    },
  )
  approvalRoute: RfxTemplateApprovalRouteEntity;

  @OneToOne(
    () => RfxTemplateSourcingProposalRouteEntity,
    (proposal) => proposal.rfxTemplate,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      eager: true,
    },
  )
  sourcingProposalRoute: RfxTemplateSourcingProposalRouteEntity;

  @OneToMany(
    () => RfxTemplateTeamMemberEntity,
    (member) => member.rfxTemplate,
    {
      cascade: true,
      onDelete: 'CASCADE',
      eager: true,
      onUpdate: 'CASCADE',
    },
  )
  teamMembers: RfxTemplateTeamMemberEntity[];

  @Column({ nullable: true })
  teamMembers_readonly: boolean;

  @OneToMany(() => RfxTemplateUnmaskOwnerEntity, (owner) => owner.rfxTemplate, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    onUpdate: 'CASCADE',
  })
  unmaskOwners: RfxTemplateUnmaskOwnerEntity[];

  @OneToMany(
    () => RfxTemplateEnvelopeEntity,
    (envelope) => envelope.rfxTemplate,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      eager: true,
      cascade: true,
    },
  )
  envelopes: RfxTemplateEnvelopeEntity[];

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt: Date;

  @Column({ nullable: true })
  createdById: number;

  @ManyToOne(() => UserEntity, { eager: true })
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

  @OneToMany(() => RfxEntity, (rfx) => rfx.rfxTemplate)
  rfx: RfxEntity;

  @OneToMany(() => RfxTemplateUserEntity, (member) => member.rfxTemplate, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    onUpdate: 'CASCADE',
  })
  templateUsers: RfxTemplateUserEntity[];

  @OneToMany(
    () => RfxTemplateQuestionnaireEntity,
    (questionnaire) => questionnaire.rfxTemplate,
    {
      cascade: true,
      onDelete: 'CASCADE',
      eager: true,
      onUpdate: 'CASCADE',
    },
  )
  questionnaires: RfxTemplateQuestionnaireEntity[];

  @Column({ nullable: true })
  canSuspendEvent: boolean;

  @Column({ nullable: true })
  suspendedEvent_visible: boolean;

  @Column({ nullable: true })
  suspendedEvent_readonly: boolean;

  @Column({ nullable: true })
  canApproveResume: boolean;

  @Column({ nullable: true })
  canAddAdditionalApproval: boolean;
  @Column({ nullable: true })
  documentId:number

}
