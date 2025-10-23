import { RfxSelectedSupplierEntity } from "src/entities/rfx/rfx-form/rfx-selected-supplier.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(RfxSelectedSupplierEntity)
export class RfxSelectedSupplierRepository extends Repository<RfxSelectedSupplierEntity> {
    constructor() {
        super();
    }
}