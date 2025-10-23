import { UserEntity } from 'src/entities/comon/user.entity';
import {
  RfxApprovalAction,
  RfxFormStatus,
} from 'src/enum/rfx/rfx-form-status.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RfxApprovalLevelEntity } from './rfx-approval-level';

@Entity()
export class RfxApprovalLevelHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  rfxId: number;

  @Column({ nullable: true })
  actionTakenById: number;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'actionTakenById' })
  actionTakenBy: UserEntity;

  @Column({ nullable: true })
  action: RfxApprovalAction;

  @UpdateDateColumn({ type: 'timestamptz' })
  actionDate: Date;

  @Column({ default: RfxFormStatus.NOT_SUBMITED })
  levelStatus: RfxFormStatus;

  @Column({ nullable: true })
  remark: string;

  @ManyToOne(() => RfxApprovalLevelEntity, (level) => level.histories)
  level: RfxApprovalLevelEntity;
}

export interface ApprovalLevelHistory {
  actionTakenById: number;
  action: string;
  levelStatus: RfxFormStatus;
  remark: string;
}
