import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxSupplierResponseEntity } from '../rfx-supplier-res.entity';
import { RfxSupplierResponseBoqItemEntity } from './rfx-supplier-res-boq-item.entity';

@Entity()
export class RfxSupplierResponseBoqEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  remark: string;

  @Column({ nullable: true })
  totalAmountBeforeTax: number;

  @Column({ nullable: true })
  totalTax: number;

  @Column({ nullable: true })
  grandTotal: number;

  @OneToMany(
    () => RfxSupplierResponseBoqItemEntity,
    (bill) => bill.supplierResponseBoq,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  items: RfxSupplierResponseBoqItemEntity[];

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
