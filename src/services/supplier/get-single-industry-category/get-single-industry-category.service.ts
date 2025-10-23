import { Injectable } from "@nestjs/common";
import { IndustryCategoryEntity } from "src/entities/supplier/industry-category.entity";
import { getRepository } from "typeorm";

@Injectable()
export class GetSingleIndustryCategoryService {
	constructor() {}

	public async getSingleIndustryCategory(
		industry_category_id: number
	): Promise<IndustryCategoryEntity> {
		return getRepository(IndustryCategoryEntity).findOne(industry_category_id);
	}
}
