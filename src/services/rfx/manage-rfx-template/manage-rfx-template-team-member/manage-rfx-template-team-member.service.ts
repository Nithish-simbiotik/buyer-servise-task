import { Injectable } from '@nestjs/common';
import { RfxTemplateTeamMembersDto } from 'src/dto/rfx-template/create.rfx.template.dto';
import { RfxTemplateTeamMemberEntity } from 'src/entities/rfx/rfx-template/rfx-template-team-member.entity';
import { RfxTemplateEntity } from 'src/entities/rfx/rfx-template/rfx-template.entity';
import { RfxTemplateTeamMemberRepository } from 'src/repos/rfx-repos/rfx-template-repos/rfx-template-team-member.repository';

@Injectable()
export class ManageRfxTemplateTeamMemberService {
  constructor(
    private rfxTemplateTeamMemberRepo: RfxTemplateTeamMemberRepository,
  ) {}

  async addTeamMembers(
    members: RfxTemplateTeamMembersDto[],
  ): Promise<RfxTemplateTeamMemberEntity[]> {
    const teamMembers = members.map((member) =>
      this.rfxTemplateTeamMemberRepo.create({
        userId: member.userId,
        viewStatus: member.viewStatus,
      }),
    );

    return await this.rfxTemplateTeamMemberRepo.save(teamMembers);
  }

  async updateTeamMembers(rfxTemplate: RfxTemplateEntity) {
    const teamMembers = rfxTemplate.teamMembers.map((member) =>
      this.rfxTemplateTeamMemberRepo.create({
        userId: member.userId,
        viewStatus: member.viewStatus,
      }),
    );

    return await this.rfxTemplateTeamMemberRepo.save(teamMembers);
  }

  // async update(
  //   id: number,
  //   { genres, ...others }: CreateMovieDto,
  // ): Promise<Movie> {
  //   const record = this.moviesRepo.create(others);
  //   record.genres = genres.map((id) => ({ id } as Genre));
  //   // don't forget add the id and make sure it's type of number
  //   record.id = id;
  //   // .update was changed to .save()
  //   return await this.moviesRepo.save(record);
  // }
}
