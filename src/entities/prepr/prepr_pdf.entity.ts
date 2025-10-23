import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { toUSVString } from "util";
import { PreprEntity } from "./prepr.entity";

@Entity({ name: 'PREPR_PDF' })
export class PrePdfEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  preprId: number;

  @Column({nullable:true})
  pdfUrl:string
}