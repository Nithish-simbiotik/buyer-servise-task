import { PaymentRemittanceFilterDto } from 'src/dto/paging.dto';
import { PaymentRemittanceEntity } from 'src/entities/paymentRemittance/buyer-invoice/payment-remittance.entity';

import { EntityRepository, getRepository, Repository } from 'typeorm';

@EntityRepository(PaymentRemittanceEntity)
export class    PaymentRemittanceRepository extends Repository<PaymentRemittanceEntity> {
    constructor() {
        super();
    }

}


