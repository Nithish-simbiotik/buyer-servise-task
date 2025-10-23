import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SupplierEntity } from "./supplier.entity";

@Entity({ name: "INDUSTRY_CATEGORY" })
export class IndustryCategoryEntity extends BaseEntity {
    //   @PrimaryGeneratedColumn()

    @PrimaryColumn()
    id: number;

    @Column({ type: "varchar", unique: true })
    industryCategory: string;

    @ManyToOne(() => SupplierEntity)
    supplier: SupplierEntity;
}