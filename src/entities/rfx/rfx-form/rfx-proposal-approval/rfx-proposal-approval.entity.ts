import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RfxEntity } from '../rfx.entity';
import { RfxSourcingProposalLevelEntity } from './rfx-proposal.approval-level';

@Entity()
export class RfxSourcingProposalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default:false,nullable:true})
  enableApprovalReminders: boolean;

  @Column({default:false,nullable:true})
  visible: boolean;

  @Column({nullable:true,type:'integer'})
  hoursPerReminder: number;

  @Column({ nullable: true ,type:'integer'})
  reminderFrequency: number;

  @Column({default:false,nullable:true})
  notifyOnFinalReminder: boolean;

  @Column({default:false,nullable:true})
  canAddAdditionalApproval: boolean;

  @Column({default:false,nullable:true})
  canAddAdditionalApproval_visible: boolean;

  @Column({default:false,nullable:true})
  canAddAdditionalApproval_readonly: boolean;

  @Column({default:false,nullable:true})
  canAddAdditionalApproval_optional: boolean;
  @Column({ nullable: true })
  rfxId: number;

  @OneToOne(() => RfxEntity,(rfx)=>rfx.sourcingProposalRoute, {
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  rfx: RfxEntity;
  @OneToMany(
    () => RfxSourcingProposalLevelEntity,
    (sourcingProposalLevel) => sourcingProposalLevel.rfxSourcingProposal,
    {
      cascade: true,
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  proposalLevels: RfxSourcingProposalLevelEntity[];
}
