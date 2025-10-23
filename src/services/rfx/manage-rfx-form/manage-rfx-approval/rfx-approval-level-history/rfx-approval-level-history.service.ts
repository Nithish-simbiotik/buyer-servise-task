import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RfxApprovalLevelHistoryDto } from 'src/dto/rfx-form/rfx-approval-level-history.dto';
import { RfxApprovalLevelHistoryEntity } from 'src/entities/rfx/rfx-form/rfx-approvals/rfx-approval-level-history.entity';
import { RfxApprovalLevelHistoryEntityRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx-approval-repos/rfx-approval-level-history.repository';

@Injectable()
export class RfxApprovalLevelHistoryService {
  constructor(
    @InjectRepository(RfxApprovalLevelHistoryEntityRepository)
    private historyRepo: RfxApprovalLevelHistoryEntityRepository,
  ) {}

  async addHistoryToLevel(
    history: RfxApprovalLevelHistoryDto,
  ): Promise<RfxApprovalLevelHistoryEntity> {
    const newHistory = this.historyRepo.create(history);
    return await this.historyRepo.save(newHistory);
  }

  async getHistoryFromAllLevels(rfxId: number) {
    return await this.historyRepo.find({ rfxId });
  }
}
