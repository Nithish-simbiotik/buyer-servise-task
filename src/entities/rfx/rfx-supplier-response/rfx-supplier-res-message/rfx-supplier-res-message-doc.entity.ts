import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RfxSupplierResponseMessageEntity } from './rfx-supplier-res-message.entity';

@Entity()
export class RfxSupplierResponseMessageSupportingDocumentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  originalname: string;

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ nullable: true })
  availabitly: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(
    () => RfxSupplierResponseMessageEntity,
    (message) => message.supportingDocuments,
    {
      onDelete: 'CASCADE',
      eager: false,
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  message: RfxSupplierResponseMessageEntity;
}
