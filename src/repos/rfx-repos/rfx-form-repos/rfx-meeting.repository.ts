import { RfxMeetingEntity } from 'src/entities/rfx/rfx-form/rfx-meeting.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxMeetingEntity)
export class RfxMeetingRepository extends Repository<RfxMeetingEntity> {
  constructor() {
    super();
  }
}
