
import { CategorySupplierDto } from "src/dto/supplier/supplier.dto";
import { SupplierCategoryEntity } from "src/entities/supplier/supplier-category.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(SupplierCategoryEntity)
export class SupplierCategoryRepository extends Repository<SupplierCategoryEntity> {
  constructor() {
    super();
  }
  async createCategorySupplier(
    dto: CategorySupplierDto
  ): Promise<SupplierCategoryEntity> {
    let supplier = this.create(dto);
    return await supplier.save();
  }
}
