import { SupplierEntity } from "src/entities/supplier/supplier.entity";
import { SupplierStatus } from "src/enum/rfx/rfx-form-status.enum";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RfxSupplierEntity } from "./rfx-supplier.entity";

@Entity()
export class RfxSelectedSupplierEntity extends BaseEntity {
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
  @Column({ nullable: true })
  status: SupplierStatus
  @Column({ nullable: true })
  remark: string;
  @Column({ nullable: true })
  rfxSupplierId: number;
  @Column({ nullable: true })
  previewedDate: Date;
  @Column({ nullable: true })
  invitationActionDate: Date;
  @Column({ nullable: true })
  submitedDate: Date;
  @ManyToOne(() => RfxSupplierEntity, (rfxSupplier) => rfxSupplier.selectedSupplier, {
    onDelete: 'CASCADE',
    eager: false,
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  rfxSupplier: RfxSupplierEntity;
  @Column({ nullable: true, default: false })
  isPreviewed: boolean;
  @Column({ nullable: true, default: false })
  isAccepted: boolean;
  @Column({ nullable: true, default: false })
  isRejected: boolean;
  @Column({ nullable: true, default: false })
  isSubmited: boolean;
}