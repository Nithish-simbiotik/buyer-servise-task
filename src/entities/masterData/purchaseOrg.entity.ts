import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
// import { PreprEntity } from "./prepr.entity";

@Entity({ name: 'purchase_org' })
export class PurchaseOrgEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    displayName: string;

    @Column({ nullable: true })
    addressLine1: string;

    @Column({ nullable: true })
    addressLine2: string;

    @Column({ nullable: true })
    addressLine3: string;

    @Column({ nullable: true })
    companyCode: number;

    @Column({ nullable: true })
    purchaseGroup: number;

    @Column({ nullable: true })
    purchaseGroupDescription: string;

    @Column({ nullable: true })
    poType: string;
    
    @Column({ nullable: true })
    code: number;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    faxNumber: string;

    @Column({ nullable: true })
    logo: string;

    @Column({nullable: true })
    status: string;
}
