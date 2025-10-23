import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { RfxTemplateRepository } from 'src/repos/rfx.template.repository';
import { ProcStorageService } from 'src/services/azure-storage-service/storage-service';
import { Response } from 'express';

@Injectable()
export class ImportRfxTemplateService {
  constructor(
    private procStorageService: ProcStorageService,
    private rfxTemplateRepository: RfxTemplateRepository,
  ) {}

  async upload(res: Response, file: Express.Multer.File, user: JwtPayload) {
    let uploaddata = await this.procStorageService.getfileStream;
    console.log('uploaddata', uploaddata);

    this.rfxTemplateRepository.importSourcingTemplate(res, uploaddata, user);
  }
}
