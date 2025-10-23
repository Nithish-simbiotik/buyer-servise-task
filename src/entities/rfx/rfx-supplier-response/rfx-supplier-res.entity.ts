import { SupplierEntity } from 'src/entities/supplier/supplier.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { RfxSupplierResponseMeetingAttendeeEntity } from './rfx-supplier-res-meeting-attendee.entity';
import { RfxSupplierResponseAnswerEntity } from './rfx-supplier-res-answer.entity';
import { RfxSupplierResponseSupportingDocumentEntity } from './rfx-supplier-res-doc.entity';
import { RfxSupplierResponseMessageEntity } from './rfx-supplier-res-message/rfx-supplier-res-message.entity';
import { RfxSupplierResponseBoqEntity } from './rfx-supplier-res-boq/rfx-supplier-res-boq.entity';
import { RfxEntity } from '../rfx-form/rfx.entity';

@Entity()
export class RfxSupplierResponseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  supplierId: number;

  @Column({ nullable: true })
  rfxSupplierId: number;

  @Column({ nullable: true })
  rfxId: number;

  @ManyToOne(() => RfxEntity, { eager: false })
  @JoinColumn({ name: 'rfxId' })
  rfx: RfxEntity;

  @ManyToOne(() => SupplierEntity, { eager: true })
  @JoinColumn({ name: 'supplierId' })
  supplier: SupplierEntity;

  @OneToMany(
    () => RfxSupplierResponseAnswerEntity,
    (answer) => answer.supplierResponse,
    {
      cascade: true,
      onDelete: 'CASCADE',
      eager: true,
      onUpdate: 'CASCADE',
    },
  )
  answers: RfxSupplierResponseAnswerEntity[];

  @OneToMany(
    () => RfxSupplierResponseMessageEntity,
    (message) => message.supplierResponse,
    {
      cascade: true,
      onDelete: 'CASCADE',
      eager: true,
      onUpdate: 'CASCADE',
    },
  )
  messages: RfxSupplierResponseMessageEntity[];

  @OneToOne(
    () => RfxSupplierResponseBoqEntity,
    (bill) => bill.supplierResponse,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      eager: true,
    },
  )
  billOfQuantity: RfxSupplierResponseBoqEntity;

  @OneToMany(
    () => RfxSupplierResponseMeetingAttendeeEntity,
    (attendee) => attendee.supplierResponse,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  meetingAttendees: RfxSupplierResponseMeetingAttendeeEntity[];

  @OneToMany(
    () => RfxSupplierResponseSupportingDocumentEntity,
    (doc) => doc.supplierResponse,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  supportingDocuments: RfxSupplierResponseSupportingDocumentEntity[];
}
