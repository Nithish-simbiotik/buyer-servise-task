import { EquivalentBrandAllowedTypeEnum } from 'src/enum/rfs/equivalentBrand.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RfxSupplierResponseBoqEntity } from './rfx-supplier-res-boq.entity';

@Entity()
export class RfxSupplierResponseBoqItemEntity {
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
  costCenterId: number;

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
  remark: string;

  @Column({ nullable: true })
  unitPrice: number;

  @Column({ nullable: true })
  totalAmountBeforeTax: number;

  @Column({ nullable: true })
  taxPercentage: number;

  @Column({ nullable: true })
  taxAmount: number;

  @Column({ nullable: true })
  totalAmountAfterTax: number;

  @ManyToOne(() => RfxSupplierResponseBoqEntity, (boq) => boq.items, {
    onDelete: 'CASCADE',
    eager: false,
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  supplierResponseBoq: RfxSupplierResponseBoqEntity;

  // Supplier Keys
  @Column({ nullable: true })
  supplierBrandOption: string;

  @Column({ nullable: true })
  supplierBrand: string;

  @Column({ nullable: true })
  supplierModel: string;

  @Column({ nullable: true })
  priceIncluded: boolean;

  @Column({ nullable: true })
  unableToQuote: boolean;
}
