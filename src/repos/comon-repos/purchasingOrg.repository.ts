import { PurchaseOrgEntity } from 'src/entities/masterData/purchaseOrg.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PurchaseOrgEntity)
export class PurchaseOrgRepository extends Repository<PurchaseOrgEntity> {
  constructor() {
    super();
  }
}
