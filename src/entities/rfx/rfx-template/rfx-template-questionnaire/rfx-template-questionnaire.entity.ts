import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxTemplateQuestionnaireSectionEntity } from './rfx-template-questionnaire-section.entity';
import { RfxTemplateEntity } from '../rfx-template.entity';

@Entity()
export class RfxTemplateQuestionnaireEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  setName: string;

  @OneToMany(
    () => RfxTemplateQuestionnaireSectionEntity,
    (section) => section.rfxTemplateQuestionnaire,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  sections: RfxTemplateQuestionnaireSectionEntity[];

  @ManyToOne(
    () => RfxTemplateEntity,
    (rfxTemplate) => rfxTemplate.questionnaires,
    {
      onDelete: 'CASCADE',
      eager: false,
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  rfxTemplate: RfxTemplateEntity;
}
