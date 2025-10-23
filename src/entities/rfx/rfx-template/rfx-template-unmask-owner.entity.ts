import { UserEntity } from 'src/entities/comon/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RfxTemplateEntity } from './rfx-template.entity';

@Entity()
export class RfxTemplateUnmaskOwnerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(
    () => RfxTemplateEntity,
    (rfxTemplate) => rfxTemplate.unmaskOwners,
    {
      onDelete: 'SET NULL',
    },
  )
  rfxTemplate: RfxTemplateEntity;
}
