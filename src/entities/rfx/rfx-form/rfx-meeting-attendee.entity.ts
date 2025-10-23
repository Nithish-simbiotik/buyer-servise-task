import { UserEntity } from 'src/entities/comon/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxMeetingEntity } from './rfx-meeting.entity';

@Entity()
export class RfxMeetingAttendeeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  userId: number;
  @ManyToOne(() => UserEntity,{
    eager:true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: "userId" })
  user: UserEntity

  // @Column({ nullable: true })
  // supplierName: string;
  // @Column({ nullable: true })
  // name: string;
  // @Column({ nullable: true })
  // email: string;
  // @Column({ nullable: true })
  // phoneNo: string;

  @ManyToOne(() => RfxMeetingEntity, (meeting) => meeting.meetingAttendees, {
    onDelete: 'CASCADE',
    eager: false,
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  meeting: RfxMeetingEntity;
}
