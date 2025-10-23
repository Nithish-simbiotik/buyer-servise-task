import { RfxEnvelopeEntity } from 'src/entities/rfx/rfx-form/rfx-envelope.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxEnvelopeEntity)
export class RfxEnvelopeRepository extends Repository<RfxEnvelopeEntity> {
  constructor() {
    super();
  }
}
