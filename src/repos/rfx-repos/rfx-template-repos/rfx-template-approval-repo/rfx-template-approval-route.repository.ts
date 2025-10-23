import { RfxTemplateApprovalRouteEntity } from 'src/entities/rfx/rfx-template/rfx-template-approval-route/rfx-template-approval-route.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTemplateApprovalRouteEntity)
export class RfxTemplateApprovalRouteRepository extends Repository<RfxTemplateApprovalRouteEntity> {
  constructor() {
    super();
  }
}
