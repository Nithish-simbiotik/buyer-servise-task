import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrTemplateEntity } from '../prTemplates.entity';
import { PReCAPEXTemplateApprovalLevelEntity } from './prTemplateECAPEXApprovalLevel.entity';

@Entity({ name: 'PRTEMPLATE_ECAPEX_APPROVER' })
export class PrECAPEXTemplateApprovalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  //?ECAPEX
  @Column({ nullable: true })
  enableApprovalReminderECAPEX: boolean;

  @Column({ nullable: true })
  enableForALlApprovalLevelsVisibleECAPEX: boolean;

  @Column({ nullable: true })
  reminderEmailSentHoursECAPEX: number;

  @Column({ nullable: true })
  maximumNumbersOfEmailReminderECAPEX: number;

  @Column({ nullable: true })
  notifyRequestOwnerReminderECAPEX: boolean;

  @Column({ nullable: true })
  allowToAddAdditionalApprovalECAPEX: boolean;

  @Column({ nullable: true })
  allowToAddAdditionalApprovalReadOnlyECAPEX: boolean;

  @Column({ nullable: true })
  allowToAddAdditionalApprovalVisibleECAPEX: boolean;

  @Column({ nullable: true })
  allowToAddAdditionalApprovalOptionalECAPEX: boolean;

  @OneToOne(
    () => PrTemplateEntity,
    (prTemplate) => prTemplate.ECAPEXApprovalRoute,
    {
      eager: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  @JoinColumn()
  prTemplate: PrTemplateEntity;

  @Column({ nullable: true })
  maxApprovalLimitECAPEX: number;

  @Column({ nullable: true })
  allowToEscalateECAPEX: boolean;

  @Column({ nullable: true })
  allowToEditPRECAPEX: boolean;

  @OneToMany(
    () => PReCAPEXTemplateApprovalLevelEntity,
    (approvalRoutelevel) => approvalRoutelevel.PrECAPEXTemplateApprovalRoute,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  approvalLevelsECAPEX: PReCAPEXTemplateApprovalLevelEntity[];
}
