import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { toUSVString } from "util";


@Entity()
export class BuyerPaymentRemittancePdfEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  paymentRemittanceId: number;

  @Column({nullable:true})
  pdfUrl:string
}