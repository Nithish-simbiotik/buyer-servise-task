import { Test, TestingModule } from '@nestjs/testing';
import { ManageRfxTemplateUnmaskOwnerService } from './manage-rfx-template-unmask-owner.service';

describe('ManageRfxTemplateUnmaskOwnerService', () => {
  let service: ManageRfxTemplateUnmaskOwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageRfxTemplateUnmaskOwnerService],
    }).compile();

    service = module.get<ManageRfxTemplateUnmaskOwnerService>(ManageRfxTemplateUnmaskOwnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
