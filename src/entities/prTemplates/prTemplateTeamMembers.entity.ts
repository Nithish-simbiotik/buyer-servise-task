import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ViewerType } from 'src/enum/prTemplate/prTemplates.enum';
import { PrTemplateEntity } from './prTemplates.entity';

@Entity({ name: 'PRTEMPLATES_TEAM_MEMBERS' })
export class PrTemplateTeamMembersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  viewStatus: ViewerType;

  @ManyToOne(() => PrTemplateEntity, (prTemplate) => prTemplate.teamMembers, {
    onDelete: 'CASCADE',
    eager: false,
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  prTemplate: PrTemplateEntity;
}
