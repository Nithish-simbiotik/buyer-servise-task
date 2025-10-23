import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PreprEntity } from "./prepr.entity";
import { PreprCopyEntity } from "./prepr.entitycopy";

@Entity({ name: 'PREPR_SUPPLIER_COPY' })
export class PreprSupplierCopyEntity {

  @PrimaryGeneratedColumn()
  id: number;

  // @Column({nullable:true})
  // name: string;

  @Column({nullable:true})
  supplierId: number;

  @ManyToOne(() => PreprCopyEntity, (rfs) => rfs.recommandedSuppliers,{
    onDelete: 'CASCADE',
})
  @JoinColumn({name:'preprId'})
  rfs: PreprEntity;

  @Column({nullable:true})
  preprId: number;

}