import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRFSDto } from 'src/dto/rfs/create-rfs.dto';
import { PagingDto } from 'src/dto/paging.dto';
import { PreprEntity } from 'src/entities/prepr/prepr.entity';
import { RFSRepository } from 'src/repos/rfs.repository';
import { GetFlatCostService } from '../flat/getFlatCost.service';
import { GetFlatPurchaseOrgService } from '../flat/getFlatPurchaseOrg.service';
import { WarrantyService } from '../flat/warranty.service';
import { AddressService } from '../flat/address.service';
import { GetFlatCurrencyService } from '../flat/getFlatCurrency.service';
import { GetAllUsers } from '../user/getAllUser.service';
import { SupplierService } from '../flat/supplier.service';
import { Response } from 'express';
import { UOMService } from '../flat/uom.service';
import { InternalOrderService } from '../flat/internalOrder.service';
import { PartNumberService } from '../flat/partNumber.service';
import { GetFlatDepartmentService } from '../flat/getDepartment.service';
import { getRepository } from 'typeorm';
import { PrePdfEntity } from 'src/entities/prepr/prepr_pdf.entity';

@Injectable()
export class GetRFSService {
  constructor(
    private readonly rfsRepo: RFSRepository,
    private getCostCenter:GetFlatCostService,
    private getPurchaseOrg:GetFlatPurchaseOrgService,
    private getCurrencyService:GetFlatCurrencyService,
    private getDeliveryAddress:AddressService,
    private getWarrantyService:WarrantyService,
    private getUserService:GetAllUsers,
    private getSupplierService:SupplierService,
    private getUOMService: UOMService,
    private getinternalOrderService: InternalOrderService,
		private getPartNumber: PartNumberService,
    private getDepartment: GetFlatDepartmentService
  ){}

