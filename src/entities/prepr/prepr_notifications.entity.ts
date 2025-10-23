import { SubmitType } from 'src/enum/rfs/submitType.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { PreprCostCenterEntity } from './prepr-cost-center.entity';
import { PreprEntity } from './prepr.entity';

@Entity({ name: 'PREPR_NOTIFICATIONS' })
export class PreprNotificationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  level: number;

  @Column({ nullable: true })
  reminderInterval: number;

  @Column({ nullable: true })
  reminderFrequency: number;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  created_At: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updated_At: Date;

  @Column({ default: SubmitType.NOT_SUBMITED })
  status: SubmitType;

  @Column({ nullable: true })
  totalLevels: number;

  @Column({ nullable: true })
  userRole: string;

  @Column({ nullable: true })
  departmentId: number;

  @ManyToOne(() => PreprEntity, (rfs) => rfs.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'preprId' })
  rfs: PreprEntity;

  @Column({ nullable: true })
  preprId: number;

  @Column({ nullable: true })
  remark: string;
}
