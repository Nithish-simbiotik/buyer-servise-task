import { RfxTemplateEnvelopeEntity } from 'src/entities/rfx/rfx-template/rfx-template-envelope/rfx-template-envelope.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTemplateEnvelopeEntity)
export class RfxTemplateEnvelopeRepository extends Repository<RfxTemplateEnvelopeEntity> {
  constructor() {
    super();
  }
}
