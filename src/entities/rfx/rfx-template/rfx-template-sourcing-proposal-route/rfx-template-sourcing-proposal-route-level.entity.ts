import { UserEntity } from 'src/entities/comon/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RfxTemplateSourcingProposalRouteEntity } from './rfx-template-sourcing-proposal-route.entity';

@Entity()
export class RfxTemplateSourcingProposalRouteLevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  levelName: string;

  @Column()
  userId: number;
  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
  @ManyToOne(
    () => RfxTemplateSourcingProposalRouteEntity,
    (proposalRoute) => proposalRoute.proposalLevels,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  rfxTemplateSourcingProposalRoute: RfxTemplateSourcingProposalRouteEntity;
}
