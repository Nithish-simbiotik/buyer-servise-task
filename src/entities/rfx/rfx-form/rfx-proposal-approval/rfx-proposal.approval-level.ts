import { UserEntity } from "src/entities/comon/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RfxSourcingProposalEntity } from "./rfx-proposal-approval.entity";

@Entity()

export class RfxSourcingProposalLevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  levelName: string;

  @Column({nullable:true})
  userId: number;
  @ManyToOne(() => UserEntity, {
    eager: true,
    cascade:false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'userId' })
  userDetails: UserEntity
  @ManyToOne(
    () => RfxSourcingProposalEntity,
    (sourcingProposal) => sourcingProposal.proposalLevels,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete'
    },
  )
  rfxSourcingProposal: RfxSourcingProposalEntity;
}