import { Test, TestingModule } from '@nestjs/testing';
import { RfxBuyerAttendanceResponseService } from './rfx-buyer-attendance-response.service';

describe('RfxBuyerAttendanceResponseService', () => {
  let service: RfxBuyerAttendanceResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RfxBuyerAttendanceResponseService],
    }).compile();

    service = module.get<RfxBuyerAttendanceResponseService>(RfxBuyerAttendanceResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
