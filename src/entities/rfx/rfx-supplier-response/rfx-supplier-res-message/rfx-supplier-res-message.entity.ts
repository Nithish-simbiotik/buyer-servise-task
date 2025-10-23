import { SupplierEntity } from 'src/entities/supplier/supplier.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/entities/comon/user.entity';
import { RfxSupplierResponseEntity } from '../rfx-supplier-res.entity';
import { RfxSupplierResponseMessageSupportingDocumentEntity } from './rfx-supplier-res-message-doc.entity';

@Entity()
export class RfxSupplierResponseMessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fromSupplierId: number;

  @ManyToOne(() => SupplierEntity, { eager: true })
  @JoinColumn({ name: 'fromSupplierId' })
  supplier: SupplierEntity;

  @Column({ nullable: true })
  toBuyerId: number;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'toBuyerId' })
  buyer: UserEntity;

  @Column({ nullable: true })
  subject: string;

  @Column({ nullable: true })
  content: string;

  @OneToMany(
    () => RfxSupplierResponseMessageSupportingDocumentEntity,
    (doc) => doc.message,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  supportingDocuments: RfxSupplierResponseMessageSupportingDocumentEntity[];

  @ManyToOne(() => RfxSupplierResponseEntity, (response) => response.messages, {
    onDelete: 'CASCADE',
    eager: false,
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  supplierResponse: RfxSupplierResponseEntity;
}
