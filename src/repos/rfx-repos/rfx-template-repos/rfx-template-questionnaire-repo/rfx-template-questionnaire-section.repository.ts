import { RfxTemplateQuestionnaireSectionEntity } from 'src/entities/rfx/rfx-template/rfx-template-questionnaire/rfx-template-questionnaire-section.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTemplateQuestionnaireSectionEntity)
export class RfxTemplateQuestionnaireSectionRepository extends Repository<RfxTemplateQuestionnaireSectionEntity> {
  constructor() {
    super();
  }
}
