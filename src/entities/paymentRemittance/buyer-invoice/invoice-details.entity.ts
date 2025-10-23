import { ConfigModule } from '@nestjs/config';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentRemittanceEntity } from './payment-remittance.entity';

@Entity()
export class InvoiceDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  invoiceNumber: string;

  @Column({ nullable: true })
  invoiceDate: Date;

  @Column({ nullable: true })
  invoiceAmount: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => PaymentRemittanceEntity, (pr) => pr.invoiceDetails)
  pr: PaymentRemittanceEntity;
}
