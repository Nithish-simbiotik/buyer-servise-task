import { RfxApprovalEntity } from 'src/entities/rfx/rfx-form/rfx-approvals/rfx-approval.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxApprovalEntity)
export class RfxApprovalEntityRepository extends Repository<RfxApprovalEntity> {
  constructor() {
    super();
  }
}
