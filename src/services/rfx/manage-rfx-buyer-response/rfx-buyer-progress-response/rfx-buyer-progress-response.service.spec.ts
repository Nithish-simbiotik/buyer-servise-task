import { Test, TestingModule } from '@nestjs/testing';
import { RfxBuyerProgressResponseService } from './rfx-buyer-progress-response.service';

describe('RfxBuyerProgressResponseService', () => {
  let service: RfxBuyerProgressResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RfxBuyerProgressResponseService],
    }).compile();

    service = module.get<RfxBuyerProgressResponseService>(RfxBuyerProgressResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
