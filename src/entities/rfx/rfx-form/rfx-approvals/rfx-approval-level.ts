import { UserEntity } from 'src/entities/comon/user.entity';
import { RfxFormStatus } from 'src/enum/rfx/rfx-form-status.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxApprovalLevelHistoryEntity } from './rfx-approval-level-history.entity';
import { RfxApprovalEntity } from './rfx-approval.entity';

@Entity()
export class RfxApprovalLevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  levelName: string;

  @Column({ nullable: true })
  levelSequence: number;

  @Column({ default: RfxFormStatus.NOT_SUBMITED })
  levelStatus: RfxFormStatus;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => UserEntity, {
    eager: true,
    cascade:false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  userDetails: UserEntity;

  @ManyToOne(
    () => RfxApprovalEntity,
    (rfxApproval) => rfxApproval.approvalLevels,
    {
      onDelete: 'CASCADE',
      eager: false,
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  @JoinColumn()
  rfxApproval: RfxApprovalEntity;

  @OneToMany(() => RfxApprovalLevelHistoryEntity, (history) => history.level, {
    eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  histories: RfxApprovalLevelHistoryEntity[];
}
