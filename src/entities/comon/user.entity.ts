import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DepartmentEntity } from './department.entity';
import { UserPrePrEntity } from './user-pre-pr.entity';
// import { UserPrePrEntity } from './user-pre-pr.entity';
import { UserRoleEntity } from './user-role.entity';

@Entity({ name: 'USER' })
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  user_id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  staff_id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email_address: string;

  @Column({ type: 'varchar', nullable: true })
  contact_number: string;

  @Column({ type: 'varchar', nullable: true })
  company: string;

  @ManyToOne(() => DepartmentEntity, (de) => de.users)
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @Column({ type: 'integer', nullable: true })
  department_id: number;

  @Column({ type: 'varchar', nullable: true })
  department_name: string;

  @ManyToOne(() => UserRoleEntity, (ur) => ur.user_role_name)
  @JoinColumn({ name: 'role_id' })
  role: UserRoleEntity;

  @Column({ type: 'integer', nullable: true })
  role_id: number;

  @Column({ type: 'varchar', nullable: true })
  user_role_name: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  account_locked: boolean;

  @Column({ type: 'varchar', default: 'Inactive' })
  status: string;

  //   @OneToMany(() => UserPurchasingOrgEntity, (po) => po.user)
  //   @JoinColumn({ name: 'p_org_id' })
  //   purchasing_org: UserPurchasingOrgEntity[];

  //   addPurchasingOrg(user_purchasing_org: UserPurchasingOrgEntity) {
  //     if (this.purchasing_org == null) {
  //       this.purchasing_org = Array<UserPurchasingOrgEntity>();
  //     }
  //     this.purchasing_org.push(user_purchasing_org);
  //   }

  @Column({ type: 'simple-array', nullable: true })
  selected_purchasing_org: string[];

  @Column({ type: 'integer', array: true, nullable: true })
  p_org_id: number[];

  @OneToMany(() => UserPrePrEntity, (pre) => pre.user)
  @JoinColumn({ name: 'pre_pr_id' })
  pre_pr: UserPrePrEntity[];

  @Column({ type: 'simple-array', nullable: true })
  selected_pre_pr_template: string[];

  @Column({ type: 'integer', array: true, nullable: true })
  pre_pr_id: number[];

  //   @OneToMany(() => UserRfxEntity, (pre) => pre.user)
  //   @JoinColumn({ name: 'rfx_id' })
  //   rfx: UserRfxEntity[];

  @Column({ type: 'simple-array', nullable: true })
  selected_rfx_template: string[];

  @Column({ type: 'integer', array: true, nullable: true })
  rfx_id: number[];

  // @OneToMany(() => UserPrEntity, (pre) => pre.user)
  // @JoinColumn({ name: 'pr_id' })
  // pr: UserPrEntity[];

  @Column({ type: 'simple-array', nullable: true })
  selected_pr_template: string[];

  @Column({ type: 'integer', array: true, nullable: true })
  pr_id: number[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  last_login: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @Column({ type: 'varchar' })
  created_by: string;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @Column({ type: 'varchar', nullable: true, default: null })
  updated_by: string;
}
