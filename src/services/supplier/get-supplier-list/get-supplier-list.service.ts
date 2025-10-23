import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { PagingDto } from "src/dto/paging.dto";
import { SupplierRepository } from "src/repos/supplier-repos/supplier.repository";

@Injectable()
export class GetSupplierListService {
  constructor(
    @InjectRepository(SupplierRepository)
    private supplierRepository: SupplierRepository
  ) {}

  public async getAllSupplierList(res: Response, pagingDto: PagingDto) {
    return await this.supplierRepository.getAllSupplierList(res, pagingDto);
  }
  public async getSupplierListDrop(query: Pick<PagingDto, 'keyword'>){
    return await this.supplierRepository.getSupplierList(query)
  }
}
