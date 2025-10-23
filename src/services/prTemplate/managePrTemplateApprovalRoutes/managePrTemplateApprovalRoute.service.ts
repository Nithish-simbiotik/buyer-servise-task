import { Injectable } from '@nestjs/common';
import { PrTemplateApprovalLevelDto } from 'src/dto/prTemplate/createPrTemplate.dto';
import { PrTemplateApprovalEntity } from 'src/entities/prTemplates/prTemplateApprovalRoute/prTemplateApproval.entity';
import { PrTemplateApprovalRepository } from 'src/repos/pr_Repos/prTemplateApprovalRepo/prTemplateApproval.repository';
import { PrTemplateApprovalLevelRepository } from 'src/repos/pr_Repos/prTemplateApprovalRepo/prTemplateApprovalLevel.repository';

@Injectable()
export class ManagePrTemplateApprovalRouteService {
  constructor(
    private approvalRouteRepo: PrTemplateApprovalRepository,
    private approvalRouteLevelRepo: PrTemplateApprovalLevelRepository,
  ) {}

  async addApprovalRoute(
    approvalRoute: PrTemplateApprovalLevelDto,
  ): Promise<PrTemplateApprovalEntity> {
    try {
      const newApprovalRoute = this.approvalRouteRepo.create(approvalRoute);

      // 4. add levels to approval routing
      const approvalRoutingLevels = approvalRoute.approvalLevels.map((level) =>
        this.approvalRouteLevelRepo.create({
          levelName: level.levelName,
          userId: level.userId,
          levelSequence: level.levelSequence,
        }),
      );

      await this.approvalRouteLevelRepo.save(approvalRoutingLevels);

      newApprovalRoute.approvalLevels = approvalRoutingLevels;

      return await this.approvalRouteRepo.save(newApprovalRoute);
    } catch (error) {
      error.message;
    }
  }
}
