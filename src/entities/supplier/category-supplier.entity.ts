import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { SupplierCategoryEntity } from "./supplier-category.entity";
  import { SupplierEntity } from "./supplier.entity";
  
  @Entity()
  export class CategorySupplierEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    supplierId: number;
    @Column({  nullable: true })
    supplierCategoryId:number
    @ManyToOne(
      () => SupplierCategoryEntity,
      (SupplierCategory) => SupplierCategory.selectedSuppliers,
      {
        eager: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        orphanedRowAction: "delete",
      }
    )
    supplierCategory: SupplierCategoryEntity;
    @ManyToOne(() => SupplierEntity, {
      eager: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      orphanedRowAction: "delete",
    })
    @JoinColumn({name:'supplierId'})
    supplier: SupplierEntity;
  }
  