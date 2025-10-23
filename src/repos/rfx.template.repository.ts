import { CreateRfxTemplateDto } from 'src/dto/rfx-template/create.rfx.template.dto';
import { RfxTemplateEntity } from 'src/entities/rfx/rfx-template/rfx-template.entity';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Response } from 'express';

@EntityRepository(RfxTemplateEntity)
export class RfxTemplateRepository extends Repository<RfxTemplateEntity> {
  constructor() {
    super();
  }

  async importSourcingTemplate(res: Response, downloaded, user: JwtPayload) {
    console.log('func working');
  }
}
