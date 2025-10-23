import { Test, TestingModule } from '@nestjs/testing';
import { RfxApprovalLevelService } from './rfx-approval-level.service';

describe('RfxApprovalLevelService', () => {
  let service: RfxApprovalLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RfxApprovalLevelService],
    }).compile();

    service = module.get<RfxApprovalLevelService>(RfxApprovalLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
