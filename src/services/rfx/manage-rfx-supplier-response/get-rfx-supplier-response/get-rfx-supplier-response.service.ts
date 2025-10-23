import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { RfxSupplierResponseRepository } from 'src/repos/rfx-repos/rfx-supplier-response-repos/rfx-supplier-res.repository';

@Injectable()
export class GetRfxSupplierResponseService {
  constructor(private rfxSupplierResponseRepo: RfxSupplierResponseRepository) {}

  async getRfxSupplierResponse(id: number) {
    try {
      return await this.rfxSupplierResponseRepo.findOneOrFail(id);
    } catch (error) {
      throw error;
    }
  }

  async checkIfSupplierHasResponded(rfxId: number, supplier: JwtPayload) {
    try {
      return await this.rfxSupplierResponseRepo.findOneOrFail(
        {
          rfxId,
          supplierId: supplier.userId,
        },
        { relations: ['meetingAttendees'] },
      );
    } catch (error) {
      return {
        message: 'the current supplier has not responded to this rfx yet',
      };
    }
  }
}
