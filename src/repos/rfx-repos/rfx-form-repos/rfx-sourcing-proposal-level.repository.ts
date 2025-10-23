import { RfxSourcingProposalLevelEntity } from "src/entities/rfx/rfx-form/rfx-proposal-approval/rfx-proposal.approval-level";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(RfxSourcingProposalLevelEntity)
export class RfxSourcingProposalLevelEntityRepository extends Repository<RfxSourcingProposalLevelEntity> {
  constructor() {
    super();
  }
}