import { PrTemplateApprovalEntity } from 'src/entities/prTemplates/prTemplateApprovalRoute/prTemplateApproval.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PrTemplateApprovalEntity)
export class PrTemplateApprovalRepository extends Repository<PrTemplateApprovalEntity> {
  constructor() {
    super();
  }
}
