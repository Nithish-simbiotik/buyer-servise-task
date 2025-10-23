import { PReCAPEXTemplateApprovalLevelEntity } from 'src/entities/prTemplates/prTemplateECAPEXApprovalRoute/prTemplateECAPEXApprovalLevel.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PReCAPEXTemplateApprovalLevelEntity)
export class PrTemplateECAPEXApprovalLevelRepository extends Repository<PReCAPEXTemplateApprovalLevelEntity> {
  constructor() {
    super();
  }
}
