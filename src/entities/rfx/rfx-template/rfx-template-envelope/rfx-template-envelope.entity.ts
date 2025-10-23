import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxTemplateEntity } from '../rfx-template.entity';
import { EnvelopeAttachmentType } from 'src/dto/rfx-template/create.rfx.template.dto';
import { RfxTemplateEnvelopeApproverEntity } from './rfx-template-envelope-approver.entity';

@Entity()
export class RfxTemplateEnvelopeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  envelopeName: string;

  @Column({ nullable: true })
  envelopeSequence: number;

  @Column({ nullable: true })
  readonly: boolean;

  @Column({ nullable: true })
  openingSequence: boolean;

  @Column({ nullable: true })
  canApproveWorkflow: boolean;

  @OneToMany(
    () => RfxTemplateEnvelopeApproverEntity,
    (owner) => owner.rfxTemplate,
    { cascade: true, eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  envelopeApprovers: RfxTemplateEnvelopeApproverEntity[];

  @Column({ nullable: true })
  attachmentType: EnvelopeAttachmentType;

  @Column({ nullable: true })
  showAttachmentOption: boolean;

  @ManyToOne(() => RfxTemplateEntity, (rfxTemplate) => rfxTemplate.envelopes, {
    onDelete: 'CASCADE',
    eager: false,
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  rfxTemplate: RfxTemplateEntity;
}
