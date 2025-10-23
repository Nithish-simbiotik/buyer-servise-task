import { Injectable } from '@nestjs/common';
import { PRTemplateRepository } from 'src/repos/pr_Repos/prTemplateNew.repository';
import { CreatePrTemplateDto } from 'src/dto/prTemplate/createPrTemplate.dto';

@Injectable()
export class UpdatePrTemplateService {
  constructor(private prTemplateRepo: PRTemplateRepository) {}

  async updatePrTemplate(prTemplate: CreatePrTemplateDto) {
    try {
      return await this.prTemplateRepo.save(
        this.prTemplateRepo.create(prTemplate),
      );
    } catch (error) {
      return error;
    }
  }
}
