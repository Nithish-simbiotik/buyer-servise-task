import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrECAPEXApprovalRouteEntity } from './pr-capex-approval.entity';
import { UserEntity } from 'src/entities/comon/user.entity';

@Entity({ name: 'PR_ECAPEX_APPROVAL_ROUTE_USER' })
export class PrECAPEXApprovalRouteUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => PrECAPEXApprovalRouteEntity, (approvalRoute) => approvalRoute.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  prApprovalRoute: PrECAPEXApprovalRouteEntity;

  @ManyToOne(() => UserEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}