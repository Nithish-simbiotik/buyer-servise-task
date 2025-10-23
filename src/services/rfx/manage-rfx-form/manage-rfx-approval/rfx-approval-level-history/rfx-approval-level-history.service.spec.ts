import { Test, TestingModule } from '@nestjs/testing';
import { RfxApprovalLevelHistoryService } from './rfx-approval-level-history.service';

describe('RfxApprovalLevelHistoryService', () => {
  let service: RfxApprovalLevelHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RfxApprovalLevelHistoryService],
    }).compile();

    service = module.get<RfxApprovalLevelHistoryService>(RfxApprovalLevelHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
