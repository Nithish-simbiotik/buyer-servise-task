import { Test, TestingModule } from '@nestjs/testing';
import { UpdateRfxTemplateService } from './update-rfx-template.service';

describe('UpdateRfxTemplateService', () => {
  let service: UpdateRfxTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateRfxTemplateService],
    }).compile();

    service = module.get<UpdateRfxTemplateService>(UpdateRfxTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
