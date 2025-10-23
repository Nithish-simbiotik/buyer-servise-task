import {
  EntityRepository,
  Repository,
  getRepository,
  Not,
  In,
  Raw,
} from "typeorm";

import { Response } from "express";
import { HttpStatus, HttpException } from "@nestjs/common";
import { SupplierRoleEntity } from "src/entities/supplier/supplier-role.entity";
import { SupplierRoleDto } from "src/dto/supplier/supplier-role.dto";
import { SupplierEntity } from "src/entities/supplier/supplier.entity";
import { SupplierModuleAccessEntity } from "src/entities/supplier/supplier-module-acces.entity";
import { PagingDto } from "src/dto/paging.dto";
import { ExportDto } from "src/dto/export.dto";

@EntityRepository(SupplierRoleEntity)
export class SupplierRoleRepository extends Repository<SupplierRoleEntity> {
  /**
   *Create Supplier Role
   */
  public async createSupplierRole(
    supplierRoleDto: SupplierRoleDto
  ): Promise<SupplierRoleEntity> {
    const newSupplierRole = new SupplierRoleEntity();
    const {
      supplierRoleName,
      status,
      supplierSelection,
      supplierId,
      moduleAccessRightsId,
      userAccessRights,
      createdBy,
    } = supplierRoleDto;

    const getSupplierRole = await getRepository(SupplierRoleEntity).findOne({
      where: {
        supplier_role_name: Raw(
          (alias) => `${alias} ILIKE '%${supplierRoleName}%'`
        ),
      },
    });

    newSupplierRole.supplierRoleName = supplierRoleName;
    newSupplierRole.status = status;
    newSupplierRole.supplierSelection = supplierSelection;
    newSupplierRole.supplierId = supplierId;
    newSupplierRole.moduleAccessRightsId = moduleAccessRightsId;
    newSupplierRole.createdBy = createdBy;
    newSupplierRole.updatedAt = null;
    newSupplierRole.updatedBy = null;
    const suppliers = await getRepository(SupplierEntity).find({
      where: { id: In(supplierId) },
    });
    suppliers.forEach((supplier) => {
      newSupplierRole.addSupplier(supplier);
    });
    newSupplierRole.selectedSuppliers = suppliers.map(
      (supplier) => supplier.companyName
    );
    const access_rights = await getRepository(SupplierModuleAccessEntity).find({
      where: { id: In(moduleAccessRightsId) },
    });
    access_rights.forEach((right) => {
      newSupplierRole.addSupplierModule(right);
    });
    newSupplierRole.userAccessRights = userAccessRights;
    if (getSupplierRole && newSupplierRole.status === "Inactive") {
      await this.save(newSupplierRole);
      return newSupplierRole;
    } else if (!getSupplierRole) {
      await this.save(newSupplierRole);
      return newSupplierRole;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: "Supplier Role already exists",
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
  }

  /**
   *Supplier Role Listing
   */
  public async getAllSupplierRoleList(res: Response, pagingDto: PagingDto) {
    const qb = this.createQueryBuilder("list")
      //   .leftJoinAndSelect("list.suppliers", "suppliers")
      //   .leftJoinAndSelect("list.module_access_rights", "module_access_rights")
      .orderBy(`list."createdAt"`, "DESC");
    const keyword = pagingDto.keyword || "";
    qb.where(`"supplierRoleName" ILIKE :q`, { q: `%${keyword}%` })
      .orWhere(`"selectedSuppliers" ILIKE :q`, {
        q: `%${keyword}%`,
      })
      .orWhere("list.status LIKE :q", { q: `%${keyword}%` });
    const page: number = pagingDto.page || 1;
    const limit: number = pagingDto.size || 10;
    const total = await qb.getCount();
    qb.offset((page - 1) * limit).limit(limit);
    const data = await qb.getMany();
    console.log(data.length);
    return res.send({
      data: await qb.getMany(),
      total,
      page,
    });
  }

  /**
   *Export Supplier Role
   */
  public async exportSupplierRoleList(
    exportDto: ExportDto
  ): Promise<SupplierRoleEntity[]> {
    const keyword = exportDto.keyword || "";
    return await this.createQueryBuilder("list")
      // .leftJoinAndSelect("list.suppliers", "suppliers")
      .where(`supplierRoleName ILIKE :q`, { q: `%${keyword}%` })
      .orWhere(`selectedSuppliers ILIKE :q`, { q: `%${keyword}%` })
      .orWhere(`list.status LIKE :q`, { q: `%${keyword}%` })
      .orderBy("list.createdAt", "DESC")
      .getMany();
  }

  /**
   *Single Supplier Role Listing
   */
  public async getSingleSupplierRole(
    supplier_role_id: number
  ): Promise<SupplierRoleEntity> {
    return await this.createQueryBuilder("role")
      // .leftJoinAndSelect("role.suppliers", "suppliers")
      // .leftJoinAndSelect("role.module_access_rights", "module_access_rights")
      .where("role.id = :supplier_role_id", { supplier_role_id })
      .getOne();
  }

  /**
   * Update Supplier Role
   */
  public async updateSupplierRole(
    supplier_role_id: number,
    supplierRoleDto: SupplierRoleDto
  ): Promise<SupplierRoleEntity> {
    const updateSupplierRole = await this.findOne(supplier_role_id);
    const {
      supplierRoleName,
      status,
      supplierSelection,
      supplierId,
      moduleAccessRightsId,
      userAccessRights,
      updatedBy,
    } = supplierRoleDto;
    const getSupplierRole = await getRepository(SupplierRoleEntity).findOne({
      where: {
        id: Not(supplier_role_id),
        supplierRoleName: Raw(
          (alias) => `${alias} ILIKE '%${supplierRoleName}%'`
        ),
      },
    });
    updateSupplierRole.supplierRoleName = supplierRoleName;
    updateSupplierRole.status = status;
    updateSupplierRole.supplierSelection = supplierSelection;
    updateSupplierRole.supplierId = supplierId;
    updateSupplierRole.moduleAccessRightsId = moduleAccessRightsId;
    updateSupplierRole.updatedAt = new Date();
    updateSupplierRole.updatedBy = updatedBy;
    const suppliers = await getRepository(SupplierEntity).find({
      where: { id: In(supplierId) },
    });
    suppliers.forEach((supplier) => {
      updateSupplierRole.addSupplier(supplier);
    });
    updateSupplierRole.selectedSuppliers = suppliers.map(
      (supplier) => supplier.companyName
    );
    const access_rights = await getRepository(SupplierModuleAccessEntity).find({
      where: { id: In(moduleAccessRightsId) },
    });
    access_rights.forEach((right) => {
      updateSupplierRole.addSupplierModule(right);
    });
    updateSupplierRole.userAccessRights = userAccessRights;
    if (getSupplierRole && updateSupplierRole.status === "Inactive") {
      await this.save(updateSupplierRole);
      return updateSupplierRole;
    } else if (!getSupplierRole) {
      await this.save(updateSupplierRole);
      return updateSupplierRole;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: "Supplier Role already exists",
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
  }
}
