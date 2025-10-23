import { PrTemplateUserEntity } from 'src/entities/prTemplates/prTemplateUser.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PrTemplateUserEntity)
export class PrTemplateUserRepository extends Repository<PrTemplateUserEntity> {
  constructor() {
    super();
  }
}
