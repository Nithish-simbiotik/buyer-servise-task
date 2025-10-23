import { PRTemplateApprovalLevelEntity } from 'src/entities/prTemplates/prTemplateApprovalRoute/prTemplateApprovalLevel.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PRTemplateApprovalLevelEntity)
export class PrTemplateApprovalLevelRepository extends Repository<PRTemplateApprovalLevelEntity> {
  constructor() {
    super();
  }
}
