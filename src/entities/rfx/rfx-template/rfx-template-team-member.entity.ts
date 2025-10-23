import { UserEntity } from 'src/entities/comon/user.entity';
import { TeamMemberType } from 'src/enum/team-member/team-member-type.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxTemplateEntity } from './rfx-template.entity';

@Entity()
export class RfxTemplateTeamMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  viewStatus: TeamMemberType;

  @ManyToOne(
    () => RfxTemplateEntity,
    (rfxTemplate) => rfxTemplate.teamMembers,
    {
      onDelete: 'CASCADE',
      eager: false,
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  rfxTemplate: RfxTemplateEntity;
}
