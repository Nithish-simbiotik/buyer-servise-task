import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SupplierRoleEntity } from "./supplier-role.entity";

@Entity({ name: "SUPPLIER_MODULE_ACCESS" })
export class SupplierModuleAccessEntity extends BaseEntity {
    //   @PrimaryGeneratedColumn()
    @PrimaryColumn()
    id: number;
    @Column({ type: "varchar" })
    accessRightName: string;

    @Column({ type: "varchar", default: "Inactive" })
    status: string;

    @Column({ type: "varchar" })
    userAccessRights: string[];

    @ManyToOne(() => SupplierRoleEntity, (sr) => sr.moduleAccessRights)
    supplierRole: SupplierRoleEntity;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @Column({ type: "varchar", nullable: true })
    createdBy: string;

    @UpdateDateColumn({ type: "timestamptz", nullable: true })
    updatedAt: Date;

    @Column({ type: "varchar", nullable: true, default: null })
    updatedBy: string;
}