import { Test, TestingModule } from '@nestjs/testing';
import { ManageRfxTemplateQuestionnaireService } from './manage-rfx-template-questionnaire.service';

describe('ManageRfxTemplateQuestionnaireService', () => {
  let service: ManageRfxTemplateQuestionnaireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageRfxTemplateQuestionnaireService],
    }).compile();

    service = module.get<ManageRfxTemplateQuestionnaireService>(ManageRfxTemplateQuestionnaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
