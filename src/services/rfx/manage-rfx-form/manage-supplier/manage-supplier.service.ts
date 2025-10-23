import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RfxSupplierInvitationDto } from 'src/dto/rfx-form/rfx-from-supplier-invitation-status.dto';
import { SupplierStatus } from 'src/enum/rfx/rfx-form-status.enum';
import { RfxSelectedSupplierRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx-form-selected-supplier.repository';
import { RfxSupplierRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx-supplier.repository';

@Injectable()
export class ManageSupplierService {
    constructor(
        @InjectRepository(RfxSupplierRepository)
        private supplierRepo: RfxSupplierRepository,
        @InjectRepository(RfxSelectedSupplierRepository)
        private selectedSupplierRepo: RfxSelectedSupplierRepository,

    ) {
    }
    async getAllSupplierByRfx(rfxId: number) {
        return this.supplierRepo.findOne({ rfxId: rfxId })
    }
    async updateAllSupplier(rfxId: number) {

        const supplier = await this.getAllSupplierByRfx(rfxId)
        console.log("supplier", supplier);

        return this.selectedSupplierRepo.update({ rfxSupplierId: supplier.id }, { status: SupplierStatus.INVITED })
    }
    /**
     * 
     * @param rfxSupplierId  primary key rfx supplier table
     * @param supplierId     primaryKey supplier
     * @param dto            updating key
     * @returns 
     */
    async updateSupplierStatus(rfxSupplierId: number, supplierId: number, dto: RfxSupplierInvitationDto) {
        if (dto.status == SupplierStatus.PREVIEWED) {
            dto.previewedDate = new Date()
        } else if (dto.status == SupplierStatus.SUBMITTED) {
            dto.isSubmited = true;
            dto.submitedDate = new Date()

        } else if (dto.status == SupplierStatus.ACCEPTED) {
            dto.isAccepted = true
            dto.invitationActionDate = new Date();
        } else {
            dto.isRejected = true;
            dto.invitationActionDate = new Date();

        }
        let updatedStatus = await this.selectedSupplierRepo.update({ rfxSupplierId: rfxSupplierId, supplierId: supplierId }, dto)
        if (updatedStatus.affected != 0) {
            if (dto.status == SupplierStatus.REJECTED) {
                //to do send email to buyer

            }
            return { message: `Invitation successfully ${dto.status}` }
        } else {
            return { message: `Invitation action failed` }

        }

    }

}
