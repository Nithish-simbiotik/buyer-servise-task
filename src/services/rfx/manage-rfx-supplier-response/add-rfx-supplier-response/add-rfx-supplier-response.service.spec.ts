import { Test, TestingModule } from '@nestjs/testing';
import { AddRfxSupplierResponseService } from './add-rfx-supplier-response.service';

describe('AddRfxSupplierResponseService', () => {
  let service: AddRfxSupplierResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddRfxSupplierResponseService],
    }).compile();

    service = module.get<AddRfxSupplierResponseService>(AddRfxSupplierResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
