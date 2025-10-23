import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Workbook } from "exceljs";
import { Response } from "express";
import { of } from "rxjs";
import { ExportDto, SearchExportDto } from "src/dto/export.dto";
import { PreprEntity } from "src/entities/prepr/prepr.entity";
import { Environment } from "src/env/environment";
import { RFSRepository } from "src/repos/rfs.repository";
import { getManager, In } from "typeorm";
import { AddressService } from "../flat/address.service";
import { GetFlatCostService } from "../flat/getFlatCost.service";
import { GetFlatCurrencyService } from "../flat/getFlatCurrency.service";
import { GetFlatPurchaseOrgService } from "../flat/getFlatPurchaseOrg.service";
import { WarrantyService } from "../flat/warranty.service";
import { GetDepartmentService } from "../user/getDepartment.service";

@Injectable()
export class ExportPrePrService {
	constructor(
		@InjectRepository(RFSRepository)
		private rfsRepo: RFSRepository,
		private getPurchaseOrgService: GetFlatPurchaseOrgService,
		private getCostCenterService: GetFlatCostService,
		private getCurrencyService: GetFlatCurrencyService,
		private getDepartmentService: GetDepartmentService,
		private getWarrantyService: WarrantyService,
		private getDeliveryAddress: AddressService,


	) { }

	public async exportPrepr(res: Response, exportDto: SearchExportDto,user) {
		const workbook = new Workbook();
		workbook.creator = "P2P Admin";
		workbook.created = new Date();
		const sheet = workbook.addWorksheet("Pre PR");
		// const sheetTeamMebers = workbook.addWorksheet("Team Members");
		sheet.columns = [
			{ header: "Urgent Job", key: "urgentJob" },
			{ header: "Status", key: "submitStatus" },
			{ header: "Reference Number", key: "internalReferenceNumber" },
			{ header: "Pre-PR ID", key: "id" },
			{ header: "Title", key: "title" },
			{ header: "Created By", key: "createdBy" },
			{ header: "Created Date", key: "created_At" },
			{ header: "Final Approver Date", key: "final_approval_date" },
			{ header: "GPD Acceptance Date", key: "gpd_acceptance_date" },
			{ header: "Purchasing Org ", key: "purchasingOrgId" },
			// { header: "templateId", key: "templateId" },
			// { header: "templateName", key: "templateName" },
			// { header: "requestor_name", key: "requestor_name" },
			// { header: "requestor_department", key: "requestor_department" },
			// { header: "requestor_email", key: "requestor_email" },
			// { header: "requestor_phone_number", key: "requestor_phone_number" },
			// { header: "urgentJob_option", key: "urgentJob_option" },
			// { header: "justificationOfPurchase", key: "justificationOfPurchase" },
			// { header: "expectedDeliveryLeadTime", key: "expectedDeliveryLeadTime" },
			// { header: "deliveryAddressType", key: "deliveryAddressType" },
			// { header: "deliveryAddress", key: "deliveryAddress" },
			// { header: "warrantyId", key: "warrantyId" },
			// { header: "recommandedSuppliers", key: "recommandedSuppliers" },
			// { header: "recommandedNewSupplier", key: "recommandedNewSupplier" },
			// { header: "currencyId", key: "currencyId" },
			// { header: "teamMembers", key: "teamMembers" },
			// { header: "purchasingOrgId", key: "purchasingOrgId" },
			// { header: "costCenterId", key: "costCenterId" },
			// { header: "supportingDocuments", key: "supportingDocuments" },
			// { header: "previousPurchase", key: "previousPurchase" },
			// { header: "estimateCost", key: "estimateCost" },
			// { header: "boq", key: "boq" },
			// { header: "reminderAlert", key: "reminderAlert" },
			// { header: "reminderInterval", key: "reminderInterval" },
			// { header: "reminderFrequency", key: "reminderFrequency" },
			// { header: "notifyMe", key: "notifyMe" },
			// { header: "createdBy", key: "createdBy" },
			// { header: "updatedBy", key: "updatedBy" },
			// { header: "levels", key: "levels" },

		];

		let data: any = await this.exportPreprlist(exportDto,user);
		//return "Done";
		console.log(data,"Data");

		// return data;
		for (var i = 0; i < data.length; i++) {
			if(data[i].purchasingOrg)
			data[i].purchasingOrg = await this.getPurchaseOrgService.getFlatPurchaseOrgNameById(Number(data[i].purchasingOrg))
			console.log(data[i].urgent_job,"jobb")
			if(data[i].urgent_job){
				data[i].urgent_job="Yes"
			}else{
				data[i].urgent_job=''
			}
			// data[i].costCenter = await this.getCostCenterService.getFlatCostCenterNameById(Number(data[i].costCenter))
			// data[i].currency = await this.getCurrencyService.getFlatCurrenyNameById(Number(data[i].currency))
			// data[i].requestor_department = await this.getDepartmentService.getDepartmentNameById(Number(data[i].requestor_department))
			// data[i].warranty = await this.getWarrantyService.getWarrantyNameById(Number(data[i].warranty))
			// data[i].teamMembers.forEach((element) => {
			// 	delete element.id;
			// });
			// if(data[i].deliveryAddressType=="List"){
			// 	data[i].deliveryAddress= await this.getDeliveryAddress.getDeliveryAddressNameById(Number(data[i].deliveryAddressId))
			// }
		}
		await data.forEach(async (prePrTemplate) => {
			sheet.addRow({
				srNo: data.indexOf(prePrTemplate) + 1,
				urgentJob: prePrTemplate.urgent_job,
				submitStatus: prePrTemplate.submitStatus,
				internalReferenceNumber: prePrTemplate.internalReferenceNumber,
				id: prePrTemplate.id,
				title: prePrTemplate.title,
				createdBy: prePrTemplate.created_by,
				created_At: prePrTemplate.created_At,
				final_approval_date: prePrTemplate.final_approval_date,
				gpd_acceptance_date: prePrTemplate.gpd_acceptance_date,
				purchasingOrgId: prePrTemplate.purchasingOrg,
				// templateName: prePrTemplate.templateName,
				// requestor_name: prePrTemplate.requestor_name,
				// requestor_department: prePrTemplate.requestor_department,
				// requestor_email: prePrTemplate.requestor_email,
				// requestor_phone_number: prePrTemplate.requestor_phone_number,
				// urgentJob_option: prePrTemplate.urgentJob_option,
				// justificationOfPurchase: prePrTemplate.justificationOfPurchase,
				// expectedDeliveryLeadTime: prePrTemplate.expectedDeliveryLeadTime,
				// deliveryAddressType: prePrTemplate.deliveryAddressType,
				// deliveryAddress: prePrTemplate.deliveryAddress,
				// warrantyId: prePrTemplate.warranty,
				// recommandedSuppliers: prePrTemplate.recommandedSuppliers,
				// recommandedNewSupplier: prePrTemplate.recommandedNewSupplier,
				// currencyId: prePrTemplate.currency,
				// teamMembers: prePrTemplate.teamMembers,
				// costCenterId: prePrTemplate.costCenter,
				// supportingDocuments:prePrTemplate.supportingDocuments
				// .map((docs)=>docs.fileOriginalName)
				// .toString(),
				// previousPurchase: prePrTemplate.previousPurchase,
				// estimateCost: prePrTemplate.estimateCost,
				// boq:prePrTemplate.boq,
				// reminderAlert: prePrTemplate.reminderAlert,
				// reminderInterval: prePrTemplate.reminderInterval,
				// reminderFrequency: prePrTemplate.reminderFrequency,
				// notifyMe: prePrTemplate.notifyMe,
				// updatedBy: prePrTemplate.updated_by,
				// levels: prePrTemplate.levels
				// 	.map((level) => level.userRole)
				// 	.toString(),
			});

		});
		sheet.columns.forEach((column) => {
			column.width = column.header.length < 20 ? 20 : column.header.length;
		});
		sheet.getRow(1).eachCell((cell) => {
			cell.font = { bold: true };
			cell.fill = {
				type: "pattern",
				pattern: "solid",
				bgColor: { argb: "fdf731" },
				fgColor: { argb: "fdf731" },
			};
		});

		res.attachment("prePrs.xlsx");
		await workbook.xlsx.write(res);
	}

