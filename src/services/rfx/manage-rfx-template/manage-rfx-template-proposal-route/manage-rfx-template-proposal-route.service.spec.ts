import { Test, TestingModule } from '@nestjs/testing';
import { ManageRfxTemplateProposalRouteService } from './manage-rfx-template-proposal-route.service';

describe('ManageRfxTemplateProposalRouteService', () => {
  let service: ManageRfxTemplateProposalRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageRfxTemplateProposalRouteService],
    }).compile();

    service = module.get<ManageRfxTemplateProposalRouteService>(ManageRfxTemplateProposalRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
