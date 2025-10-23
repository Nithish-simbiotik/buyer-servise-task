import { ActionType } from 'src/enum/rfs/actionType.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PreprCostCenterEntity } from './prepr-cost-center.entity';
import { PreprEntity } from './prepr.entity';

@Entity({ name: 'PREPR_HISTORY' })
export class PreprHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  actionBy: string;

  @Column()
  action: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  actionDate: Date;

  @Column({nullable:true})
  remarks: string;

  @ManyToOne(() => PreprEntity, (rfs) => rfs.history, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'preprId' })
  rfs: PreprEntity;

  @Column({ nullable: true })
  preprId: number;
}
