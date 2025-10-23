import { Test, TestingModule } from '@nestjs/testing';
import { AddRfxFormService } from './add-rfx-form.service';

describe('AddRfxFormService', () => {
  let service: AddRfxFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddRfxFormService],
    }).compile();

    service = module.get<AddRfxFormService>(AddRfxFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
