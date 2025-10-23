import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PreprEntity } from "./prepr.entity";

@Entity({ name: 'PREPR_SUPPORTING_DOCUMENTS' })
export class PreprSupportingDocumentEntity {

  @PrimaryGeneratedColumn()
  id: number;

  // @Column({nullable:true})
  // fileId: string;

  @Column({nullable:true})
  fileOriginalName: string;

  @Column({nullable:true})
  filePath: string;

  @Column({nullable:true})
  availability: string;

  // @CreateDateColumn({
  //   type: 'timestamptz',
  // })
  // uploadDate: Date;
  @Column({nullable:true})
  uploadDate:Date

  @Column({nullable:true})
  offset:number

  @Column({nullable:true})
  description:string;

  @ManyToOne(() => PreprEntity, (rfs) => rfs.supportingDocuments,{
    onDelete: 'CASCADE',
})
  @JoinColumn({name:'preprId'})
  rfs: PreprEntity;

  @Column({nullable:true})
  preprId: number;

}