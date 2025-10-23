import { UserEntity } from 'src/entities/comon/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RfxTemplateApprovalRouteEntity } from './rfx-template-approval-route.entity';

@Entity()
export class RfxTemplateApprovalRouteLevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  levelName: string;

  @Column({ nullable: true })
  levelSequence: number;

  @Column()
  userId: number;
  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
  @ManyToOne(
    () => RfxTemplateApprovalRouteEntity,
    (approvalRoute) => approvalRoute.approvalLevels,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  rfxTemplateApprovalRoute: RfxTemplateApprovalRouteEntity;
}
