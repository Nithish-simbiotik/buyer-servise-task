import { RfxApprovalLevelEntity } from 'src/entities/rfx/rfx-form/rfx-approvals/rfx-approval-level';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxApprovalLevelEntity)
export class RfxApprovalLevelEntityRepository extends Repository<RfxApprovalLevelEntity> {
  constructor() {
    super();
  }
}
