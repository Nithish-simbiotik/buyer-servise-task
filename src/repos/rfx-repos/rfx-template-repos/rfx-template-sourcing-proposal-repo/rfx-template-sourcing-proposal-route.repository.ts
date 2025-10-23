import { RfxTemplateSourcingProposalRouteEntity } from 'src/entities/rfx/rfx-template/rfx-template-sourcing-proposal-route/rfx-template-sourcing-proposal-route.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTemplateSourcingProposalRouteEntity)
export class RfxTemplateSourcingProposalRouteRepository extends Repository<RfxTemplateSourcingProposalRouteEntity> {
  constructor() {
    super();
  }
}
