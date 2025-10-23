
import { ViewerType } from "src/enum/prTemplate/prTemplates.enum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PREntity } from "./pr.entity";

@Entity({ name: 'PR_TEAM_MEMBERS' })
export class PRTeamMemberEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  viewStatus: ViewerType;

  @ManyToOne(() => PREntity, (pr) => pr.teamMembers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  pr: PREntity;
}