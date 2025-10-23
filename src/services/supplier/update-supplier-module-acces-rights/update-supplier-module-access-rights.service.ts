import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierModuleAccessRightsDto } from "src/dto/supplier/supplier-module-access-rights.dto";
import { SupplierModuleAccessEntity } from "src/entities/supplier/supplier-module-acces.entity";
import { SupplierModuleAccessRightsRepository } from "src/repos/supplier-repos/supplier-module-access-rights.repository";

@Injectable()
export class UpdateSupplierModuleAccessService {
  constructor(
    @InjectRepository(SupplierModuleAccessRightsRepository)
    private suppliermoduleAccessRightsRepository: SupplierModuleAccessRightsRepository
  ) {}

  public async update(
    supplier_module_access_id: number,
    supplierModuleAccessRightsDto: SupplierModuleAccessRightsDto
  ): Promise<SupplierModuleAccessEntity> {
    try {
      const updateModuleAccessRight =
        await this.suppliermoduleAccessRightsRepository.updateModuleAccessRights(
          supplier_module_access_id,
          supplierModuleAccessRightsDto
        );
      return updateModuleAccessRight;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
