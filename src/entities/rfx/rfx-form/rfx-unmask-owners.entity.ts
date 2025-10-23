import { UserEntity } from "src/entities/comon/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RfxEntity } from "./rfx.entity";

@Entity()
export class RfxUnmaskOwnerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    userId: number;
    @ManyToOne(() => UserEntity, {
        eager: true,
        cascade: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    creator: UserEntity;
    @ManyToOne(
        () => RfxEntity,
        (rfx) => rfx.unmaskOwners,
        {
            orphanedRowAction: "delete"

        },
    )
    rfx: RfxEntity;
}