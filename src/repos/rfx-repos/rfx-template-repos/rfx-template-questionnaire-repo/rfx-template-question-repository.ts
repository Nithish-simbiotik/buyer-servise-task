import { RfxTemplateQuestionEntity } from 'src/entities/rfx/rfx-template/rfx-template-questionnaire/rfx-template-question.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTemplateQuestionEntity)
export class RfxTemplateQuestionRepository extends Repository<RfxTemplateQuestionEntity> {
  constructor() {
    super();
  }
}
