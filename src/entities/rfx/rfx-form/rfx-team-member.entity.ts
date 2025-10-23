import { UserEntity } from 'src/entities/comon/user.entity';
import { TeamMemberType } from 'src/enum/team-member/team-member-type.enum';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxEntity } from './rfx.entity';

@Entity()
export class RfxTeamMemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  userId: number;
  @ManyToOne(() => UserEntity, (user) => user.id, {
    eager: true,
    cascade:false
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
  @Column()
  viewStatus: TeamMemberType;
  @Column({ nullable: true })
  rfxId: number;
  @ManyToOne(() => RfxEntity, (rfx) => rfx.teamMembers, {
    onDelete: 'CASCADE',
    eager: false,
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  rfx: RfxEntity;
}
