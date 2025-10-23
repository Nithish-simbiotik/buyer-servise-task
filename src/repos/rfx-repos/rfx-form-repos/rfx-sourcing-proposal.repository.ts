import { RfxSourcingProposalEntity } from "src/entities/rfx/rfx-form/rfx-proposal-approval/rfx-proposal-approval.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(RfxSourcingProposalEntity)
export class RfxSourcingProposalEntityRepository extends Repository<RfxSourcingProposalEntity> {
  constructor() {
    super();
  }
}