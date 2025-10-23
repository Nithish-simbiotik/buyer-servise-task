import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierRoleDto } from "src/dto/supplier/supplier-role.dto";
import { SupplierRoleEntity } from "src/entities/supplier/supplier-role.entity";
import { SupplierRoleRepository } from "src/repos/supplier-repos/supplier-role.repository";

@Injectable()
export class UpdateSupplierRoleService {
  constructor(
    @InjectRepository(SupplierRoleRepository)
    private supplierRoleRepository: SupplierRoleRepository
  ) {}

  public async update(
    supplier_role_id: number,
    supplierRoleDto: SupplierRoleDto
  ): Promise<SupplierRoleEntity> {
    try {
      const updateSupplierRole =
        await this.supplierRoleRepository.updateSupplierRole(
          supplier_role_id,
          supplierRoleDto
        );
      return updateSupplierRole;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
