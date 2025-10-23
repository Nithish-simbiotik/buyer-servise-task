import { RfxSupplierEntity } from 'src/entities/rfx/rfx-form/rfx-supplier.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxSupplierEntity)
export class RfxSupplierRepository extends Repository<RfxSupplierEntity> {
  constructor() {
    super();
  }
  async findOneSupplier(rfxId:number){
    return await this.findOne({rfxId:rfxId})
  }
}
