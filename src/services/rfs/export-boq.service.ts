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
export class ExportBOQService {
  constructor(
    // @InjectRepository(SupplierRepository)
    private costService: GetFlatCostService,
    private uomService: UOMService,
    private internalOrderService: InternalOrderService,
    private partNumberService: PartNumberService,
  ) {}

  public async exportSupplier(res: Response, data: any, purchaseOrg) {
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
    const dropdownSheet = workbook.addWorksheet('DropdownData',{
      state:'hidden'
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
    const costCenterList = await this.costService.getFlatCostListByPurchaseOrg(
      purchaseOrg,
    );
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

    for (let i = 0; i < data.length; i++) {
      sheet.addRow({
        srNo: i + 1,
        itemName: data[i].itemName,
        itemDescription: data[i].itemDescription,
        equivalent_brand: data[i].equivalentBrandAllowed,
        brand: data[i].brand,
        model: data[i].model,
        uom: await this.uomService.getUOMNameById(data[i].uomId),
        quantity: data[i].quantity,
        costCenter: await this.costService.getFlatCostCenterNameById(
          data[i].costCenterId,
        ),
        wordOrderNo: data[i].wordOrderNo,
        internalOrderNo:
          await this.internalOrderService.getInternalOrderNumberNameById(
            data[i].internalOrderNoId,
          ),
        partNumber: await this.partNumberService.getPartNumberNameById(
          data[i].partNumberId,
        ),
      });
    }

    for (let i = 2; i <= 1000; i++) {
      sheet.getCell('C' + i).dataValidation = {
        type: 'list',
        allowBlank: false,
        formulae: ['"Yes, Yes with option, No, Not applicable"'],
      };
      sheet.getCell('G' + i).dataValidation = {
        type: 'list',
        allowBlank: false,
        formulae: [`=DropdownData!$A$2:$A$${uomNameList.length}`],
      };
      sheet.getCell('H' + i).dataValidation = {
        type: 'list',
        allowBlank: false,
        formulae: [`DropdownData!$B$2:B$${costCenterCode.length}`],
      };
      sheet.getCell('J' + i).dataValidation = {
        type: 'list',
        allowBlank: false,
        formulae: [`=DropdownData!$C$2:$C$${internalOrderNumber.length}`],
      };
      sheet.getCell('K' + i).dataValidation = {
        type: 'list',
        allowBlank: false,
        formulae: [`=DropdownData!$D$2:$D$${partMaterialNumber.length}`],
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

    res.attachment('BillOfQuantity.xlsx');
    await workbook.xlsx.write(res);
  }
}
