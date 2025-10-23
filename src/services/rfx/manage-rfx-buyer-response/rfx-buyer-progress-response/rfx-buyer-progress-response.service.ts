import { ForbiddenException, Injectable } from '@nestjs/common';
import { RfxFormStatus, SupplierStatus } from 'src/enum/rfx/rfx-form-status.enum';
import { RfxSourcingEvaluationprogressChart } from 'src/interface/rfx/rfx-sourcing-progresschart.interface';
import { RfxRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx.repository';
import { RfxApprovalService } from '../../manage-rfx-form/manage-rfx-approval/rfx-approval/rfx-approval.service';

@Injectable()
export class RfxBuyerProgressResponseService {
  constructor(
    private rfxApprovalService: RfxApprovalService,
    private rfxRepo: RfxRepository,
  ) { }

  async suspendRfx(rfxId: number) {
    const rfx = await this.rfxRepo.findOne(
      { id: rfxId },
      {
        relations: ['approvalRoute'],
        loadEagerRelations: false,
      },
    );

    rfx.status = RfxFormStatus.NOT_SUBMITED;

    if (rfx.approvalRoute) {
      this.rfxApprovalService.resetApprovalCycle(rfx.approvalRoute);
    }

    return await this.rfxRepo.save(rfx);
  }

  async closeRfx(rfxId: number) {
    const rfx = await this.rfxRepo.findOne(
      { id: rfxId },
      {
        loadEagerRelations: false,
      },
    );

    rfx.closingDate = new Date();
    rfx.status = RfxFormStatus.CLOSED;

    // code to check buyer evaluation and requestor evaluation will go here:

    return await this.rfxRepo.save(rfx);
  }

  async extendRfx(rfxId: number, endDateAndTime: string) {
    // 1.Update Closing Date to newly selected end date & time

    // 2.Update RFx Event status from PENDING BUYER EVALUATION / PENDING REQUESTOR EVALUATION to PENDING

    // 3.Discard any evaluation data input by buyer / evaluator

    // 4.Update envelop status from OPEN to CLOSED

    // 5.Activate RFx Event approval workflow

    const rfx = await this.rfxRepo.findOne(
      { id: rfxId },
      {
        loadEagerRelations: false,
      },
    );

    if (
      rfx.status !== RfxFormStatus.PENDING_BUYER_EVALUATION &&
      rfx.status !== RfxFormStatus.PENDING_REQUESTOR_EVALUATION
    ) {
      throw new ForbiddenException(
        'evaluation conditions to extend the event are not met',
      );
    }

    rfx.closingDate = new Date(endDateAndTime);
    this.rfxApprovalService.resetApprovalCycle(rfx.approvalRoute);

    // reset envelope statuses here:
  }
  async getBuyerEventProgressDetails(rfxId: number) {
    // const rfxData = await this

    let progressChart: RfxSourcingEvaluationprogressChart = {
      PREVIEWED: 0,
      ACCEPTED: 0,
      REJECTED: 0,
      SUBMITTED: 0,
      TOTAL: 0,
      INVITED: 0
    }
    let data = await this.rfxRepo
      .createQueryBuilder('rfx')
      .leftJoinAndSelect('rfx.supplier', 'supplier')
      .leftJoinAndSelect('supplier.selectedSupplier', 'selectedSupplier')
      .leftJoinAndSelect('rfx.creator', 'creator')
      .where('rfx.id=:rfxid', { rfxid: rfxId })
      .select(['rfx.id', 'supplier.id', 'selectedSupplier','creator.name'])
      .getOne()
    // console.log(data);
    if (
      data.supplier.selectedSupplier.length != 0
    ) {
      for await (const supplier of data.supplier.selectedSupplier) {
        if (supplier.isPreviewed) {
          progressChart.PREVIEWED = progressChart.PREVIEWED + 1;
        } if (supplier.isAccepted) {
          progressChart.ACCEPTED = progressChart.ACCEPTED + 1;
        } if (supplier.isRejected) {
          progressChart.REJECTED = progressChart.REJECTED + 1;
        } if (supplier.isSubmited) {
          progressChart.SUBMITTED = progressChart.SUBMITTED + 1;
        } if(supplier.status==SupplierStatus.INVITED){
          progressChart.INVITED = progressChart.INVITED + 1
        }
      }
      progressChart.TOTAL = data.supplier.selectedSupplier.length
      return { chart: progressChart,id:data.id,buyer:data.creator.name, supplierList: data.supplier.selectedSupplier }

    } else {
      return { chart: progressChart, supplierList: data.supplier.selectedSupplier }

    }
    // take report 
    // take selected supplier

  }
}
