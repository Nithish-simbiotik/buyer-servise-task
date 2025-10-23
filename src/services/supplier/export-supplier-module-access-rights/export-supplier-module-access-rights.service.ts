import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Workbook } from "exceljs";
import { Response } from "express";
import { ExportDto } from "src/dto/export.dto";
import { SupplierModuleAccessRightsRepository } from "src/repos/supplier-repos/supplier-module-access-rights.repository";
const moment = require("moment");

@Injectable()
export class ExportSupplierModuleAccessRightsService {
  constructor(
    @InjectRepository(SupplierModuleAccessRightsRepository)
    private moduleAccessRepository: SupplierModuleAccessRightsRepository
  ) {}

  public async exportSupplierModuleAccessRightsService(
    res: Response,
    exportDto: ExportDto
  ) {
    const workbook = new Workbook();
    workbook.creator = "P2P Admin";
    workbook.created = new Date();
    const sheet = workbook.addWorksheet("Supplier Modules Access");
    sheet.columns = [
      { header: "Access Rights Name", key: "acc_rights_name" },
      { header: "Access Rights Details", key: "acc_rights_details" },
      { header: "Created By", key: "created_by" },
      { header: "Created Date Time", key: "created_at" },
      { header: "Updated By", key: "updated_by" },
      { header: "Updated Date Time", key: "updated_at" },
      { header: "Status", key: "status" },
    ];
    const moduleAccessList =
      await this.moduleAccessRepository.exportModuleAccessRights(exportDto);
    moduleAccessList.forEach((moduleList) => {
      sheet.addRow({
        acc_rights_name: moduleList.accessRightName,
        acc_rights_details: moduleList.userAccessRights,
        created_by: moduleList.createdBy,
        created_at: moment(moduleList.createdAt)
          .utcOffset(exportDto.offset)
          .format("YYYY/MM/DD hh:mm:ss a"),
        updated_by: moduleList.updatedBy,
        updated_at:
          moduleList.updatedAt == null
            ? null
            : moment(moduleList.updatedAt)
                .utcOffset(exportDto.offset)
                .format("YYYY/MM/DD hh:mm:ss a"),
        status: moduleList.status,
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

    res.attachment("SupplierModuleAccessRights.xlsx");
    await workbook.xlsx.write(res);
  }
}
