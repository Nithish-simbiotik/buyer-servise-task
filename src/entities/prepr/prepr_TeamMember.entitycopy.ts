import { TeamMemberType } from 'src/enum/team-member/team-member-type.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PreprEntity } from './prepr.entity';
import { PreprCopyEntity } from './prepr.entitycopy';

@Entity({ name: 'PREPR_TEAM_MEMBERS_COPY' })
export class PreprTeamMemberCopyEntity {
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

  @ManyToOne(() => PreprCopyEntity, (rfs) => rfs.teamMembers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'preprId' })
  rfs: PreprEntity;

  @Column({ nullable: true })
  preprId: number;
}
