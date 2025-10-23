import { RfxTemplateTeamMemberEntity } from 'src/entities/rfx/rfx-template/rfx-template-team-member.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTemplateTeamMemberEntity)
export class RfxTemplateTeamMemberRepository extends Repository<RfxTemplateTeamMemberEntity> {
  constructor() {
    super();
  }
}
