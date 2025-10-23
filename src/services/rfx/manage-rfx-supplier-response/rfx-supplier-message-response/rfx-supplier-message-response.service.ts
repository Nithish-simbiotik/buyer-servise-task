import { Injectable } from '@nestjs/common';
import { RfxSupplierResponseMessageDto } from 'src/dto/rfx-supplier-response/rfx-supplier-res-message.dto';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { RfxSupplierResponseMessageRepository } from 'src/repos/rfx-repos/rfx-supplier-response-repos/rfx-supplier-res-message.repository';

@Injectable()
export class RfxSupplierMessageResponseService {
  constructor(
    private supplierResponseMessageRepo: RfxSupplierResponseMessageRepository,
  ) {}

  async sendMessageBySupplier(
    message: RfxSupplierResponseMessageDto,
    currentUser: JwtPayload,
  ) {
    return await this.supplierResponseMessageRepo.save(message);
  }
}
