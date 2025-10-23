import { Test, TestingModule } from '@nestjs/testing';
import { RfxSupplierAttendanceResponseService } from './rfx-supplier-attendance-response.service';

describe('RfxSupplierAttendanceResponseService', () => {
  let service: RfxSupplierAttendanceResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RfxSupplierAttendanceResponseService],
    }).compile();

    service = module.get<RfxSupplierAttendanceResponseService>(RfxSupplierAttendanceResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
