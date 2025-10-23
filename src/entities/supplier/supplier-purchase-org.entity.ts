import {
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
  } from 'typeorm';
import { SupplierEntity } from './supplier.entity';

  
  @Entity({ name: 'SUPPLIER_PURCHASING_ORG' })
  export class SupplierPurchasingOrgEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'integer'})
    purchaseOrgId: number;
  
    @ManyToOne(() => SupplierEntity, (se) => se.purchaserOrg,{
        onDelete: 'CASCADE',
        eager: false,
        onUpdate: 'CASCADE',
        orphanedRowAction: 'delete',
    })
    supplier: SupplierEntity;
  }
  