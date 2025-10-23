import { EquivalentBrandAllowedTypeEnum } from "src/enum/rfs/equivalentBrand.enum";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PreprCostCenterEntity } from "./prepr-cost-center.entity";
import { PreprEntity } from "./prepr.entity";

@Entity({ name: 'PREPR_BILL_OF_QUANTITY' })
export class PreprBillOfQuantityEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  itemName: string;

  @Column({nullable:true})
  itemDescription: string;

  @Column({nullable:true})
  brand: string;
  
  @Column({nullable:true})
  model: string;

  @Column({nullable:true})
  equivalentBrandAllowed: EquivalentBrandAllowedTypeEnum;

  @Column({nullable:true})
  costCenterId: number;

  @Column({nullable:true})
  wordOrderNo: string;

  @Column({nullable:true})
  internalOrderNoId: number;

  @Column({nullable:true})
  partNumberId: number;

  @Column({nullable:true})
  uomId: number;

  @Column({nullable:true})
  quantity: number;

  
  @ManyToOne(() => PreprEntity, (rfs) => rfs.boq,{
    onDelete: 'CASCADE',
})
  @JoinColumn({name:'preprId'})
  rfs: PreprEntity;

  @Column({nullable:true})
  preprId: number;

}