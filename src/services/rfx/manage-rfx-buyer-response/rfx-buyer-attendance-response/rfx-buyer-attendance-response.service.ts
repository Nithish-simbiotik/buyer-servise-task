import { ForbiddenException, Injectable } from '@nestjs/common';
import { RfxSupplierResponseDto } from 'src/dto/rfx-supplier-response/rfx-supplier-res.dto';
import { TeamMemberType } from 'src/enum/team-member/team-member-type.enum';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { RfxRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx.repository';
import { RfxSupplierResponseRepository } from 'src/repos/rfx-repos/rfx-supplier-response-repos/rfx-supplier-res.repository';

@Injectable()
export class RfxBuyerAttendanceResponseService {
  constructor(
    private rfxSupplierResponseRepo: RfxSupplierResponseRepository,
    private rfxRepo: RfxRepository,
  ) {}

  async updateSupplierAttendance(
    supplierResponse: RfxSupplierResponseDto,
    currentUser: JwtPayload,
  ) {
    if (!this.canUserUpdateAttendance(supplierResponse.rfxId, currentUser)) {
      throw new ForbiddenException(
        'You are not an authorised personell to update the attendance',
      );
    } else {
      return await this.rfxSupplierResponseRepo.save(supplierResponse);
    }
  }

  async canUserUpdateAttendance(
    rfxId: number,
    currentUser: JwtPayload,
  ): Promise<boolean> {
    const rfx = await this.rfxRepo.findOneOrFail(
      { id: rfxId },
      {
        relations: [
          'approvalRoute',
          'approvalRoute.approvalLevels',
          'teamMembers',
          'sourcingProposalRoute',
          'sourcingProposalRoute.proposalLevels',
        ],
        loadEagerRelations: false,
      },
    );

    const isApprover = rfx.approvalRoute.approvalLevels.find(
      (approver) => approver.userId === currentUser.userId,
    );

    const isTeamMemberAndOwner = rfx.teamMembers.find(
      (member) =>
        member.userId === currentUser.userId &&
        member.viewStatus === TeamMemberType.ASSOCIATE_OWNER,
    );

    const isProposer = rfx.sourcingProposalRoute.proposalLevels.find(
      (proposer) => proposer.userId === currentUser.userId,
    );

    const isCreator = rfx.createdById === currentUser.userId;

    if (isApprover || isTeamMemberAndOwner || isProposer || isCreator) {
      return true;
    } else {
      return false;
    }
  }
}
