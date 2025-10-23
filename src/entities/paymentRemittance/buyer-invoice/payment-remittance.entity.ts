import { PaymentStatus } from 'src/enum/invoice/paymentStatus.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../comon/user.entity';
import { SupplierEntity } from '../../supplier/supplier.entity';
import { InvoiceDetailsEntity } from './invoice-details.entity';

@Entity()
export class PaymentRemittanceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    purchaseOrg: string;

    @Column({ nullable: true })
    supplierCode: string;

    @Column({ nullable: true })
    supplierName: string;

    // @OneToOne(() => SupplierEntity, (supplier) => supplier.vendorCode, {
    //     eager: true,
    // })
    // @JoinColumn({ name: 'supplierCode' })
    // supplier: SupplierEntity;

    @Column({ nullable: true })
    referenceNumber: string;

    @Column({ nullable: true })
    paymentDate: Date;

    @Column({ nullable: true })
    totalAmount: number;

    @Column({ nullable: true })
    paymentMethod: string;

    @OneToMany(() => InvoiceDetailsEntity, (invoice) => invoice.pr, {
        cascade: true,
        onDelete: 'CASCADE',
        eager: true,
        onUpdate: 'CASCADE',
    })
    invoiceDetails: InvoiceDetailsEntity[];

    @Column({ nullable: true })
    status: PaymentStatus;

    @CreateDateColumn({
type:'date'    })
    createdAt: Date;
}
