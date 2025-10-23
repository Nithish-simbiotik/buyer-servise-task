import { Test, TestingModule } from '@nestjs/testing';
import { ManageRfxTemplateEnvelopeService } from './manage-rfx-template-envelope.service';

describe('ManageRfxTemplateEnvelopeService', () => {
  let service: ManageRfxTemplateEnvelopeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageRfxTemplateEnvelopeService],
    }).compile();

    service = module.get<ManageRfxTemplateEnvelopeService>(ManageRfxTemplateEnvelopeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
