import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PreprEntity } from './prepr.entity';

@Entity({ name: 'PREPR_PREVIOUS_PURCHASE' })
export class PreprPreviousPurchaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  previousRequest: string;

  @OneToOne(() => PreprEntity, (rfs) => rfs.previousPurchase, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'preprId' })
  rfs: PreprEntity;

  @Column({ nullable: true })
  preprId: number;
}
