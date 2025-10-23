import { Injectable } from '@nestjs/common';
import { RfxTemplateConclusionOwnerEntity } from 'src/entities/rfx/rfx-template/rfx-template-conclusion-owner.entity';
import { RfxTemplateUserEntity } from 'src/entities/rfx/rfx-template/rfx-template-user.entity';
import { RfxTemplateConclusionOwnerRepository } from 'src/repos/rfx-repos/rfx-template-repos/rfx-template-conclusion-owner.repository';
import { RfxTemplateUserRepository } from 'src/repos/rfx-repos/rfx-template-repos/rfx-template-user-repo';

@Injectable()
export class ManageRfxTemplateConclusionOwnerService {
  constructor(
    private conclusionOwnerRepo: RfxTemplateConclusionOwnerRepository,
    private templateUserRepo: RfxTemplateUserRepository,
  ) {}

  async addConclusionOwners(
    owners: { userId: number }[],
  ): Promise<RfxTemplateConclusionOwnerEntity[]> {
    const newConclusionOwners = owners.map((owner) =>
      this.conclusionOwnerRepo.create(owner),
    );

    return await this.conclusionOwnerRepo.save(newConclusionOwners);
  }

  async addTemplateUsers(
    users: { userId: number }[],
  ): Promise<RfxTemplateUserEntity[]> {
    const newTemplateUsers = users.map((user) =>
      this.templateUserRepo.create(user),
    );

    return await this.templateUserRepo.save(newTemplateUsers);
  }
}
