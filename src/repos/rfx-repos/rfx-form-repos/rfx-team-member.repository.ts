import { RfxTeamMemberEntity } from 'src/entities/rfx/rfx-form/rfx-team-member.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxTeamMemberEntity)
export class RfxTeamMemberRepository extends Repository<RfxTeamMemberEntity> {
  constructor() {
    super();
  }
}
