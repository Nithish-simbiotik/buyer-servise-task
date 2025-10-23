import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierRoleDto } from "src/dto/supplier/supplier-role.dto";
import { SupplierRoleEntity } from "src/entities/supplier/supplier-role.entity";
import { SupplierRoleRepository } from "src/repos/supplier-repos/supplier-role.repository";


@Injectable()
export class CreateSupplierRoleService {
  constructor(
    @InjectRepository(SupplierRoleRepository)
    private supplierRoleRepository: SupplierRoleRepository
  ) {}

  public async createSupplierRole(
    supplierRoleDto: SupplierRoleDto
  ): Promise<SupplierRoleEntity> {
    try {
      const newSupplierRole =
        await this.supplierRoleRepository.createSupplierRole(supplierRoleDto);
      return newSupplierRole;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
