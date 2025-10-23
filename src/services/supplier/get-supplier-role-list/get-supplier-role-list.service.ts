import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { PagingDto } from "src/dto/paging.dto";
import { SupplierRoleRepository } from "src/repos/supplier-repos/supplier-role.repository";

@Injectable()
export class GetSupplierRoleListService {
  constructor(
    @InjectRepository(SupplierRoleRepository)
    private supplierRoleRepository: SupplierRoleRepository
  ) {}

  public async getAllSupplierRoles(res: Response, pagingDto: PagingDto) {
    const supplierRoleList =
      await this.supplierRoleRepository.getAllSupplierRoleList(res, pagingDto);
    if (!supplierRoleList) {
      throw new NotFoundException("Module not found");
    }
  }
}
