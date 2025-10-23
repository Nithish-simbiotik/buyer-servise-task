import { Injectable } from "@nestjs/common";
import { SupplierTagsEntity } from "src/entities/supplier/supplier-tag.entity";
import { getRepository } from "typeorm";

@Injectable()
export class GetSingleSupplierTagService {
	constructor() {}

	public async getSingleSupplierTag(
		supplier_tag_id: number
	): Promise<SupplierTagsEntity> {
		return getRepository(SupplierTagsEntity).findOne(supplier_tag_id);
	}
}
