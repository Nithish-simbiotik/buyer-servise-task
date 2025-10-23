import { EquivalentBrandAllowedTypeEnum } from 'src/enum/rfs/equivalentBrand.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxSupplierResponseEntity } from '../rfx-supplier-response/rfx-supplier-res.entity';
import { RfxEntity } from './rfx.entity';

@Entity()
export class RfxBillOfQuantityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  itemName: string;

  @Column({ nullable: true })
  itemDescription: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: true })
  equivalentBrandAllowed: EquivalentBrandAllowedTypeEnum;

  @Column({ nullable: true })
  costCenterId: string;
  // @Column({ nullable: true })
  // costCenterId: number;

  @Column({ nullable: true })
  wordOrderNo: string;

  @Column({ nullable: true })
  internalOrderNoId: number;

  @Column({ nullable: true })
  partNumberId: number;

  @Column({ nullable: true })
  uomId: number;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  rfxId: number;
  @ManyToOne(() => RfxEntity, (rfs) => rfs.boq, {
    onDelete: 'CASCADE',
    eager: false,
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  rfx: RfxEntity;

  @OneToOne(
    () => RfxSupplierResponseEntity,
    (response) => response.billOfQuantity,
    {
      eager: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  @JoinColumn()
  supplierResponse: RfxSupplierResponseEntity;
}
