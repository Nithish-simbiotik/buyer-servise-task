import { RfxTemplateQuestionAttachementEntity } from 'src/entities/rfx/rfx-template/rfx-template-questionnaire/rfx-template-question-attachment.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTemplateQuestionAttachementEntity)
export class RfxTemplateQuestionAttachmentRepository extends Repository<RfxTemplateQuestionAttachementEntity> {
  constructor() {
    super();
  }
}
