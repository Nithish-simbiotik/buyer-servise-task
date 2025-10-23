import { Test, TestingModule } from '@nestjs/testing';
import { ManageRfxTemplateTeamMemberService } from './manage-rfx-template-team-member.service';

describe('ManageRfxTemplateTeamMemberService', () => {
  let service: ManageRfxTemplateTeamMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageRfxTemplateTeamMemberService],
    }).compile();

    service = module.get<ManageRfxTemplateTeamMemberService>(ManageRfxTemplateTeamMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
