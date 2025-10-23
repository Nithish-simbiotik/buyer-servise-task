import { Injectable } from '@nestjs/common';
import { CreatePrTemplateDto } from 'src/dto/prTemplate/createPrTemplate.dto';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { PRTemplateRepository } from 'src/repos/pr_Repos/prTemplateNew.repository';

@Injectable()
export class AddPRTemplateService {
  constructor(private prTemplateRepo: PRTemplateRepository) {}

  async createPrTemplate(user: JwtPayload, prTemplate: CreatePrTemplateDto) {
    try {
      if (prTemplate.deliveryAddressType === 'MANUAL') {
        prTemplate.deliveryAddressId = null;
      } else {
        prTemplate.customDeliveryAddress = null;
      }
      prTemplate.createdById = user.userId;
      return await this.prTemplateRepo.save(
        this.prTemplateRepo.create(prTemplate),
      );
    } catch (error) {
      return error.message;
    }
  }
}
