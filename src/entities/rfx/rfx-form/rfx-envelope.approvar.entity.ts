import { UserEntity } from "src/entities/comon/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RfxEnvelopeEntity } from "./rfx-envelope.entity";

@Entity()
export class RfxEnvelopeApproverEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(() => UserEntity, { eager: true })
    @JoinColumn({ name: 'userId' })
    userDetails: UserEntity;

    @ManyToOne(
        () => RfxEnvelopeEntity,
        (rfxTemplate) => rfxTemplate.envelopeApprovers,
        {
            onUpdate: "CASCADE",
            eager: false,
            orphanedRowAction: 'delete'
        },
    )
    envelope: RfxEnvelopeEntity;
}