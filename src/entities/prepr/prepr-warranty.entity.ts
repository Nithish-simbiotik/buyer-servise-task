import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PreprEntity } from "./prepr.entity";

@Entity({ name: 'PREPR_WARRANTY' })
export class PreprWarrantyEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => PreprEntity, (rfs) => rfs.warranty,{
    onDelete: 'CASCADE',
})
  @JoinColumn({name:'preprId'})
  rfs: PreprEntity;

  @Column({nullable:true})
  preprId: number;

}