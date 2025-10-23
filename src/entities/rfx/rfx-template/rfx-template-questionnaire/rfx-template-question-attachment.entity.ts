import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxTemplateQuestionEntity } from './rfx-template-question.entity';

@Entity()
export class RfxTemplateQuestionAttachementEntity {
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
  @ManyToOne(
    () => RfxTemplateQuestionEntity,
    (question) => question.attachments,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  rfxTemplateQuestion: RfxTemplateQuestionEntity;
}
