import { Test, TestingModule } from '@nestjs/testing';
import { DocumetsController } from './documets.controller';

describe('RfxTemplateSupportingDocumetsController', () => {
  let controller: DocumetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumetsController],
    }).compile();

    controller = module.get<DocumetsController>(DocumetsController);
  });

  // it('should be defined', () => {
  expect(controller).toBeDefined();
});
