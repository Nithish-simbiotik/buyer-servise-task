import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrTemplateEntity } from './prTemplates.entity';
import { PrType } from '../../enum/prTemplate/prTemplates.enum';
import { UserEntity } from '../comon/user.entity';

@Entity('PRTEMPLATE_USER')
export class PrTemplateUserEntity {
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
    () => PrTemplateEntity,
    (rfxTemplate) => rfxTemplate.templateUsers,
    {
      onDelete: 'SET NULL',
    },
  )
  prTemplate: PrTemplateEntity;
}
