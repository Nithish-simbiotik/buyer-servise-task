import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Workbook } from 'exceljs';
import { Response } from 'express';
import { GetFlatCostService } from '../flat/getFlatCost.service';
import { InternalOrderService } from '../flat/internalOrder.service';
import { PartNumberService } from '../flat/partNumber.service';
import { UOMService } from '../flat/uom.service';
// import { ExportDto } from "src/common/dto/export.dto";
// import { SupplierRepository } from "src/repos/supplier.repository";
// import { SupplierDto } from "src/dto/supplier.dto";

@Injectable()
export class SampleBOQService {
  constructor(
    private costService: GetFlatCostService,
    private uomService: UOMService,
    private internalOrderService: InternalOrderService,
    private partNumberService: PartNumberService,
  ) {}

  public async sampleBOQ(res: Response) {
    const workbook = new Workbook();
    workbook.creator = 'P2P Admin';
    workbook.created = new Date();
    const sheet = workbook.addWorksheet('Bill Of Quantity');
    sheet.columns = [
      { header: 'Item Name*', key: 'itemName' },
      { header: 'Item Description', key: 'itemDescription' },
      { header: 'Equivalent Brand Allowed ?*', key: 'equivalent_brand' },
      { header: 'Brand', key: 'brand' },
      { header: 'Model', key: 'model' },
      { header: 'Quantity*', key: 'quantity' },
      { header: 'UOM*', key: 'uom' },
      { header: 'Cost Center*', key: 'costCenter' },
      { header: 'Work Order No', key: 'wordOrderNo' },
      { header: 'Internal Order No', key: 'internalOrderNo' },
      { header: 'Part Number', key: 'partNumber' },
    ];
    const dropdownSheet = workbook.addWorksheet('DropdownData', {
      state: 'hidden',
    });
    dropdownSheet.columns = [
      { header: 'UOM', key: 'uom' },
      { header: 'Cost Center', key: 'costCenter' },
      { header: 'Internal Order No', key: 'internalOrderNo' },
      { header: 'Part Number', key: 'partNumber' },
    ];
    const uomList = await this.uomService.getUOMList();
    const uomNameList = uomList.map((list) => {
      return `${list.name} - ${list.description}`;
    });
    const costCenterList = await this.costService.getFlatCostList();
    const costCenterCode = costCenterList.map((list) => {
      return `${list.code} - ${list.description}`;
    });
    const internalOrder =
      await this.internalOrderService.getInternalOrdertList();
    const internalOrderNumber = internalOrder.map((list) => {
      return `${list.order_number} - ${list.description}`;
    });
    const partNumberList = await this.partNumberService.getPartNumberList();
    const partMaterialNumber = partNumberList.map((list) => {
      return `${list.pir_number} - ${list.material_number}`;
    });
    for (
      let i = 0;
      i < uomNameList.length ||
      i < costCenterCode.length ||
      i < internalOrderNumber.length ||
      i < partMaterialNumber.length;
      i++
    ) {
      dropdownSheet.addRow({
        uom: uomNameList[i],
        costCenter: costCenterCode[i],
        internalOrderNo: internalOrderNumber[i],
        partNumber: partMaterialNumber[i],
      });
    }
    for (let i = 0; i < 9999; i++) {
      sheet.getCell('C' + (i + 2)).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"Yes, Yes with option, No, Not applicable"'],
      };
      sheet.getCell('G' + (i + 2)).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['DropdownData!A2:A9999'],
      };
      sheet.getCell('H' + (i + 2)).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['DropdownData!B2:B9999'],
      };
      sheet.getCell('J' + (i + 2)).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['DropdownData!C2:C9999'],
      };
      sheet.getCell('K' + (i + 2)).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['DropdownData!C2:C9999'],
      };
    }

    sheet.columns.forEach((column) => {
      column.width = column.header.length < 20 ? 20 : column.header.length;
    });
    sheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        bgColor: { argb: 'fdf731' },
        fgColor: { argb: 'fdf731' },
      };
    });

    res.attachment('SampleBillOfQuantity.xlsx');
    await workbook.xlsx.write(res);
  }
}
