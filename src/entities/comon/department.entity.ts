import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RfxTemplateEntity } from '../rfx/rfx-template/rfx-template.entity';
import { UserRoleEntity } from './user-role.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'DEPARTMENT' })
export class DepartmentEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  department_name: string;

  @Column({ type: 'varchar', nullable: true })
  display_name: string;

  @Column({ type: 'varchar', nullable: true })
  purchasing_org: string;

  @OneToMany(() => UserRoleEntity, (ur) => ur.department)
  role: UserRoleEntity[];

  @OneToMany(() => UserEntity, (ue) => ue.department)
  users: UserEntity[];

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  created_at: Date;

  @Column({ type: 'varchar', nullable: true })
  created_by: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at: Date;

  @Column({ type: 'varchar', nullable: true, default: null })
  updated_by: string;

  @Column({ type: 'varchar', default: 'Inactive', nullable: true })
  status: string;
}
