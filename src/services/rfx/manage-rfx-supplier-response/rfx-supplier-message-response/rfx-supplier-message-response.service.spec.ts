import { Test, TestingModule } from '@nestjs/testing';
import { RfxSupplierMessageResponseService } from './rfx-supplier-message-response.service';

describe('RfxSupplierMessageResponseService', () => {
  let service: RfxSupplierMessageResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RfxSupplierMessageResponseService],
    }).compile();

    service = module.get<RfxSupplierMessageResponseService>(RfxSupplierMessageResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
