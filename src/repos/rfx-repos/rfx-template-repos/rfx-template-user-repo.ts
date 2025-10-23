import { RfxTemplateUserEntity } from 'src/entities/rfx/rfx-template/rfx-template-user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTemplateUserEntity)
export class RfxTemplateUserRepository extends Repository<RfxTemplateUserEntity> {
  constructor() {
    super();
  }
}
