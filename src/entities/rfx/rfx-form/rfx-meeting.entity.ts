import { MettingStatus } from 'src/enum/rfx/meeting-status.enum';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxMeetingAttendeeEntity } from './rfx-meeting-attendee.entity';
import { RfxMeeingContactPersonsEntity } from './rfx-meeting-contact-person.entity';
import { RfxMeetingRemindersEntity } from './rfx-meeting-reminders.entity';
import { RfxEntity } from './rfx.entity';

@Entity()
export class RfxMeetingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  isMeetingRequired: boolean;

  @Column({ nullable: true })
  meetingTitle: string;
  @Column({ nullable: true })
  meetingType: string;

  @Column({ nullable: true, type: 'timestamptz' })
  meetingDate: Date;
  @Column({ nullable: true })
  meetingTime: string

  @OneToMany(() => RfxMeetingAttendeeEntity, (attendee) => attendee.meeting, { onDelete: 'CASCADE', eager: true, cascade: true })
  meetingAttendees: RfxMeetingAttendeeEntity[];

  @OneToMany(() => RfxMeeingContactPersonsEntity, (contactPerson) => contactPerson.rfxMeeting, { onDelete: 'CASCADE', eager: true, cascade: true })

  meetingContactPersons: RfxMeeingContactPersonsEntity[];

  @Column({ nullable: true })
  meetingVenue: string;
  @Column({ nullable: true, default: MettingStatus.SCHEDULED })
  meetingStatus: MettingStatus;

  @Column({ nullable: true })
  meetingContent: string;
  @Column({ nullable: true })
  rfxId: number
  @Column({ nullable: true, default: false })
  isAttendanceMandatory: boolean
  @OneToMany(() => RfxMeetingRemindersEntity, (reminder) => reminder.rfxMeeting, { onDelete: 'CASCADE', eager: true, cascade: true, onUpdate: "CASCADE" })
  meetingReminder: RfxMeetingRemindersEntity[];
  @Column({ nullable: true, default: false })
  isActiveMeeting: boolean
  @Column({ nullable: true, type: 'timestamptz' })
  scheduledMeetingEndDate:Date
  @ManyToOne(() => RfxEntity, (rfx) => rfx.meeting, {
    onDelete: 'CASCADE',
    eager: false,
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  rfx: RfxEntity;
}
