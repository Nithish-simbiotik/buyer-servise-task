import { SupplierStatus } from "src/enum/rfx/rfx-form-status.enum";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SupplierEntity } from "../supplier/supplier.entity";
import { PREntity } from "./pr.entity";

@Entity({ name: 'PR_SUPPLIER' })
export class PRSupplierEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  supplierId: number;

  @ManyToOne(() => SupplierEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'supplierId' })
  supplier: SupplierEntity;

  @Column({ nullable: false, default: 0 })
  totalAmount: number;

  @Column({ nullable: true })
  status: SupplierStatus;

  @Column({ nullable: true })
  remark: string;

  @ManyToOne(() => PREntity, (pr) => pr.rfxSupplier, {
    onDelete: 'CASCADE',
    eager: false,
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  pr: PREntity;
}