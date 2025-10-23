import { UserEntity } from 'src/entities/comon/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxTemplateEntity } from '../rfx-template.entity';
import { RfxTemplateEnvelopeEntity } from './rfx-template-envelope.entity';

@Entity()
export class RfxTemplateEnvelopeApproverEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(
    () => RfxTemplateEnvelopeEntity,
    (rfxTemplate) => rfxTemplate.envelopeApprovers,
    {
      onDelete: 'SET NULL',
    },
  )
  rfxTemplate: RfxTemplateEntity;
}
