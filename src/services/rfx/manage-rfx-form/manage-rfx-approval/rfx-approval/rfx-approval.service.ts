import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RfxFormApprovalDto } from 'src/dto/rfx-form/create-rfx-form.dto';
import { RfxApprovalLevelUpdateDto } from 'src/dto/rfx-form/rfx-approval-level-update.dto';
import { RfxApprovalEntity } from 'src/entities/rfx/rfx-form/rfx-approvals/rfx-approval.entity';
import { RfxFormStatus } from 'src/enum/rfx/rfx-form-status.enum';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { RfxApprovalLevelHistoryEntityRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx-approval-repos/rfx-approval-level-history.repository';
import { RfxApprovalEntityRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx-approval-repos/rfx-approval.repository';
import { UpdateRfxFormService } from '../../update-rfx-form/update-rfx-form.service';

@Injectable()
export class RfxApprovalService {
  constructor(
    @InjectRepository(RfxApprovalEntityRepository)
    private approvalRepo: RfxApprovalEntityRepository,
    @InjectRepository(RfxApprovalLevelHistoryEntityRepository)
    private levelHistoryRepo: RfxApprovalLevelHistoryEntityRepository,
    private updateRfxFormService: UpdateRfxFormService,
    private updateRfxService: UpdateRfxFormService,
  ) {}

  async getApprovalById(id: number) {
    return await this.approvalRepo.findOneOrFail(id);
  }

  async updateOneLevel(user: JwtPayload, level: RfxApprovalLevelUpdateDto) {
    try {
      const approval = await this.approvalRepo.findOneOrFail({
        id: level.approvalId,
      });

      const indexOflevelToUpdate = approval.approvalLevels.findIndex(
        (levelItem) => levelItem.levelSequence === level.levelSequence,
      );

      if (approval.approvalLevels[indexOflevelToUpdate].userId !== user.userId)
        throw new ForbiddenException(
          'You are not an authorised personell to approve given level',
        );

      // create a new history on every action.
      const newHistory = this.levelHistoryRepo.create({
        actionTakenById: user.userId,
        levelStatus: level.levelStatus,
        remark: level.remark,
        rfxId: level.rfxId,
      });

      approval.approvalLevels[indexOflevelToUpdate].levelStatus =
        level.levelStatus;
      approval.approvalLevels[indexOflevelToUpdate].histories = [
        ...approval.approvalLevels[indexOflevelToUpdate].histories,
        newHistory,
      ];

      if (level.levelStatus === RfxFormStatus.REJECTED) {
        this.resetApprovalCycle(approval);
        await this.updateRfxFormService.resetApprovalCycle(level.rfxId);
      } else if (
        level.levelSequence === approval.approvalLevels.length &&
        level.levelStatus === RfxFormStatus.APPROVED
      ) {
        // activate rfx event.
        this.updateRfxFormService.inviteSuppliers(level.rfxId);
      } else {
        approval.activeLevelSequence = approval.activeLevelSequence + 1;
      }
      return await this.approvalRepo.save(approval);
    } catch (error) {
      throw error;
    }
  }

  resetApprovalCycle(approval: RfxApprovalEntity) {
    approval.activeLevelSequence = 1;
    approval.approvalLevels = approval.approvalLevels.map((level) => {
      return {
        ...level,
        levelStatus: RfxFormStatus.NOT_SUBMITED,
      };
    });
  }

  async updateAnApprovalRoute(user: JwtPayload, approval: RfxFormApprovalDto) {
    const UpdatedApproval = await this.approvalRepo.save(approval);
    return {
      message: 'approval has been updated successfully',
      UpdatedApproval,
    };
  }
}
