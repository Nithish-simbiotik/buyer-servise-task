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
export class CreateSupplierModuleAccessService {
  constructor(
    @InjectRepository(SupplierModuleAccessRightsRepository)
    private supplierModuleAccessRightsRepository: SupplierModuleAccessRightsRepository
  ) {}

  public async create(
    supplierModuleAccessRightsDto: SupplierModuleAccessRightsDto
  ): Promise<SupplierModuleAccessEntity> {
    try {
      const newModuleAccessRight =
        await this.supplierModuleAccessRightsRepository.createSupplierModuleAccessRights(
          supplierModuleAccessRightsDto
        );
      return newModuleAccessRight;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
