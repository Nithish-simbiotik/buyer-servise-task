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
import { UserEntity } from './user.entity';

@Entity({ name: 'USER_ROLE' })
export class UserRoleEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar',nullable: true  })
  user_role_name: string;

  @ManyToOne(() => DepartmentEntity, (de) => de.role)
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @Column({ type: 'number', nullable: true })
  department_id: number;

  @Column({ type: 'varchar', nullable: true })
  department_name: string;

  @Column({ type: 'varchar', default: 'Inactive', nullable: true })
  status: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  multiple_user_tagging: boolean;

  //   @OneToMany(() => UserModuleAccessRightsEntity, (um) => um.role)
  //   @JoinColumn({ name: 'module_access_rights_id' })
  //   module_access_rights: UserModuleAccessRightsEntity[];

  @Column({ type: 'integer', array: true, nullable: true })
  module_access_rights_id: number[];

  @Column({ type: 'simple-array', nullable: true })
  user_access_rights: string[];

  @Column({ type: 'boolean', default: false, nullable: true })
  role_used: boolean;

  @OneToMany(() => UserEntity, (u) => u.role)
  user: UserEntity[];

  @CreateDateColumn({
    type: 'timestamptz',
  })
  created_at: Date;

  @Column({ type: 'varchar',nullable: true  })
  created_by: string;

  
  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  updated_at: Date;

  @Column({ type: 'varchar', nullable: true, default: null })
  updated_by: string;
}
