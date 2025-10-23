import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxEntity } from '../rfx.entity';
import { RfxApprovalLevelEntity } from './rfx-approval-level';

@Entity()
export class RfxApprovalEntity {
  @PrimaryGeneratedColumn()
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

  @OneToMany(
    () => RfxApprovalLevelEntity,
    (approvalLevel) => approvalLevel.rfxApproval,
    {
      eager: true,
      cascade: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  approvalLevels: RfxApprovalLevelEntity[];

  @Column({ nullable: true, default: 1 })
  activeLevelSequence: number;

  @OneToOne(() => RfxEntity, (rfx) => rfx.approvalRoute, {
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  rfx: RfxEntity;
}
