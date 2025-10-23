import { ConfigModule } from '@nestjs/config';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
export class ExportPaymentEntity {

    @Column({ nullable: true })
    referenceNumber: string;

    @Column({ nullable: true })
    paymentDate: Date;

    @Column({ nullable: true })
    supplierName: string;

    @Column({ nullable: true })
    purchaseOrg: string;

    @Column({ nullable: true })
    paymentMethod: string;

    @Column({ nullable: true })
    invoiceNumber: string;

    @Column({ nullable: true })
    invoiceDate: Date;

    @Column({ nullable: true })
    invoiceAmount: number;

    // @CreateDateColumn({
    //     type: 'timestamptz',
    //     default: () => 'CURRENT_TIMESTAMP',
    // })
    // createdAt: Date;

    // @ManyToOne(() => PaymentRemittanceEntity, (pr) => pr.invoiceDetails)
    // pr: PaymentRemittanceEntity;
}
