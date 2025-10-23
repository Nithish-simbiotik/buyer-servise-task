import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxFormQuestionnairSectionEntity } from './rfx-form-questionnair-section.entity';
import { RfxFormQuestionEntity } from './rfx-form-question.entity';

@Entity()
export class RfxFormQuestionnairSectionAttachementEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  fileOriginalName: string;
  @Column({ nullable: true })
  filePath: string;
  @Column({ nullable: true })
  availability: string;
  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;
  @Column({ nullable: true })
  offset: number;
  @Column({ nullable: true })
  description: string;
  @ManyToOne(() => RfxFormQuestionEntity, (question) => question.attachments, {
    eager: false,
    orphanedRowAction: 'delete',
  })
  rfxQuestion: RfxFormQuestionEntity;
}
