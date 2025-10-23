import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { RfxFormQuestionEntity } from '../rfx-form/rfx-form-question.entity';
import { RfxSupplierResponseEntity } from './rfx-supplier-res.entity';

@Entity()
export class RfxSupplierResponseAnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RfxSupplierResponseEntity, (response) => response.answers, {
    onDelete: 'CASCADE',
    eager: false,
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  supplierResponse: RfxSupplierResponseEntity;

  @Column({ nullable: true })
  questionId: number;

  @ManyToOne(() => RfxFormQuestionEntity, { eager: true })
  @JoinColumn({ name: 'questionId' })
  question: RfxFormQuestionEntity;

  @Column('jsonb', { nullable: true })
  answer: any;
}
