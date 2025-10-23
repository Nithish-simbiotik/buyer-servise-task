import { PrTemplateTeamMembersEntity } from 'src/entities/prTemplates/prTemplateTeamMembers.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PrTemplateTeamMembersEntity)
export class PrTeamMembersRepository extends Repository<PrTemplateTeamMembersEntity> {
  constructor() {
    super();
  }
}
