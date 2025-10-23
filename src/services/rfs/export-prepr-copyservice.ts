import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Workbook } from "exceljs";
import { Response } from "express";
import { of } from "rxjs";
import { ExportDto } from "src/dto/export.dto";
import { PreprEntity } from "src/entities/prepr/prepr.entity";
import { SubmitType } from "src/enum/rfs/submitType.enum";
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
export class ExportPrePrCopyService {
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

	public async exportPreprCopy(res: Response, exportDto: ExportDto) {
		const workbook = new Workbook();
		workbook.creator = "P2P Admin";
		workbook.created = new Date();
		const sheet = workbook.addWorksheet("Pre PR Copy");
		// const sheetTeamMebers = workbook.addWorksheet("Team Members");
		sheet.columns = [
			// { header: "Urgent Job", key: "urgentJob" },
			// { header: "Status", key: "submitStatus" },
			{ header: "Title", key: "title" },
			{ header: "Reference Number", key: "internalReferenceNumber" },
			{ header: "Pre-PR ID", key: "id" },
			{ header: "Created By", key: "createdBy" },
			{ header: "Created Date", key: "created_At" },
			{ header: "Purchasing Org ", key: "purchasingOrgId" },


		];

		let data: any = await this.exportPreprlist(exportDto);
		//return "Done";
		console.log(data);

		// return data;
		for (var i = 0; i < data.length; i++) {
			if (data[i].purchasingOrg)
				data[i].purchasingOrg = await this.getPurchaseOrgService.getFlatPurchaseOrgNameById(Number(data[i].purchasingOrg))

		}
		await data.forEach(async (prePrTemplate) => {
			sheet.addRow({
				srNo: data.indexOf(prePrTemplate) + 1,
				title: prePrTemplate.title,
				internalReferenceNumber: prePrTemplate.internalReferenceNumber,
				id: prePrTemplate.id,
				createdBy: prePrTemplate.created_by,
				created_At: prePrTemplate.created_At,
				purchasingOrgId: prePrTemplate.purchasingOrg,
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

		res.attachment("prePrsCopy.xlsx");
		await workbook.xlsx.write(res);
	}

	public async exportPreprlist(
		exportDto: ExportDto
	): Promise<PreprEntity[]> {
		let keyword = exportDto.keyword || "";
		let data = this.rfsRepo
			.createQueryBuilder('PRE_PR_LIST')
			.where(' cast(PRE_PR_LIST.id as text) ILIKE :q', {
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
		const newData: any = [];
		const data1: any = await data.getMany();
		for await (let el of data1) {
			console.log(el.submitStatus, "stats")
			if (el.submitStatus === SubmitType.FINISHED) {
				console.log(el, "approve data")
				newData.push(el);
			}
		}
		return newData;

	}
}
