import { Injectable } from '@nestjs/common';
import { RfxTemplateSourcingProposalRoute } from 'src/dto/rfx-template/create.rfx.template.dto';
import { RfxTemplateSourcingProposalRouteEntity } from 'src/entities/rfx/rfx-template/rfx-template-sourcing-proposal-route/rfx-template-sourcing-proposal-route.entity';
import { RfxTemplateSourcingProposalRouteLevelRepository } from 'src/repos/rfx-repos/rfx-template-repos/rfx-template-sourcing-proposal-repo/rfx-template-sourcing-proposal-route-level.repository';
import { RfxTemplateSourcingProposalRouteRepository } from 'src/repos/rfx-repos/rfx-template-repos/rfx-template-sourcing-proposal-repo/rfx-template-sourcing-proposal-route.repository';

@Injectable()
export class ManageRfxTemplateProposalRouteService {
  constructor(
    private sourcingProposalRouteRepo: RfxTemplateSourcingProposalRouteRepository,
    private sourcingProposalRouteLevelRepo: RfxTemplateSourcingProposalRouteLevelRepository,
  ) {}

  async addProposalRoute(
    proposalRoute: RfxTemplateSourcingProposalRoute,
  ): Promise<RfxTemplateSourcingProposalRouteEntity> {
    const newProposalRoute =
      this.sourcingProposalRouteRepo.create(proposalRoute);

    // add levels to proposal routing
    if (proposalRoute.proposalLevels.length) {
      const proposalRoutingLevels = proposalRoute.proposalLevels.map((level) =>
        this.sourcingProposalRouteLevelRepo.create({
          levelName: level.levelName,
          userId: level.userId,
        }),
      );

      await this.sourcingProposalRouteLevelRepo.save(proposalRoutingLevels);

      newProposalRoute.proposalLevels = proposalRoutingLevels;
    }
    return await this.sourcingProposalRouteRepo.save(newProposalRoute);
  }
}
