import { PrECAPEXTemplateApprovalEntity } from 'src/entities/prTemplates/prTemplateECAPEXApprovalRoute/prTemplateECAPEXApproval.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PrECAPEXTemplateApprovalEntity)
export class PrTemplateECAPEXApprovalRepository extends Repository<PrECAPEXTemplateApprovalEntity> {
  constructor() {
    super();
  }
}
