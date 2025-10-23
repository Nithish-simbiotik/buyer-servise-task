import { RfxTemplateEnvelopeAttachementEntity } from 'src/entities/rfx/rfx-template/rfx-template-envelope/rfx-template-envelope-attachment.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTemplateEnvelopeAttachementEntity)
export class RfxTemplateEnvelopeAttachmentRepository extends Repository<RfxTemplateEnvelopeAttachementEntity> {
  constructor() {
    super();
  }
}
