import { PRApproverStatus } from 'src/enum/pr/pr-approver-status.enum';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PREntity } from './pr.entity';
import { UserEntity } from 'src/entities/comon/user.entity';
import { PrApprovalRouteUserEntity } from './pr_approval_route_user.entity';

@Entity({ name: 'PR_APPROVAL_ROUTE' })
export class PrApprovalRouteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  level: number;

  @Column({ nullable: true })
  levelName: string;

  @OneToMany(
    () => PrApprovalRouteUserEntity,
    (routeUsers) => routeUsers.prApprovalRoute,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  users: PrApprovalRouteUserEntity[];

  @Column({ nullable: true })
  allowToEscalate: boolean;

  @Column({ nullable: true })
  allowToEditPR: boolean;

  @Column({ nullable: true })
  maxApprovalLimit: number;

  @Column({ nullable: true, default: PRApproverStatus.PENDING, })
  status: PRApproverStatus;

  @Column({ nullable: true })
  approverRemarks: string;

  @ManyToOne(() => PREntity, (pr) => pr.approvalRoute, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  pr: PREntity;
}