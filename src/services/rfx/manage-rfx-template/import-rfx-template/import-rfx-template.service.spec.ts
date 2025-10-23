import { Test, TestingModule } from '@nestjs/testing';
import { ImportRfxTemplateService } from './import-rfx-template.service';

describe('ImportRfxTemplateService', () => {
  let service: ImportRfxTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportRfxTemplateService],
    }).compile();

    service = module.get<ImportRfxTemplateService>(ImportRfxTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
