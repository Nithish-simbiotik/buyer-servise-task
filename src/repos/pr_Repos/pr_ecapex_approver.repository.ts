import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { PrECAPEXApprovalRouteEntity } from "src/entities/pr/pr-capex-approval.entity";
import { PRApproverStatus } from "src/enum/pr/pr-approver-status.enum";
import { JwtPayload } from "src/interface/user/jwt.payload.interface";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PrECAPEXApprovalRouteEntity)
export class PrECAPEXApprovalRouteRepository extends Repository<PrECAPEXApprovalRouteEntity>{
  constructor() {
    super();
  }

  async approveECAPEX(authUserId: number, prApproverRouteId: number, remark?: string) {
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

  async rejectECAPEX(authUserId: number, prApproverRouteId: number, remark?: string) {
    let approverRoute = await this.findOne(prApproverRouteId);
    let isApprover = approverRoute.users.map(x => x.userId).includes(authUserId);
    if (!isApprover) {
      throw new UnauthorizedException();
    }
    approverRoute.approverRemarks = remark;
    approverRoute.status = PRApproverStatus.Rejected;
    return await this.save(approverRoute);
  }
}