	public async exportPreprlist(
		exportDto: SearchExportDto,user
	): Promise<PreprEntity[]> {
		let keyword = exportDto.keyword || "";
		let status = exportDto.status || "";
		 let statusList;
    if(status){
      statusList = status.split(",")
      console.log
    }
	let data = this.rfsRepo
	.createQueryBuilder('PRE_PR_LIST')
	.orderBy('PRE_PR_LIST.created_At', 'DESC')
	.leftJoinAndSelect('PRE_PR_LIST.teamMembers', 'PREPR_TEAM_MEMBERS')
	.leftJoinAndSelect(
	  'PRE_PR_LIST.levels',
	  'PREPR_LEVEL',
	)
	// .leftJoinAndSelect('PRE_PR_LIST.supportingDocuments', 'PRE_PR_DOCUMENTS')
	.where('PRE_PR_LIST.userId = :userId ',{ userId:user.userId})
	.where('PRE_PR_LIST.templateName ILIKE :q', { q: `%${keyword}%` })
   
	// .andWhere('PRE_PR_LIST.submitStatus = :q', {
	//   q:status,
	// })
	.orWhere('cast(PRE_PR_LIST.id as text) ILIKE :q', {
	  q: `%${keyword}%`,
	})
	.orWhere('PRE_PR_LIST.title ILIKE :q', {
	  q: `%${keyword}%`,
	})
	.orWhere('PRE_PR_LIST.purchasingOrgName ILIKE :q', {
	  q: `%${keyword}%`,
	})
	.orWhere('PRE_PR_LIST.internalReferenceNumber ILIKE :q', {
	  q: `%${keyword}%`,
	})
	.orWhere('PRE_PR_LIST.created_by ILIKE :q', {
	  q: `%${keyword}%`,
	})
	.orWhere('PRE_PR_LIST.urgentJobOption ILIKE :q', {
	  q: `%${keyword}%`,
	})
	// .orWhere('PRE_PR_LEVELS.levelName ILIKE :q', { q: `%${keyword}%` })
//   let page: number = pagingDto.page || 1;
//   let limit: number = pagingDto.size || 10;
  // let total = await data.getCount();
  const newData:any=[];
  // data.offset((page - 1) * limit).limit(limit);
 const  data1:any= await data.getMany();
	
  for await(let el of data1){
	let teamMembers = el.teamMembers.find(tm =>tm.userId==user.userId)
	let levels = el.levels.find(tm =>tm.userId==user.userId)
	  console.log(teamMembers,"team members")
	  if((statusList && status=="all") || status ==""){
		if(el.userId==user.userId || teamMembers!=undefined || levels!=undefined){
		  newData.push(el);
		}
	  }
	else if(statusList){
	  if(statusList.includes(el.submitStatus)  && (el.userId==user.userId || teamMembers!=undefined || levels!=undefined)){
		newData.push(el);
	  }
	} 
  }
		return newData;
		
	}
}
