import { Injectable } from '@nestjs/common';
import { RfxSupplierResponseDto } from 'src/dto/rfx-supplier-response/rfx-supplier-res.dto';
import { SupplierStatus } from 'src/enum/rfx/rfx-form-status.enum';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { RfxSupplierResponseRepository } from 'src/repos/rfx-repos/rfx-supplier-response-repos/rfx-supplier-res.repository';
import { ManageSupplierService } from '../../manage-rfx-form/manage-supplier/manage-supplier.service';

@Injectable()
export class AddRfxSupplierResponseService {
  constructor(
    private rfxSupplierResponseRepo: RfxSupplierResponseRepository,
    private manageSupplierService: ManageSupplierService,
  ) {}

  async createRfxSupplierResponse(
    supplierResponse: RfxSupplierResponseDto,
    supplierUser: JwtPayload,
  ) {
    supplierResponse.supplierId = supplierUser.userId;

    const newSupplier = await this.rfxSupplierResponseRepo.save(
      this.rfxSupplierResponseRepo.create(supplierResponse),
    );

    const supplierStatus =
      await this.manageSupplierService.updateSupplierStatus(
        supplierResponse.rfxSupplierId,
        newSupplier.supplierId,
        { status: SupplierStatus.SUBMITTED },
      );

    return {
      newSupplier,
      supplierStatus,
    };
  }

  async updateRfxSupplierResponse(
    supplierResponse: RfxSupplierResponseDto,
    user: JwtPayload,
  ) {
    return await this.rfxSupplierResponseRepo.save(supplierResponse);
  }
}
