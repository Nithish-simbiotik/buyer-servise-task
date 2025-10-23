import { BUYER_RESPONSE_STATUS } from 'src/enum/rfx/meeting-status.enum';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxMeetingEntity } from '../rfx-form/rfx-meeting.entity';
import { RfxSupplierResponseEntity } from './rfx-supplier-res.entity';

@Entity()
export class RfxSupplierResponseMeetingAttendeeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  rfxMeetingId: number;

  @ManyToOne(() => RfxMeetingEntity, { eager: true })
  @JoinColumn({ name: 'rfxMeetingId' })
  rfxMeeting: RfxMeetingEntity;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: number;

  @Column({ nullable: true })
  didTheyAttend: boolean;

  @Column({ nullable: true })
  buyerResponseStatus: BUYER_RESPONSE_STATUS;

  @ManyToOne(
    () => RfxSupplierResponseEntity,
    (response) => response.meetingAttendees,
  )
  @JoinColumn()
  supplierResponse: RfxSupplierResponseEntity;
}
