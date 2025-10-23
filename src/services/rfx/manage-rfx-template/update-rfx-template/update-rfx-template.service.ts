import { Injectable } from '@nestjs/common';
import { CreateRfxTemplateDto } from 'src/dto/rfx-template/create.rfx.template.dto';
import { RfxTemplateRepository } from 'src/repos/rfx.template.repository';

@Injectable()
export class UpdateRfxTemplateService {
  constructor(private rfxTemplateRepo: RfxTemplateRepository) {}

  async updateRfxTemplate(template: CreateRfxTemplateDto) {
    return await this.rfxTemplateRepo.save(
      this.rfxTemplateRepo.create(template),
    );
  }
}
