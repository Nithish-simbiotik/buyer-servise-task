import { Test, TestingModule } from '@nestjs/testing';
import { RfxTemplateController } from './rfx-template.controller';

describe('RfxTemplateController', () => {
  let controller: RfxTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RfxTemplateController],
    }).compile();

    controller = module.get<RfxTemplateController>(RfxTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
