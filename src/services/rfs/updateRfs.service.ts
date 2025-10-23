import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRFSDto } from 'src/dto/rfs/create-rfs.dto';
import { PagingDto } from 'src/dto/paging.dto';
import { PreprEntity } from 'src/entities/prepr/prepr.entity';
import { RFSRepository } from 'src/repos/rfs.repository';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { GetFlatPurchaseOrgService } from '../flat/getFlatPurchaseOrg.service';
import { GetAllUsers } from '../user/getAllUser.service';
import { SubmitType } from 'src/enum/rfs/submitType.enum';
import { MailService } from '../mail/mailservice.service';
import { PrePrSummaryPdfService } from './preprSummary.service';
import { Response } from 'express';
import { GetFlatCurrencyService } from '../flat/getFlatCurrency.service';
import { WarrantyService } from '../flat/warranty.service';
import { GetFlatCostService } from '../flat/getFlatCost.service';
import { GetDepartmentService } from '../user/getDepartment.service';
import { CopyPrePrDataService } from './copyPreprData.service';
import { AddressService } from '../flat/address.service';

@Injectable()
export class UpdateRFSService {
  constructor(
    private readonly rfsRepo: RFSRepository,
    private getUserService: GetAllUsers,
    private getPurchaseOrg: GetFlatPurchaseOrgService,
    private mailService: MailService,
    private prePrSummaryPdfService: PrePrSummaryPdfService,
    private getCurrencyService:GetFlatCurrencyService,
    private getWarrantyService:WarrantyService,
    private getCostCenter:GetFlatCostService,
    private getDepartmentService:GetDepartmentService,
    private copyPreprSerivce:CopyPrePrDataService,
    private getAddress:AddressService
  
  ) {}

  async updateRFS(
    id: number,
    user: JwtPayload,
    createRFSDto: CreateRFSDto,
    res: Response,
  ) {
    let data= await this.rfsRepo.updateRFS(
      id,
      user,
      createRFSDto,
      this.getPurchaseOrg,
      this.getUserService,
      this.getCostCenter,
      this.getCurrencyService,
      this.getWarrantyService,
      this.getDepartmentService,
      this.getAddress
      
    );
    console.log(data.submitStatus,"--My Submit Status");
    if(!createRFSDto.isDraftAS){
    await this.copyPreprSerivce.updatePrePrCopy(user,data)
    }

    
    
    
    // if (data.submitStatus.trim() == SubmitType.SUBMITED.trim()) {
    //   console.log('Levels - Level : ', data.levels);
    //   let approvalEmail =
    //     await this.getUserService.getUserEmailByRoleandDepatmentId(
    //       data.levels[0].departmentId + '',
    //       data.levels[0].userRole,
    //     );
    //   let approvalName =
    //     await this.getUserService.getUserNameByRoleandDepatmentId(
    //       data.levels[0].departmentId + '',
    //       data.levels[0].userRole,
    //     );
    //   console.log(approvalEmail, approvalName, 'Approvar Data');
    //   this.mailService.sendMailApprovalReminder(
    //     approvalEmail,
    //     ` T-Procure: Pre-PR Approval Reminder ${createRFSDto.internalReferenceNumber}`,
    //     approvalName,
    //     id,
    //     createRFSDto.internalReferenceNumber,
    //     createRFSDto.title,
    //   );
    // }
    
    
    this.prePrSummaryPdfService.createPdf(res, id);
     res.send(data);
  }
}
