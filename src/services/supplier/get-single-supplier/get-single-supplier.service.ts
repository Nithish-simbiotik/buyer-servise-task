import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplierEntity } from "src/entities/supplier/supplier.entity";
import { SupplierRepository } from "src/repos/supplier-repos/supplier.repository";


@Injectable()
export class GetSingleSupplierService {
  constructor(
    @InjectRepository(SupplierRepository)
    private supplierRepository: SupplierRepository
  ) {}

  public async getSingleSupplier(supplier_id: number): Promise<SupplierEntity> {
    const supplier = this.supplierRepository.getSingleSupplier(supplier_id);
    if (!supplier) {
      throw new NotFoundException("Supplier not found");
    }
    return supplier;
  }
}
