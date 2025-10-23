import { RfxTemplateSourcingProposalRouteLevelEntity } from 'src/entities/rfx/rfx-template/rfx-template-sourcing-proposal-route/rfx-template-sourcing-proposal-route-level.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTemplateSourcingProposalRouteLevelEntity)
export class RfxTemplateSourcingProposalRouteLevelRepository extends Repository<RfxTemplateSourcingProposalRouteLevelEntity> {
  constructor() {
    super();
  }
}
