import { Injectable } from '@nestjs/common';
import { CreateRfxTemplateDto } from 'src/dto/rfx-template/create.rfx.template.dto';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { RfxTemplateRepository } from 'src/repos/rfx.template.repository';
@Injectable()
export class AddRfxTemplateService {
  constructor(private rfxTemplateRepo: RfxTemplateRepository) {}

  async createatRfxTemplate(user: JwtPayload, template: CreateRfxTemplateDto) {
    template.createdById = user.userId;
    return await this.rfxTemplateRepo.save(
      this.rfxTemplateRepo.create(template),
    );
  }
}
