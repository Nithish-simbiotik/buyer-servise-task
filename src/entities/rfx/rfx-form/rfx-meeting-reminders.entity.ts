import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RfxMeetingEntity } from "./rfx-meeting.entity";

@Entity()
export class RfxMeetingRemindersEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, type: 'timestamptz' })
  remindAt: Date;
  // @Column({ nullable: true, type: 'timestamptz' })
  @Column({ nullable: true,})

  remainderTime:string
  @Column({ nullable: true })
  rfxId:number
  @ManyToOne(() => RfxMeetingEntity, (meeting) => meeting.meetingReminder, {
    onDelete: 'CASCADE',
    eager:false
    
  })
  rfxMeeting: RfxMeetingEntity;
}
