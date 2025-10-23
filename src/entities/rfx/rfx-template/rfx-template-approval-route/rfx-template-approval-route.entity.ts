import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxTemplateApprovalRouteLevelEntity } from './rfx-template-approval-route-level.entity';
import { RfxTemplateEntity } from '../rfx-template.entity';

@Entity()
export class RfxTemplateApprovalRouteEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  enableApprovalReminders: boolean;

  @Column({ nullable: true })
  visible: boolean;

  @Column({ nullable: true })
  hoursPerReminder: number;

  @Column({ nullable: true })
  reminderFrequency: number;

  @Column({ nullable: true })
  notifyOnFinalReminder: boolean;

  @Column({ nullable: true })
  canAddAdditionalApproval: boolean;

  @Column({ nullable: true })
  canAddAdditionalApproval_visible: boolean;

  @Column({ nullable: true })
  canAddAdditionalApproval_readonly: boolean;

  @Column({ nullable: true })
  canAddAdditionalApproval_optional: boolean;

  @Column({ nullable: true })
  canApproveResume: boolean;

  @OneToOne(
    () => RfxTemplateEntity,
    (rfxTemplate) => rfxTemplate.approvalRoute,
    {
      eager: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  @JoinColumn()
  rfxTemplate: RfxTemplateEntity;

  @OneToMany(
    () => RfxTemplateApprovalRouteLevelEntity,
    (approvalRoutelevel) => approvalRoutelevel.rfxTemplateApprovalRoute,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  approvalLevels: RfxTemplateApprovalRouteLevelEntity[];
}
