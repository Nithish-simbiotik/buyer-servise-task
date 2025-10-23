import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxFormQuestionnairSectionAttachementEntity } from './rfx-form-questionnair-section-attachement.entity';
import { RfxFormQuestionnairEntity } from './rfx-form-questionnair.entity';
import { RfxFormQuestionEntity } from './rfx-form-question.entity';
@Entity()
export class RfxFormQuestionnairSectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  sNo: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(
    () => RfxFormQuestionEntity,
    (question) => question.rfxQuestionnaireSection,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  questions: RfxFormQuestionEntity[];
  @ManyToOne(
    () => RfxFormQuestionnairEntity,
    (questionnaire) => questionnaire.sections,
    {
      eager: false,
      orphanedRowAction: 'delete',
    },
  )
  rfxQuestionnaire: RfxFormQuestionnairEntity;
}
