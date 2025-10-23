import { RfxSupplierResponseMessageEntity } from 'src/entities/rfx/rfx-supplier-response/rfx-supplier-res-message/rfx-supplier-res-message.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxSupplierResponseMessageEntity)
export class RfxSupplierResponseMessageRepository extends Repository<RfxSupplierResponseMessageEntity> {
  constructor() {
    super();
  }
}
