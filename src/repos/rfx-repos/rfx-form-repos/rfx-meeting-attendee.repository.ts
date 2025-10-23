import { RfxMeetingAttendeeEntity } from 'src/entities/rfx/rfx-form/rfx-meeting-attendee.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxMeetingAttendeeEntity)
export class RfxMeetingAttendeeRepository extends Repository<RfxMeetingAttendeeEntity> {
  constructor() {
    super();
  }
}
