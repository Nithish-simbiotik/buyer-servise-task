import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxTemplateSourcingProposalRouteLevelEntity } from './rfx-template-sourcing-proposal-route-level.entity';
import { RfxTemplateEntity } from '../rfx-template.entity';

@Entity()
export class RfxTemplateSourcingProposalRouteEntity {
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

  @OneToOne(
    () => RfxTemplateEntity,
    (rfxTemplate) => rfxTemplate.sourcingProposalRoute,
    {
      onDelete: 'CASCADE',
      eager: false,
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  @JoinColumn()
  rfxTemplate: RfxTemplateEntity;

  @OneToMany(
    () => RfxTemplateSourcingProposalRouteLevelEntity,
    (sourcingProposalLevel) =>
      sourcingProposalLevel.rfxTemplateSourcingProposalRoute,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  proposalLevels: RfxTemplateSourcingProposalRouteLevelEntity[];
}
