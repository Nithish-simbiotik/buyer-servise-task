import { Injectable } from "@nestjs/common";
import { Workbook } from "exceljs";
import { Response } from "express";

@Injectable()
export class ExportSupplierTemplateService {
	constructor() {}

	public async exportSupplierTemplate(res: Response) {
		const workbook = new Workbook();
		workbook.creator = "P2P Admin";
		workbook.created = new Date();
		const sheet = workbook.addWorksheet("Supplier Template");
		sheet.columns = [
			{ header: "Company Name", key: "c_name" },
			{ header: "Registration Number", key: "r_num" },
			{ header: "Company Type", key: "c_type" },
			{ header: "Vendor Code", key: "v_code" },
			{ header: "Year of Establishment", key: "year" },
			{ header: "Tax Registration Number", key: "tax_num" },
			{ header: "Address Line 1", key: "add_1" },
			{ header: "Address Line 2", key: "add_2" },
			{ header: "Address Line 3", key: "add_3" },
			{ header: "Postcode", key: "postcode" },
			{ header: "City", key: "city" },
			{ header: "State", key: "state" },
			{ header: "Country", key: "country" },
			{ header: "Phone Number", key: "phone" },
			{ header: "Fax Number", key: "fax" },
			{ header: "Website", key: "website" },
			{ header: "Username", key: "u_name" },
			{ header: "Primary Email Address", key: "email" },
			{ header: "Window Person Name", key: "w_name" },
			{ header: "Window Person Phone Number", key: "w_phone" },
			{ header: "Account PIC Email", key: "pic_email" },
			{ header: "Bank Name", key: "bank_name" },
			{ header: "Bank Account Name", key: "bank_acc_name" },
			{ header: "Bank Account Number", key: "bank_acc_num" },
			{ header: "Payment Term", key: "term" },
			{ header: "Supplier Category", key: "supp_category" },
			{ header: "Supplier Tags", key: "supp_tags" },
			{ header: "Bumipurta Status", key: "bumi_status" },
			{ header: "Paid Up Capital", key: "capital" },
			{ header: "Shareholder Name", key: "shareholder" },
			{ header: "Director Name", key: "director" },
		];
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

		res.attachment("Supplier-Template.xlsx");
		await workbook.xlsx.write(res);
	}
}
