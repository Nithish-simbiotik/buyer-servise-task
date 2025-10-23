import { Injectable } from '@nestjs/common';
import { ECAPEXTemplateApprovalLevelDto } from 'src/dto/prTemplate/createPrTemplate.dto';
import { PrECAPEXTemplateApprovalEntity } from 'src/entities/prTemplates/prTemplateECAPEXApprovalRoute/prTemplateECAPEXApproval.entity';
import { PrTemplateECAPEXApprovalRepository } from 'src/repos/pr_Repos/prTemplateECAPEXApprovalRepo/prTemplateECAPEXApproval.repository';
import { PrTemplateECAPEXApprovalLevelRepository } from 'src/repos/pr_Repos/prTemplateECAPEXApprovalRepo/prTemplateECAPEXApprovalLevel.repository';

@Injectable()
export class ManagePrTemplateECAPEXApprovalRouteService {
  constructor(
    private approvalRouteRepoECAPEX: PrTemplateECAPEXApprovalRepository,
    private approvalRouteLevelRepoECAPEX: PrTemplateECAPEXApprovalLevelRepository,
  ) {}

  async addECAPEXApprovalRoute(
    approvalRoute: ECAPEXTemplateApprovalLevelDto,
  ): Promise<PrECAPEXTemplateApprovalEntity> {
    try {
      const newApprovalRoute =
        this.approvalRouteRepoECAPEX.create(approvalRoute);

      // 4. add levels to approval routing
      const approvalRoutingLevels = approvalRoute.approvalLevelsECAPEX.map(
        (level) =>
          this.approvalRouteLevelRepoECAPEX.create({
            levelName: level.levelName,
            userId: level.userId,
            levelSequence: level.levelSequence,
          }),
      );

      await this.approvalRouteLevelRepoECAPEX.save(approvalRoutingLevels);

      newApprovalRoute.approvalLevelsECAPEX = approvalRoutingLevels;

      return await this.approvalRouteRepoECAPEX.save(newApprovalRoute);
    } catch (error) {
      return error.message;
    }
  }
}
