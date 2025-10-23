import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { PrApprovalRouteEntity } from "src/entities/pr/pr-approval-route.entity";
import { PRApproverStatus } from "src/enum/pr/pr-approver-status.enum";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PrApprovalRouteEntity)
export class PrApprovalRouteRepository extends Repository<PrApprovalRouteEntity>{
  constructor() {
    super();
  }

  async approvePR(
    authUserId: number,
    prApproverRouteId: number,
    remark?: string) {
    let approverRoute = await this.findOne(prApproverRouteId);
    let isApprover = approverRoute.users.map(x => x.userId).includes(authUserId);
    if (!isApprover) {
      throw new UnauthorizedException();
    }
    if (remark) {
      approverRoute.approverRemarks = remark;
    }
    approverRoute.status = PRApproverStatus.Approved;
    return await this.save(approverRoute);
  }

  async rejectPR(
    authUserId: number,
    prApproverRouteId: number,
    remark?: string) {
    let approverRoute = await this.findOne(prApproverRouteId);
    let isApprover = approverRoute.users.map(x => x.userId).includes(authUserId);
    if (!isApprover) {
      throw new UnauthorizedException();
    }
    if (!remark) {
      throw new BadRequestException('Remarks are required for rejection');
    }
    approverRoute.approverRemarks = remark;
    approverRoute.status = PRApproverStatus.Rejected;
    return await this.save(approverRoute);
  }
}