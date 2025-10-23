import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrApprovalRouteEntity } from './pr-approval-route.entity';
import { UserEntity } from 'src/entities/comon/user.entity';

@Entity({ name: 'PR_APPROVAL_ROUTE_USER' })
export class PrApprovalRouteUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => PrApprovalRouteEntity, (approvalRoute) => approvalRoute.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  prApprovalRoute: PrApprovalRouteEntity;

  @ManyToOne(() => UserEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}