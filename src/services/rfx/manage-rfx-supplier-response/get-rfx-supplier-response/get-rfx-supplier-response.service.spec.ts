import { Test, TestingModule } from '@nestjs/testing';
import { GetRfxSupplierResponseService } from './get-rfx-supplier-response.service';

describe('GetRfxSupplierResponseService', () => {
  let service: GetRfxSupplierResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetRfxSupplierResponseService],
    }).compile();

    service = module.get<GetRfxSupplierResponseService>(GetRfxSupplierResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
