import { AnswerType } from 'src/dto/rfx-template/rfx-template-questionnaire.dto';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxTemplateQuestionAttachementEntity } from './rfx-template-question-attachment.entity';
import { RfxTemplateQuestionnaireSectionEntity } from './rfx-template-questionnaire-section.entity';

@Entity()
export class RfxTemplateQuestionEntity {
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
    () => RfxTemplateQuestionAttachementEntity,
    (attachement) => attachement.rfxTemplateQuestion,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  attachments: RfxTemplateQuestionAttachementEntity[];

  @ManyToOne(
    () => RfxTemplateQuestionnaireSectionEntity,
    (section) => section.questions,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  section: RfxTemplateQuestionnaireSectionEntity;
}
