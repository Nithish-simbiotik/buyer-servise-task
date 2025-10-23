import { RfxTemplateApprovalRouteLevelEntity } from 'src/entities/rfx/rfx-template/rfx-template-approval-route/rfx-template-approval-route-level.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTemplateApprovalRouteLevelEntity)
export class RfxTemplateApprovalRouteLevelRepository extends Repository<RfxTemplateApprovalRouteLevelEntity> {
  constructor() {
    super();
  }
}
