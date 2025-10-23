import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PreprBillOfQuantityEntity } from "./prepr-bill-of-quantity.entity";
import { PreprEntity } from "./prepr.entity";

@Entity({ name: 'PREPR_COSTCENTER' })
export class PreprCostCenterEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  code: string;

  @Column({nullable:true})
  description:string;

  @Column({nullable:true})
  companycode:string;

  @Column({ default: true })
  status:boolean;
  

  @OneToOne(() => PreprEntity, (rfs) => rfs.costCenter,{
    onDelete: 'CASCADE',
})
  @JoinColumn({name:'preprId'})
  rfs: PreprEntity;

  @Column({nullable:true})
  preprId: number;
  
}