import { PrType } from 'src/enum/prTemplate/prTemplates.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrTemplateEntity } from '../prTemplates.entity';
import { PRTemplateApprovalLevelEntity } from './prTemplateApprovalLevel.entity';

@Entity({ name: 'PRTEMPLATE_APPROVER' })
export class PrTemplateApprovalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  enableApprovalReminder: boolean;

  @Column({ nullable: true })
  enableForALlApprovalLevelsVisible: boolean;

  @Column({ nullable: true })
  reminderEmailSentHours: number;

  @Column({ nullable: true })
  maximumNumbersOfEmailReminder: number;

  @Column({ nullable: true })
  notifyRequestOwnerReminder: boolean;

  @Column({ nullable: true })
  allowToAddAdditionalApproval: boolean;

  @Column({ nullable: true })
  allowToAddAdditionalApprovalReadOnly: boolean;

  @Column({ nullable: true })
  allowToAddAdditionalApprovalVisible: boolean;

  @Column({ nullable: true })
  allowToAddAdditionalApprovalOptional: boolean;

  @Column({ nullable: true })
  minApprovalLimit: number;

  @Column({ nullable: true })
  allowToEscalate: boolean;

  @Column({ nullable: true })
  allowToEditPR: boolean;

  @OneToOne(() => PrTemplateEntity, (prTemplate) => prTemplate.approvalRoute, {
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  prTemplate: PrTemplateEntity;

  @OneToMany(
    () => PRTemplateApprovalLevelEntity,
    (approvalRoutelevel) => approvalRoutelevel.PrTemplateApprovalRoute,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  approvalLevels: PRTemplateApprovalLevelEntity[];
}
