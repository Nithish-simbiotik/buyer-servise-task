import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxTemplateQuestionEntity } from './rfx-template-question.entity';
import { RfxTemplateQuestionnaireEntity } from './rfx-template-questionnaire.entity';

@Entity()
export class RfxTemplateQuestionnaireSectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sNo: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => RfxTemplateQuestionEntity, (question) => question.section, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  questions: RfxTemplateQuestionEntity[];

  @ManyToOne(
    () => RfxTemplateQuestionnaireEntity,
    (questionnaire) => questionnaire.sections,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  rfxTemplateQuestionnaire: RfxTemplateQuestionnaireEntity;
}
