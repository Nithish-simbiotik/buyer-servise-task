import { Injectable } from '@nestjs/common';
import { PrTemplateTeamMembersDto } from 'src/dto/prTemplate/createPrTemplate.dto';
import { PrTemplateTeamMembersEntity } from 'src/entities/prTemplates/prTemplateTeamMembers.entity';
import { PrTeamMembersRepository } from 'src/repos/pr_Repos/prTemplateTeamMembersRepo/prTeamMembers.repository';
import { PrTemplateEntity } from '../../../entities/prTemplates/prTemplates.entity';

@Injectable()
export class ManagePrTemplateTeamMembersService {
  constructor(private prTemplateTeamMembersRepo: PrTeamMembersRepository) {}

  async addTeamMembers(
    members: PrTemplateTeamMembersDto[],
  ): Promise<PrTemplateTeamMembersEntity[]> {
    const teamMembers = members.map((member) =>
      this.prTemplateTeamMembersRepo.create({
        userId: member.userId,
        viewStatus: member.viewStatus,
      }),
    );

    return await this.prTemplateTeamMembersRepo.save(teamMembers);
  }

  async updateTeamMembers(prTemplate: PrTemplateEntity) {
    const teamMembers = prTemplate.teamMembers.map((member) =>
      this.prTemplateTeamMembersRepo.create({
        userId: member.userId,
        viewStatus: member.viewStatus,
      }),
    );

    return await this.prTemplateTeamMembersRepo.save(teamMembers);
  }
}
