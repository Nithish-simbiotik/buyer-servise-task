import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierModuleAccessEntity } from "src/entities/supplier/supplier-module-acces.entity";
import { SupplierModuleAccessRightsRepository } from "src/repos/supplier-repos/supplier-module-access-rights.repository";

@Injectable()
export class GetSingleSupplierModuleAccessRight {
  constructor(
    @InjectRepository(SupplierModuleAccessRightsRepository)
    private supplierModuleAccessRightsRepository: SupplierModuleAccessRightsRepository
  ) {}

  public async getSingleUserModuleAccessRights(
    supplier_module_access_id: number
  ): Promise<SupplierModuleAccessEntity> {
    const supplier_module_right =
      this.supplierModuleAccessRightsRepository.getSingleModuleAccessRight(
        supplier_module_access_id
      );
    if (!supplier_module_right) {
      throw new NotFoundException("Supplier Module not found");
    }
    return supplier_module_right;
  }
}
