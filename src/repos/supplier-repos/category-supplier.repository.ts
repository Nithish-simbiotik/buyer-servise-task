import { CategorySupplierEntity } from "src/entities/supplier/category-supplier.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(CategorySupplierEntity)
export class CategorySupplierRepository extends Repository<CategorySupplierEntity> {
    constructor() {
        super();
    }
}