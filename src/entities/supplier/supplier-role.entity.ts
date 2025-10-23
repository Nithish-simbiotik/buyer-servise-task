import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SupplierModuleAccessEntity } from "./supplier-module-acces.entity";
import { SupplierEntity } from "./supplier.entity";

@Entity({ name: "SUPPLIER_ROLE" })
export class SupplierRoleEntity extends BaseEntity {
// @PrimaryGeneratedColumn()
@PrimaryColumn()
  id: number;

  @Column({ type: "varchar" })
  supplierRoleName: string;

  @Column({ type: "varchar", default: "Inactive" })
  status: string;

  @Column({ type: "varchar", nullable: true })
  supplierSelection: string;

  @OneToMany(() => SupplierEntity, (se) => se.role)
  @JoinColumn({ name: "supplierId" })
  suppliers: SupplierEntity[];
  addSupplier(supplier: SupplierEntity) {
    if (this.suppliers == null) {
      this.suppliers = Array<SupplierEntity>();
    }
    this.suppliers.push(supplier);
  }

  @Column({ type: "integer", array: true })
  supplierId: number[];

  @Column({ type: "simple-array" })
  selectedSuppliers: string[];

  @OneToMany(() => SupplierModuleAccessEntity, (sm) => sm.supplierRole)
  @JoinColumn({ name: "moduleAccessRightsId" })
  moduleAccessRights: SupplierModuleAccessEntity[];
  addSupplierModule(module: SupplierModuleAccessEntity) {
    if (this.moduleAccessRights == null) {
      this.moduleAccessRights = Array<SupplierModuleAccessEntity>();
    }
    this.moduleAccessRights.push(module);
  }

  @Column({ type: "integer", array: true })
  moduleAccessRightsId: number[];

  @Column({ type: "simple-array" })
  userAccessRights: string[];

  @Column({ type: "varchar", nullable: true })
  createdBy: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", nullable: true })
  updatedAt: Date;

  @Column({ type: "varchar", nullable: true, default: null })
  updatedBy: string;
}