import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxEnvelopeEvaluatorEntity } from './rfx-envelope-evaluator.entity';
import { RfxEnvelopeApproverEntity } from './rfx-envelope.approvar.entity';
import { RfxEntity } from './rfx.entity';

@Entity()
export class RfxEnvelopeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  envelopeName: string;

  @Column({ nullable: true, type: "int8" })
  envelopeSequence: number;

  @OneToMany(
    () => RfxEnvelopeEvaluatorEntity,
    (evaluator) => evaluator.envelope, {
    onDelete: 'CASCADE',
    eager: true,
    cascade: true
  }
  )
  envelopeEvaluators: RfxEnvelopeEvaluatorEntity[];
  @OneToMany(
    () => RfxEnvelopeApproverEntity,
    (evaluator) => evaluator.envelope, {
    onDelete: 'CASCADE',
    eager: true,
    cascade: true
  }
  )
  envelopeApprovers:RfxEnvelopeApproverEntity[];
  @Column({ nullable: true })
  readonly: boolean;

  @Column({ nullable: true })
  openingSequence: boolean;
  @Column({ nullable: true })
  canApproveWorkflow: boolean;// new key

  @Column({ nullable: true })
  attachmentType: string;// new key
  @Column({ nullable: true })
  showAttachmentOption:boolean
  // @Column({ nullable: true })
  // attachmentBillOfQuantity: boolean;

  // @Column({ nullable: true })
  // attachmentQuestionnaire: boolean;

  @ManyToOne(() => RfxEntity, (rfx) => rfx.envelopes, {
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  rfx: RfxEntity;
}
