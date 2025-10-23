import { Test, TestingModule } from '@nestjs/testing';
import { AddRfxTemplateService } from './add-rfx-template.service';

describe('AddRfxTemplateService', () => {
  let service: AddRfxTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddRfxTemplateService],
    }).compile();

    service = module.get<AddRfxTemplateService>(AddRfxTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
