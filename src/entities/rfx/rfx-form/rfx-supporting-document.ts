import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RfxEntity } from "./rfx.entity";

@Entity()
export class RfxSupportingDocumentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    filename: string;
    @Column({ nullable: true })
    originalname: string;
    @Column({ nullable: true })
    path: string;
    @Column({ nullable: true })
    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
    @Column({ nullable: true })
    rfxId: number;

    @Column({ nullable: true })
    availabitly:string;
    @Column({ nullable: true })
    description:string;
    @ManyToOne(() => RfxEntity, (rfx) => rfx.supportingDocuments, {
        onDelete: 'CASCADE',
        eager: false,
        onUpdate: 'CASCADE',
        orphanedRowAction: 'delete'
    })
    rfx: RfxEntity;
}
