import { SupplierEntity } from "src/entities/supplier/supplier.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RfxSupplierEntity } from "./rfx-supplier.entity";

@Entity()
export class RecommendedSupplierEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  // @Column({nullable:true})
  // name: string;

  @Column({ nullable: true })
  supplierId: number;

  @ManyToOne(() => SupplierEntity, { eager: true })
  @JoinColumn({ name: 'supplierId' })
  supplier: SupplierEntity

  @Column({ nullable: true })
  rfxSupplierId: number;

  @ManyToOne(() => RfxSupplierEntity, (rfxSupplier) => rfxSupplier.recommendedSuppliers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: false,
    orphanedRowAction: 'delete'
  })
  rfxSupplier: RfxSupplierEntity;
}