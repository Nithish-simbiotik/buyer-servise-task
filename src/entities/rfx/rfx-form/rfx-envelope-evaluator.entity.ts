import { UserEntity } from 'src/entities/comon/user.entity';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RfxEnvelopeEntity } from './rfx-envelope.entity';

@Entity()
export class RfxEnvelopeEvaluatorEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @ManyToOne(
    () => UserEntity,
    {
      eager:true,
      cascade:false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'userId' })
  userDetails: UserEntity

  @ManyToOne(
    () => RfxEnvelopeEntity,
    (envelope) => envelope.envelopeEvaluators,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete'
    },
  )
  envelope: RfxEnvelopeEntity;
}
