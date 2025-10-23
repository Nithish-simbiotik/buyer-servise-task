import { Injectable } from '@nestjs/common';
import { RfxTemplateUnmaskOwnerEntity } from 'src/entities/rfx/rfx-template/rfx-template-unmask-owner.entity';
import { RfxTemplateUnmaskOwnerRepository } from 'src/repos/rfx-repos/rfx-template-repos/rfx-template-unmask-owner.repository';

@Injectable()
export class ManageRfxTemplateUnmaskOwnerService {
  constructor(private unmaskOwnerRepo: RfxTemplateUnmaskOwnerRepository) {}

  async addUnmaskOwners(
    owners: { userId: number }[],
  ): Promise<RfxTemplateUnmaskOwnerEntity[]> {
    const unmaskOwners = owners.map((owner) =>
      this.unmaskOwnerRepo.create(owner),
    );

    return await this.unmaskOwnerRepo.save(unmaskOwners);
  }
}
