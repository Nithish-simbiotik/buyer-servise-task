import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Workbook } from "exceljs";
import { Response } from "express";
import { ExportDto } from "src/dto/export.dto";
import { SupplierRoleRepository } from "src/repos/supplier-repos/supplier-role.repository";

const moment = require("moment");

@Injectable()
export class ExportSupplierRoleService {
  constructor(
    @InjectRepository(SupplierRoleRepository)
    private supplierRoleRepository: SupplierRoleRepository
  ) {}

  public async exportSupplierRole(res: Response, exportDto: ExportDto) {
    const workbook = new Workbook();
    workbook.creator = "P2P Admin";
    workbook.created = new Date();
    const sheet = workbook.addWorksheet("Supplier Roles");
    sheet.columns = [
      { header: "Supplier Role", key: "supp_name" },
      { header: "Suppliers", key: "suppliers" },
      { header: "Created By", key: "created_by" },
      { header: "Created Date Time", key: "created_at" },
      { header: "Updated By", key: "updated_by" },
      { header: "Updated Date Time", key: "updated_at" },
      { header: "Status", key: "status" },
    ];
    const supplierRoleList =
      await this.supplierRoleRepository.exportSupplierRoleList(exportDto);
    supplierRoleList.forEach((supplierRole) => {
      sheet.addRow({
        supp_name: supplierRole.supplierRoleName,
        suppliers: supplierRole.selectedSuppliers.toString(),

        created_by: supplierRole.createdBy,
        created_at: moment(supplierRole.createdAt)
          .utcOffset(exportDto.offset)
          .format("YYYY/MM/DD hh:mm:ss a"),
        updated_by: supplierRole.updatedBy,
        updated_at:
          supplierRole.updatedAt == null
            ? null
            : moment(supplierRole.updatedAt)
                .utcOffset(exportDto.offset)
                .format("YYYY/MM/DD hh:mm:ss a"),
        status: supplierRole.status,
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

    res.attachment("SupplierRoles.xlsx");
    await workbook.xlsx.write(res);
  }
}
