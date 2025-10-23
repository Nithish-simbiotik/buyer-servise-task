import { PRApproverStatus } from 'src/enum/pr/pr-approver-status.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrECAPEXApprovalRouteUserEntity } from './pr-ecapex-approval-route-user.entity';
import { PREntity } from './pr.entity';

@Entity({ name: 'PR_ECAPEX_APPROVAL_ROUTE' })
export class PrECAPEXApprovalRouteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  level: number;

  @Column({ nullable: true })
  levelName: string;

  // @Column("int", { array: true, nullable: false, default: [] })
  // userIds: number[];

  @OneToMany(
    () => PrECAPEXApprovalRouteUserEntity,
    (routeUsers) => routeUsers.prApprovalRoute,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  users: PrECAPEXApprovalRouteUserEntity[];

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

  @ManyToOne(() => PREntity, (pr) => pr.ecapexApprovalRoute, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  pr: PREntity;

}