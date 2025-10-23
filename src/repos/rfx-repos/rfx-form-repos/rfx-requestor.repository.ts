import { RfxRequestorEntity } from 'src/entities/rfx/rfx-form/rfx-requestor.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxRequestorEntity)
export class RfxRequestorRepository extends Repository<RfxRequestorEntity> {
  constructor() {
    super();
  }
}
