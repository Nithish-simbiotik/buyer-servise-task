import { RfxEnvelopeEvaluatorEntity } from 'src/entities/rfx/rfx-form/rfx-envelope-evaluator.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxEnvelopeEvaluatorEntity)
export class RfxEnvelopeEvaluatorRepository extends Repository<RfxEnvelopeEvaluatorEntity> {
  constructor() {
    super();
  }
}
