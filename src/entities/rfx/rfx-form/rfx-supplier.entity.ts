import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RecommendedSupplierEntity } from './rfx-recommandedSuppliers.entity';
import { RfxSelectedSupplierEntity } from './rfx-selected-supplier.entity';
import { RfxEntity } from './rfx.entity';

@Entity()
export class RfxSupplierEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  supplierSelection: 'manual' | 'category';

  @Column({ nullable: true })
  supplierCategoryId: number;
  //carry fwd from ppr
  @OneToMany(
    () => RecommendedSupplierEntity,
    (recoSupplier) => recoSupplier.rfxSupplier,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: true,
      eager: true,
    },
  )
  recommendedSuppliers: RecommendedSupplierEntity[];
  //carry fwd from ppr

  @Column({ nullable: true })
  recommendedNewSupplier: string;

  @OneToMany(
    () => RfxSelectedSupplierEntity,
    (selectedSupplier) => selectedSupplier.rfxSupplier,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      cascade: true,
      eager: true,
    },
  )
  selectedSupplier: RfxSelectedSupplierEntity[];

  @Column({ nullable: true })
  rfxId: number;
  @OneToOne(() => RfxEntity, (rfx) => rfx.supplier, {
    onDelete: 'CASCADE',
    eager: false,
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'rfxId' })
  rfx: RfxEntity;
}
