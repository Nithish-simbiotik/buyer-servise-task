import {
  EntityRepository,
  Repository,
  Like,
  getRepository,
  Not,
  Raw,
} from "typeorm";

import { Request, Response } from "express";
// import { PagingDto } from "src/common/dto/paging.dto";
import { SupplierModuleAccessEntity } from "src/entities/supplier/supplier-module-acces.entity";
import { PagingDto } from "src/dto/paging.dto";
import { ExportDto } from "src/dto/export.dto";
import { SupplierModuleAccessRightsDto } from "src/dto/supplier/supplier-module-access-rights.dto";
import { HttpException, HttpStatus } from "@nestjs/common";

@EntityRepository(SupplierModuleAccessEntity)
export class SupplierModuleAccessRightsRepository extends Repository<SupplierModuleAccessEntity> {
  constructor() {
    super();
  }
  /**
   *get Supplier ModuleAccessRights.
   */
  public async getModuleAccessRights(res: Response, pagingDto: PagingDto) {
    const qb = this.createQueryBuilder("list").orderBy(
      "list.createdAt",
      "DESC"
    );
    const keyword = pagingDto.keyword || "";
    qb.where(`"accessRightName" ILIKE :q`, {
      q: `%${keyword}%`,
    }).orWhere(`"status" LIKE :q`, { q: `%${keyword}%` });
    const page: number = pagingDto.page || 10;
    const limit: number = pagingDto.size || 1;
    const total = await qb.getCount();
    qb.offset((page - 1) * limit).limit(limit);

    return res.send({
      data: await qb.getMany(),
      total,
      page,
    });
  }

  /**
   * Export Supplier ModuleAccessRights
   */
  public async exportModuleAccessRights(
    exportDto: ExportDto
  ): Promise<SupplierModuleAccessEntity[]> {
    const keyword = exportDto.keyword || "";
    return await this.createQueryBuilder("list")
      .where(`accessRightName ILIKE :q`, {
        q: `%${keyword}%`,
      })
      .orWhere(`LOWER(status) LIKE LOWER(:q)`, { q: `%${keyword}%` })
      .orderBy("list.createdAt", "DESC")
      .getMany();
  }

  /**
   *get Single Supplier ModuleAccessRights
   */
  public async getSingleModuleAccessRight(
    supplier_module_access_id: number
  ): Promise<SupplierModuleAccessEntity> {
    return await this.findOne(supplier_module_access_id);
  }

  /**
   *create Supplier ModuleAccessRights
   */
  public async createSupplierModuleAccessRights(
    supplierModuleAccessDto: SupplierModuleAccessRightsDto
  ): Promise<SupplierModuleAccessEntity> {
    const { accessRightName, status, userAccessRights, createdBy } =
      supplierModuleAccessDto;
    const newModuleAccess = new SupplierModuleAccessEntity();
    const getSupplierModule = await getRepository(
      SupplierModuleAccessEntity
    ).findOne({
      where: {
        accessRightName: Raw(
          (alias) => `${alias} ILIKE '%${accessRightName}%'`
        ),
      },
    });
    newModuleAccess.accessRightName = accessRightName;
    newModuleAccess.status = status;
    newModuleAccess.userAccessRights = userAccessRights;
    newModuleAccess.createdBy = createdBy;
    newModuleAccess.updatedAt = null;
    newModuleAccess.updatedBy = null;

    if (getSupplierModule && newModuleAccess.status === "Inactive") {
      await this.save(newModuleAccess);
      return newModuleAccess;
    } else if (!getSupplierModule) {
      await this.save(newModuleAccess);
      return newModuleAccess;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: "Supplier Module already exists",
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
  }

  /**
   *update Supplier ModuleAccessRights
   */
  public async updateModuleAccessRights(
    supplier_module_access_id: number,
    supplierModuleAccessDto: SupplierModuleAccessRightsDto
  ): Promise<SupplierModuleAccessEntity> {
    const { accessRightName, status, userAccessRights, updatedBy } =
      supplierModuleAccessDto;
    const updateSupplierModuleAccess = await this.findOne(
      supplier_module_access_id
    );
    const getSupplierModule = await getRepository(
      SupplierModuleAccessEntity
    ).findOne({
      where: {
        id: Not(supplier_module_access_id),
        access_right_name: Raw(
          (alias) => `${alias} ILIKE '%${accessRightName}%'`
        ),
      },
    });

    updateSupplierModuleAccess.accessRightName = accessRightName;
    updateSupplierModuleAccess.status = status;
    updateSupplierModuleAccess.userAccessRights = userAccessRights;
    updateSupplierModuleAccess.updatedAt = new Date();
    updateSupplierModuleAccess.updatedBy = updatedBy;
    if (getSupplierModule && updateSupplierModuleAccess.status === "Inactive") {
      await this.save(updateSupplierModuleAccess);
      return updateSupplierModuleAccess;
    } else if (!getSupplierModule) {
      await this.save(updateSupplierModuleAccess);
      return updateSupplierModuleAccess;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: "Supplier Module already exists",
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
  }
}
