import { RfxTemplateQuestionnaireEntity } from 'src/entities/rfx/rfx-template/rfx-template-questionnaire/rfx-template-questionnaire.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTemplateQuestionnaireEntity)
export class RfxTemplateQuestionnaireRepository extends Repository<RfxTemplateQuestionnaireEntity> {
  constructor() {
    super();
  }
}
