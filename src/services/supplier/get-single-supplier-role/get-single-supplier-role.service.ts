import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierRoleEntity } from "src/entities/supplier/supplier-role.entity";
import { SupplierRoleRepository } from "src/repos/supplier-repos/supplier-role.repository";


@Injectable()
export class GetSingleSupplierRoleService {
  constructor(
    @InjectRepository(SupplierRoleRepository)
    private supplierRoleRepository: SupplierRoleRepository
  ) {}

  public async getSingleSupplierRole(
    supplier_role_id: number
  ): Promise<SupplierRoleEntity> {
    const supplier_role =
      this.supplierRoleRepository.getSingleSupplierRole(supplier_role_id);
    if (!supplier_role) {
      throw new NotFoundException("Role not found");
    }
    return supplier_role;
  }
}
