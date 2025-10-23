import { UserEntity } from 'src/entities/comon/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrECAPEXTemplateApprovalEntity } from './prTemplateECAPEXApproval.entity';

@Entity('PRTEMPLATE_ECAPEX_APPROVER_LEVEL')
export class PReCAPEXTemplateApprovalLevelEntity {
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
    () => PrECAPEXTemplateApprovalEntity,
    (approvalRoute) => approvalRoute.approvalLevelsECAPEX,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  @JoinColumn()
  PrECAPEXTemplateApprovalRoute: PrECAPEXTemplateApprovalEntity;
}
