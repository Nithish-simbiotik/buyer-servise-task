import { Injectable } from "@nestjs/common";
import { SupplierTagsEntity } from "src/entities/supplier/supplier-tag.entity";
import { getRepository } from "typeorm";

@Injectable()
export class GetSupplierTagsListService {
  constructor() {}

  public async getSupplierTagsList(): Promise<SupplierTagsEntity[]> {
    return getRepository(SupplierTagsEntity).find();
  }
}
