import { Injectable } from '@nestjs/common';
import { RfxTemplateApprovalRouteDto } from 'src/dto/rfx-template/create.rfx.template.dto';
import { RfxTemplateApprovalRouteEntity } from 'src/entities/rfx/rfx-template/rfx-template-approval-route/rfx-template-approval-route.entity';
import { RfxTemplateApprovalRouteLevelRepository } from 'src/repos/rfx-repos/rfx-template-repos/rfx-template-approval-repo/rfx-template-approval-route-level.repository';
import { RfxTemplateApprovalRouteRepository } from 'src/repos/rfx-repos/rfx-template-repos/rfx-template-approval-repo/rfx-template-approval-route.repository';

@Injectable()
export class ManageRfxTemplateApprovalRouteService {
  constructor(
    private approvalRouteRepo: RfxTemplateApprovalRouteRepository,
    private approvalRouteLevelRepo: RfxTemplateApprovalRouteLevelRepository,
  ) {}

  async addApprovalRoute(
    approvalRoute: RfxTemplateApprovalRouteDto,
  ): Promise<RfxTemplateApprovalRouteEntity> {
    const newApprovalRoute = this.approvalRouteRepo.create(approvalRoute);

    // 4. add levels to approval routing
    const approvalRoutingLevels = approvalRoute.approvalLevels.map((level) =>
      this.approvalRouteLevelRepo.create({
        levelName: level.levelName,
        userId: level.userId,
      }),
    );

    await this.approvalRouteLevelRepo.save(approvalRoutingLevels);

    newApprovalRoute.approvalLevels = approvalRoutingLevels;

    return await this.approvalRouteRepo.save(newApprovalRoute);
  }
}
