import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PreprEntity } from "./prepr.entity";
import { PreprCopyEntity } from "./prepr.entitycopy";

@Entity({ name: 'PREPR_LEVEL_COPY' })
export class PrePrLevelsCopyEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  level:number;

  @Column({nullable:true})
  levelName:string;

  @Column({nullable:true})
  userRole:string;

  @Column({nullable:true})
  userId:number;

  @Column({nullable:true})
  departmentId:number;

  @Column({nullable:true})
  departmentTypeForm:boolean;

  @Column({nullable:true})
  activeLevel:number;

  @ManyToOne(() => PreprCopyEntity, (rfs) => rfs.levels,{
    onDelete: 'CASCADE',
 })
 @JoinColumn({name:'preprId'})
  rfs: PreprEntity;

  @Column({nullable:true})
  preprId: number;
}