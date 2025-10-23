import { Test, TestingModule } from '@nestjs/testing';
import { ModuleAccessService } from './create-supplier-module-access-rights.service';

describe('ModuleAccessService', () => {
  let service: ModuleAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuleAccessService],
    }).compile();

    service = module.get<ModuleAccessService>(ModuleAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
