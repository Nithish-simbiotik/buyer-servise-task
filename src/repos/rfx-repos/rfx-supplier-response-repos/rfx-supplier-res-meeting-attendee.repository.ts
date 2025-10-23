import { RfxEntity } from 'src/entities/rfx/rfx-form/rfx.entity';
import { RfxSupplierResponseMeetingAttendeeEntity } from 'src/entities/rfx/rfx-supplier-response/rfx-supplier-res-meeting-attendee.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxEntity)
export class RfxSupplierResponseMeetingAttendeeRepository extends Repository<RfxSupplierResponseMeetingAttendeeEntity> {
  constructor() {
    super();
  }
}
