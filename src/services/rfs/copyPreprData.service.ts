import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { CreateRFSTemplateDto } from "src/dto/rfsTemplate/create-rfsTemplate.dto";
import { PagingDto } from "src/dto/paging.dto";
import { RFSRepository } from "src/repos/rfs.repository";
import { JwtPayload } from "src/interface/user/jwt.payload.interface";
import { ExportDto } from "src/dto/export.dto";
import { Response } from 'express';
import { SubmitType } from "src/enum/rfs/submitType.enum";
import { PreprEntity } from "src/entities/prepr/prepr.entity";
import { getRepository } from "typeorm";
import { PreprCopyEntity } from "src/entities/prepr/prepr.entitycopy";
import { AnyMxRecord } from "dns";
import { RFSCopyRepository } from "src/repos/rfsCopy.repository";
import { GetAllUsers } from "../user/getAllUser.service";
import { GetFlatPurchaseOrgService } from "../flat/getFlatPurchaseOrg.service";
import { GetFlatCostService } from "../flat/getFlatCost.service";
import { GetFlatCurrencyService } from "../flat/getFlatCurrency.service";
import { WarrantyService } from "../flat/warranty.service";
import { MailService } from "../mail/mailservice.service";
import { GetDepartmentService } from "../user/getDepartment.service";
import { PrePrSummaryPdfService } from "./preprSummary.service";
@Injectable()
export class CopyPrePrDataService {
  constructor(
    private readonly rfsRepo: RFSCopyRepository,
    private getUserService:GetAllUsers,
    // private readonly getRfsService: GetRFSService,
    // private mailService:MailService,
    private getPurchaseOrg:GetFlatPurchaseOrgService,
    private mailService: MailService,
    private prePrSummaryPdfService: PrePrSummaryPdfService,
    private getCurrencyService:GetFlatCurrencyService,
    private getWarrantyService:WarrantyService,
    private getCostCenter:GetFlatCostService,
    private getDepartmentService:GetDepartmentService
  
  ) { }

  async createPrePrCopy(user:JwtPayload,data:any){
    return await this.rfsRepo.createRFS(user,data,this.getPurchaseOrg,this.getUserService)
  }

  async updatePrePrCopy(user,data:any){
    delete data.history;
    delete data.notification;
    return await this.rfsRepo.updateRFS(user,data,this.getPurchaseOrg,this.getUserService, this.getCostCenter,
      this.getCurrencyService,
      this.getWarrantyService,
      this.getDepartmentService)
  } 

  
  }

  

  