import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../comon/user.entity';
import { CategorySupplierEntity } from './category-supplier.entity';

@Entity()
export class SupplierCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: true })
  categoryName: string;
  @Column({ type: 'varchar', nullable: true })
  status: string;
  @OneToMany(
    () => CategorySupplierEntity,
    (suppier) => suppier.supplierCategory,
    {
      cascade: true,
      onDelete: 'CASCADE',
      eager: true,
      onUpdate: 'CASCADE',
    },
  )
  selectedSuppliers: CategorySupplierEntity[];
  @CreateDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  modifiedAt?: Date;

  // @Column({ nullable: true })
  // createdBy?: number;

  // @Column({ nullable: true })
  // updatedBy?: number;

  @Column({ nullable: true })
  createdById: number;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: UserEntity;

  @Column({ nullable: true })
  updatedById: number;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy: UserEntity;
}
