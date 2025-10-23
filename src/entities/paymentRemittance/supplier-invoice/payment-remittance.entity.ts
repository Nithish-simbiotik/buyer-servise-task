// import { PaymentStatus } from 'src/enum/invoice/paymentStatus.enum';
// import {
//     Column,
//     Entity,
//     JoinColumn,
//     ManyToOne,
//     OneToMany,
//     OneToOne,
//     PrimaryGeneratedColumn,
// } from 'typeorm';
// import { SupplierInvoiceDetailsEntity } from './invoice-details.entity';

// @Entity()
// export class PaymentRemittanceEntity {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({ nullable: true })
//     businesUnit: string;

//     @Column({ nullable: true })
//     chequeNumber: string;

//     @Column({ nullable: true })
//     chequeDate: Date;

//     @Column({ nullable: true })
//     totalAmount: number;

//     @Column({ nullable: true })
//     paymentMethod: number;

//     @OneToMany(() => SupplierInvoiceDetailsEntity, (invoice) => invoice.pr, {
//         cascade: true,
//         onDelete: 'CASCADE',
//         eager: true,
//         onUpdate: 'CASCADE',
//     })
//     invoiceDetails: SupplierInvoiceDetailsEntity[];

//     @Column({nullable:true})
//     status:PaymentStatus;
// }
