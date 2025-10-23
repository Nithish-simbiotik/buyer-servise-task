import { AnswerType } from 'src/dto/rfx-template/rfx-template-questionnaire.dto';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxFormQuestionnairSectionAttachementEntity } from './rfx-form-questionnair-section-attachement.entity';
import { RfxFormQuestionnairSectionEntity } from './rfx-form-questionnair-section.entity';

@Entity()
export class RfxFormQuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  question: string;

  @Column({ nullable: true })
  answerType: AnswerType;
  @Column({ type: 'simple-array', nullable: true })
  choices: string[];

  @Column('jsonb', { nullable: true })
  scoreChoices: { score: number; value: string }[];

  @Column({ nullable: true })
  evaluationMapping: string;

  @Column({ nullable: true })
  isRequired: boolean;

  @Column({ nullable: true })
  canSupplierAttachDocument: boolean;

  @Column({ nullable: true })
  isAttachmentRequired: boolean;

  @OneToMany(
    () => RfxFormQuestionnairSectionAttachementEntity,
    (section) => section.rfxQuestion,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  attachments: RfxFormQuestionnairSectionAttachementEntity[];

  @ManyToOne(
    () => RfxFormQuestionnairSectionEntity,
    (section) => section.questions,
    {
      onDelete: 'CASCADE',
      eager: false,
      orphanedRowAction: 'delete',
    },
  )
  rfxQuestionnaireSection: RfxFormQuestionnairSectionEntity;
}
