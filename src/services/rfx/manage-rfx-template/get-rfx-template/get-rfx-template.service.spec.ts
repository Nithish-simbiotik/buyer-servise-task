import { Test, TestingModule } from '@nestjs/testing';
import { GetRfxTemplateService } from './get-rfx-template.service';

describe('GetRfxTemplateService', () => {
  let service: GetRfxTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetRfxTemplateService],
    }).compile();

    service = module.get<GetRfxTemplateService>(GetRfxTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
