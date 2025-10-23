import { RfxTemplateEntity } from 'src/entities/rfx/rfx-template/rfx-template.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTemplateEntity)
export class RfxTemplateRepository extends Repository<RfxTemplateEntity> {
  constructor() {
    super();
  }
}
