import { RfxTemplateConclusionOwnerEntity } from 'src/entities/rfx/rfx-template/rfx-template-conclusion-owner.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTemplateConclusionOwnerEntity)
export class RfxTemplateConclusionOwnerRepository extends Repository<RfxTemplateConclusionOwnerEntity> {
  constructor() {
    super();
  }
}
