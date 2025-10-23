import { TeamMemberType } from 'src/enum/team-member/team-member-type.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PreprEntity } from './prepr.entity';

@Entity({ name: 'PREPR_TEAM_MEMBERS' })
export class PreprTeamMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  // @Column({nullable:true})
  // userName:string;

  // @Column({nullable:true})
  // name:string;

  // @Column({nullable:true})
  // emailAddress:string;

  // @Column({nullable:true})
  // userRole:string;

  @Column({ nullable: true })
  viewStatus: TeamMemberType;

  @ManyToOne(() => PreprEntity, (rfs) => rfs.teamMembers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'preprId' })
  rfs: PreprEntity;

  @Column({ nullable: true })
  preprId: number;
}
