import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PreprEntity } from "./prepr.entity";

@Entity({ name: 'PREPR_SUPPLIER' })
export class PreprSupplierEntity {

  @PrimaryGeneratedColumn()
  id: number;

  // @Column({nullable:true})
  // name: string;

  @Column({nullable:true})
  supplierId: number;

  @ManyToOne(() => PreprEntity, (rfs) => rfs.recommandedSuppliers,{
    onDelete: 'CASCADE',
})
  @JoinColumn({name:'preprId'})
  rfs: PreprEntity;

  @Column({nullable:true})
  preprId: number;

}