import { UserEntity } from "src/entities/comon/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RfxMeetingEntity } from "./rfx-meeting.entity";

@Entity()
export class RfxMeeingContactPersonsEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @ManyToOne(() => UserEntity,{
    onDelete: 'CASCADE',
    eager:true
  })
  @JoinColumn({ name: "userId" })
  user: UserEntity
  @ManyToOne(() => RfxMeetingEntity, (meeting) => meeting.meetingContactPersons, {
    onDelete: 'CASCADE',
    eager:false
  })
  rfxMeeting: RfxMeetingEntity;
}