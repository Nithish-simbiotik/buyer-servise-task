
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SupplierEntity } from "./supplier.entity";

@Entity({ name: "SUPPLIER_TAGS" })
export class SupplierTagsEntity extends BaseEntity {
//   @PrimaryGeneratedColumn()

  @PrimaryColumn()
  id: number;

  @Column({ type: "varchar", unique: true })
  supplierTag: string;

  @ManyToOne(() => SupplierEntity)
  supplier: SupplierEntity;
}