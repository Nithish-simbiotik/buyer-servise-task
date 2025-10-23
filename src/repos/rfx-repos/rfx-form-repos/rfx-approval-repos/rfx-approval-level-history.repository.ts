import { RfxApprovalLevelHistoryEntity } from 'src/entities/rfx/rfx-form/rfx-approvals/rfx-approval-level-history.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxApprovalLevelHistoryEntity)
export class RfxApprovalLevelHistoryEntityRepository extends Repository<RfxApprovalLevelHistoryEntity> {
  constructor() {
    super();
  }
}
