import { RfxTemplateUnmaskOwnerEntity } from 'src/entities/rfx/rfx-template/rfx-template-unmask-owner.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTemplateUnmaskOwnerEntity)
export class RfxTemplateUnmaskOwnerRepository extends Repository<RfxTemplateUnmaskOwnerEntity> {
  constructor() {
    super();
  }
}
