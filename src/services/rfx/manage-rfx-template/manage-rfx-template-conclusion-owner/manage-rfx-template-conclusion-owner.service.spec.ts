import { Test, TestingModule } from '@nestjs/testing';
import { ManageRfxTemplateConclusionOwnerService } from './manage-rfx-template-conclusion-owner.service';

describe('ManageRfxTemplateConclusionOwnerService', () => {
  let service: ManageRfxTemplateConclusionOwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageRfxTemplateConclusionOwnerService],
    }).compile();

    service = module.get<ManageRfxTemplateConclusionOwnerService>(ManageRfxTemplateConclusionOwnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
