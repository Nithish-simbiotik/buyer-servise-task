import { UserEntity } from 'src/entities/comon/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxTemplateEntity } from './rfx-template.entity';

@Entity()
export class RfxTemplateUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  // @ManyToOne(() => UserEntity, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'userId' })
  // user: UserEntity;

  @ManyToOne(
    () => RfxTemplateEntity,
    (rfxTemplate) => rfxTemplate.templateUsers,
    {
      onDelete: 'SET NULL',
    },
  )
  rfxTemplate: RfxTemplateEntity;
}
