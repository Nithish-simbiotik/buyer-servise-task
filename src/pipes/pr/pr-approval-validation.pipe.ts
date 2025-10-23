import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { isEmpty } from "class-validator";
import { PRApproverDto } from "src/dto/pr/pr-approver.dto";

@Injectable()
export class PRApprovalValidationPipe implements PipeTransform<PRApproverDto>{
  transform(value: PRApproverDto, metadata: ArgumentMetadata) {
    if (!value.approve && isEmpty(value.approverRemarks)) {
      throw new BadRequestException('Remarks are required for rejection');
    }
  }
}