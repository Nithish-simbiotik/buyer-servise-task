import { TeamMemberType } from 'src/enum/team-member/team-member-type.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RFSTemplateEntity } from './preprTemplate.entity';

@Entity({ name: 'PREPRTEMPLATE_TEAM_MEMBERS' })
export class RfsTemplateTeamMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  viewStatus: TeamMemberType;

  @ManyToOne(
    () => RFSTemplateEntity,
    (rfsTemplate) => rfsTemplate.teamMembers,
    {
      onDelete: 'CASCADE',
    },
  )
  rfsTemplate: RFSTemplateEntity;
}
