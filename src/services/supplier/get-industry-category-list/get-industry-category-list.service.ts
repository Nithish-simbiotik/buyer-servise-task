import { Injectable } from "@nestjs/common";
import { IndustryCategoryEntity } from "src/entities/supplier/industry-category.entity";

import { getRepository } from "typeorm";

@Injectable()
export class GetIndustryCategoryListService {
	constructor() {}

	public async getIndustryCategoryList(): Promise<IndustryCategoryEntity[]> {
		return getRepository(IndustryCategoryEntity).find();
	}
}
