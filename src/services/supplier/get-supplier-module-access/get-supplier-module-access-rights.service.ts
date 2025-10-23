import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { PagingDto } from "src/dto/paging.dto";
import { SupplierModuleAccessRightsRepository } from "src/repos/supplier-repos/supplier-module-access-rights.repository";

@Injectable()
export class GetSupplierModuleAccessService {
  constructor(
    @InjectRepository(SupplierModuleAccessRightsRepository)
    private moduleAccessRightsRepository: SupplierModuleAccessRightsRepository
  ) {}

  public async getModuleAccess(res: Response, pagingDto: PagingDto) {
    const moduleAccess =
      await this.moduleAccessRightsRepository.getModuleAccessRights(
        res,
        pagingDto
      );
    if (!moduleAccess) {
      throw new NotFoundException("Module not found");
    }
  }
}
