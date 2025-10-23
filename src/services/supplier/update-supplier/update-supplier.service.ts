import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierDto } from "src/dto/supplier/supplier.dto";
import { SupplierEntity } from "src/entities/supplier/supplier.entity";
import { SupplierRepository } from "src/repos/supplier-repos/supplier.repository";



@Injectable()
export class UpdateSupplierService {
	constructor(
		@InjectRepository(SupplierRepository)
		private supplierRepository: SupplierRepository
	) {}

	public async update(
		supplier_id: number,
		supplierDto: SupplierDto
	): Promise<SupplierEntity> {
		try {
			const updateSupplier = await this.supplierRepository.updateSupplier(
				supplier_id,
				supplierDto
			);
			return updateSupplier;
		} catch (err) {
			throw new HttpException(err, HttpStatus.BAD_REQUEST);
		}
	}
}
