import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Workbook } from "exceljs";
import { Response } from "express";
import { ExportDto } from "src/dto/export.dto";
import { SupplierRepository } from "src/repos/supplier-repos/supplier.repository";
// import { SupplierDto } from "src/dto/supplier.dto";
const moment = require("moment");
@Injectable()
export class ExportSupplierService {
  constructor(
    @InjectRepository(SupplierRepository)
    private supplierRepository: SupplierRepository
  ) {}

  public async exportSupplier(res: Response, exportDto: ExportDto) {
    const workbook = new Workbook();
    workbook.creator = "P2P Admin";
    workbook.created = new Date();
    const sheet = workbook.addWorksheet("Supplier");
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
      { header: "Status", key: "status" },
      { header: "Creation Date", key: "created_at" },
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
    const supplierList = await this.supplierRepository.exportSupplierList(
      exportDto
    );
    supplierList.forEach((supplier) => {
      sheet.addRow({
        srNo: supplierList.indexOf(supplier) + 1,
        c_name: supplier.companyName,
        r_num: supplier.registrationNumber,
        c_type: supplier.companyType,
        v_code: supplier.vendorCode,
        year: supplier.yearOfEstablishment,
        tax_num: supplier.taxRegistrationNumber,
        add_1: supplier.addressLine1,
        add_2: supplier.addressLine2,
        add_3: supplier.addressLine3,
        postcode: supplier.postcode,
        city: supplier.city,
        country: supplier.country,
        phone: supplier.phoneNumber,
        fax: supplier.faxNumber,
        website: supplier.website,
        u_name: supplier.userName,
        email: supplier.communicationEmailAddress,
        status: supplier.status,
        created_at: moment(supplier.createdAt)
          .utcOffset(exportDto.offset)
          .format("YYYY/MM/DD hh:mm:ss a"),
        w_name: supplier.windowPersonName,
        w_phone: supplier.windowPersonPhoneNumber,
        pic_email: supplier.accountPicEmail,
        bank_name: supplier.bankName,
        bank_acc_name: supplier.bankAccountName,
        bank_acc_num: supplier.bankAccountNumber,
        term: supplier.paymentTerm,
        supp_category: supplier.industryCategory
          .map((industry) => industry.industryCategory)
          .toString(),
        supp_tags: supplier.supplierTags
          .map((tag) => tag.supplierTag)
          .toString(),
        bumi_status: supplier.bumiputraStatus,
        capital: supplier.paidUpCapital,
        shareholder: supplier.shareholderName,
        director: supplier.directorsName,
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

    res.attachment("Suppliers.xlsx");
    await workbook.xlsx.write(res);
  }
}
