import { Test, TestingModule } from '@nestjs/testing';
import { ManageRfxTemplateApprovalRouteService } from './manage-rfx-template-approval-route.service';

describe('ManageRfxTemplateApprovalRouteService', () => {
  let service: ManageRfxTemplateApprovalRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageRfxTemplateApprovalRouteService],
    }).compile();

    service = module.get<ManageRfxTemplateApprovalRouteService>(ManageRfxTemplateApprovalRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
