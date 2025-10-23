import { Test, TestingModule } from '@nestjs/testing';
import { RfxApprovalService } from './rfx-approval.service';

describe('RfxApprovalService', () => {
  let service: RfxApprovalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RfxApprovalService],
    }).compile();

    service = module.get<RfxApprovalService>(RfxApprovalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
