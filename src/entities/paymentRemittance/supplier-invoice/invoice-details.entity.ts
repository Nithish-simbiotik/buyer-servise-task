// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { PaymentRemittanceEntity } from "./payment-remittance.entity";


// @Entity()
// export class SupplierInvoiceDetailsEntity {

//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({ nullable: true })
//     invoiceNumber: string;

//     @Column({ nullable: true })
//     invoiceDate: Date;

//     @Column({ nullable: true })
//     invoiceAmount: number;


//     @ManyToOne(() => PaymentRemittanceEntity, (pr) => pr.id)
//     pr: PaymentRemittanceEntity;



// }