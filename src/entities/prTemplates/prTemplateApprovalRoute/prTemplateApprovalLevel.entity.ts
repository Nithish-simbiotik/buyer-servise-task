import { UserEntity } from 'src/entities/comon/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrTemplateApprovalEntity } from './prTemplateApproval.entity';

@Entity('PRTEMPLATE_APPROVER_LEVEL')
export class PRTemplateApprovalLevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  levelName: string;

  @Column({ nullable: true })
  levelSequence: number;

  @Column()
  userId: number;

  // @ManyToOne(() => UserEntity, {
  //   eager: true,
  // })
  // @JoinColumn({ name: 'userId' })
  // user: UserEntity;

  @ManyToOne(
    () => PrTemplateApprovalEntity,
    (approvalRoute) => approvalRoute.approvalLevels,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  @JoinColumn()
  PrTemplateApprovalRoute: PrTemplateApprovalEntity;
}