  async getRFSList(res: Response, pagingDto: PagingDto) {
    let keyword: string = pagingDto.keyword || '';
    let data = this.rfsRepo
      .createQueryBuilder('PRE_PR_LIST')
      .orderBy('PRE_PR_LIST.created_At', 'DESC')
      .leftJoinAndSelect('PRE_PR_LIST.levels', 'PRE_PR_LEVELS')
      // .leftJoinAndSelect(
      //   'PRE_PR_LIST.recommandedSuppliers',
      //   'PRE_PR_RECOMMANDED_SUPPLIERS',
      // )
      // .leftJoinAndSelect('PRE_PR_LIST.supportingDocuments', 'PRE_PR_DOCUMENTS')
      .where('PRE_PR_LIST.templateName ILIKE :q', { q: `%${keyword}%` })
      // .orWhere('cast(PRE_PR_LIST.requestor_department as text) ILIKE :q', {
      //   q: `%${keyword}%`,
      // })
      .orWhere('PRE_PR_LIST.requestor_email ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('cast(PRE_PR_LIST.requestor_phone_number as text) ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PRE_PR_LIST.title ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('cast(PRE_PR_LIST.purchasingOrg as text) ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PRE_PR_LIST.internalReferenceNumber ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PRE_PR_LIST.urgentJobOption ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PRE_PR_LEVELS.levelName ILIKE :q', { q: `%${keyword}%` });
    let page: number = pagingDto.page || 1;
    let limit: number = pagingDto.size || 10;
    let total = await data.getCount();
    data.offset((page - 1) * limit).limit(limit);
    const  data1:any= await data.getMany();
    for(let i=0;i<data1.length;i++){
      // console.log(data1[i],"data")
      if(data1[i].purchasingOrg)
      data1[i].purchasingOrg =await this.getPurchaseOrg.getFlatPurchaseOrgNameById(data1[i].purchasingOrg)
    }
    return res.send({
      data: data1,
      total,
      page,
    });
  }

  async getRFSById(id:number) {
    let data:any = await this.rfsRepo.findOne({id:id},{relations: ['teamMembers','boq','history','notifications','levels','recommandedSuppliers','supportingDocuments','notificationsHistory']
    });
    let department=await this.getDepartment.getDepartmentById(data.requestor_department);
    data.department =department.department_name;
    
    let departmentName = await this.getDepartment.getDepartmentById(await this.getUserService.getDepatmentIdByUserId(data.userId));
   if(departmentName)
    data.requestor_departmentName =departmentName.department_name
    
    if(data.form_department){
    let department1=await this.getDepartment.getDepartmentById(data.form_department);
      data.form_departmentName=department1.department_name
  }else{
    data.form_departmentName="";
  }
  if(data.template_department){
    let department1=await this.getDepartment.getDepartmentById(data.template_department);
      data.template_departmentName=department1.department_name
  }else{
    data.template_departmentName="";
  }
    if(data.purchasingOrg)
    data.purchasingOrgName= await this.getPurchaseOrg.getFlatPurchaseOrgNameById(data.purchasingOrg)
    console.log(data,"dataaa")
    console.log(data.deliveryAddressType,"dbdd")
    console.log(data.deliveryAddressId,"del idd")
    // return "";
    if(data.deliveryAddressType=="List")
    data.deliveryAddress=await this.getDeliveryAddress.getDeliveryAddressNameById(data.deliveryAddressId)
    if(data.currency)
    data.currencyName=await this.getCurrencyService.getFlatCurrenyNameById(data.currency)
    if(data.warranty)
    data.warrantyName=await this.getWarrantyService.getWarrantyNameById(data.warranty)
    if(data.costCenter)
    data.costCenterName=await this.getCostCenter.getFlatCostCenterNameById(data.costCenter)
    console.log(data.teamMembers,"memeer")
    for(let i=0;i<data.teamMembers.length;i++){
      if(data.teamMembers[i].userId)
      data.teamMembers[i].userName=await this.getUserService.getUserNameById(data.teamMembers[i].userId)
    }
    for (let i = 0; i < data.recommandedSuppliers.length; i++) {
      data.recommandedSuppliers[i].supplierName =
        await this.getSupplierService.getSupplierNameById(
          data.recommandedSuppliers[i].supplierId,
        );
    }
    for (let i = 0; i < data.levels.length; i++) {
      if(data.levels[i].departmentId && data.levels[i].userRole)
      data.levels[i].userName =
        await this.getUserService.getUserNameByRoleandDepatmentId(
          data.levels[i].departmentId,
          data.levels[i].userRole,
        );
    }
    for (let i = 0; i < data.notificationsHistory.length; i++) {
      if(data.notificationsHistory[i].departmentId && data.notificationsHistory[i].userRole)
      data.notificationsHistory[i].userName =
        await this.getUserService.getUserNameByRoleandDepatmentId(
          data.notificationsHistory[i].departmentId,
          data.notificationsHistory[i].userRole,
        );
    }
    for(let i=0;i<data.boq.length;i++){
     
      if(data.boq[i].uomId)
      data.boq[i].uomName=await this.getUOMService.getUOMNameById(data.boq[i].uomId)
      if(data.boq[i].costCenterId)
      data.boq[i].costCenterName=await this.getCostCenter.getFlatCostCenterNameById( data.boq[i].costCenterId)
      if(data.boq[i].internalOrderNoId)
      data.boq[i].internalOrderName=await this.getinternalOrderService.getInternalOrderNumberNameById(data.boq[i].internalOrderNoId)
      if(data.boq[i].partNumberId)
      data.boq[i].partNumberName=await this.getPartNumber.getPartNumberNameById(data.boq[i].partNumberId)
    }
    return data;
  }

  async pdfSummay(rfsId:number){
  let data = await getRepository(PrePdfEntity).findOne({preprId:rfsId});
  return data.pdfUrl;
  }


  async getRFSByIdforRFX(id:number) {
    let data:any = await this.rfsRepo.findOne({id:id},{select:['id','title','urgent_job','urgentJobOption','internalReferenceNumber','justificationOfPurchase','expectedDeliveryLeadTime','deliveryAddressId','deliveryAddress','deliveryAddressType','warranty','previousPurchase','estimateCost','costCenter','currency','purchasingOrg','purchasingOrgName'],relations: ['teamMembers','recommandedSuppliers']
    });
    if(data.deliveryAddressType=="List")
    data.deliveryAddress=await this.getDeliveryAddress.getDeliveryAddressNameById(data.deliveryAddressId)
   
   
   
  return data;
  }
}



