import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { SupplierCatUpdateDto } from "src/dto/supplier/supplier.dto";
import { SupplierCategoryRepository } from "src/repos/supplier-repos/supplier-category.repository";


@Injectable()
export class UpdateCategorySupplierService {
  constructor(
    @InjectRepository(SupplierCategoryRepository)
    private supplierCategoryRepository: SupplierCategoryRepository
  ) {}

  async updateSupplierCat(
    res: Response,
    id: number,
    supplier: SupplierCatUpdateDto
  ) {
    supplier.id = Number(supplier.id);
    let SupplierCat = this.supplierCategoryRepository.create(supplier);
    let data = await SupplierCat.save();
    return res.send(data);
  }
}
