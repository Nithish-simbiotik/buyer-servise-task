import { RfxBillOfQuantityEntity } from "src/entities/rfx/rfx-form/rfx-billofquantity.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(RfxBillOfQuantityEntity)
export class RfxBillOfQuantityEntityRepository extends Repository<RfxBillOfQuantityEntity> {
  constructor() {
    super();
  }
}