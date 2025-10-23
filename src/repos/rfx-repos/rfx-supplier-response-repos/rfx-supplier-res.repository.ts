import { RfxSupplierResponseEntity } from 'src/entities/rfx/rfx-supplier-response/rfx-supplier-res.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxSupplierResponseEntity)
export class RfxSupplierResponseRepository extends Repository<RfxSupplierResponseEntity> {
  constructor() {
    super();
  }
}
