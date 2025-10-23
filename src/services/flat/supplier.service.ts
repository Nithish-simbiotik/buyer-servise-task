import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { CreateRFSDto } from 'src/dto/rfs/create-rfs.dto';
import { CreateRFSTemplateDto } from 'src/dto/rfsTemplate/create-rfsTemplate.dto';
import { PagingDto } from 'src/dto/paging.dto';
import { RFSRepository } from 'src/repos/rfs.repository';
import { RFSTemplateRepository } from 'src/repos/rfsTemplate.repository';
// import { FlatRepository } from "src/repos/flats/costCenter.repository";
import { getManager, getRepository, Repository } from 'typeorm';
import { FlatTableList } from 'src/enum/flat/flatTables.enum';
import { Environment } from 'src/env/environment';
@Injectable()
export class SupplierService {
  constructor() // @InjectConnection('test-database')
  // private readonly flatRepo: FlatRepository,
  {}

  async getSupplierList(pagingDto: PagingDto) {
    let newSupp = [];
    const manager = getManager(Environment.postgres.supplierdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(FlatTableList.supplier, FlatTableList.supplier)
      .getRawMany();
    // console.log(listData)
    for (let i = 0; i < listData.length; i++) {
      const arr = listData[i].selectedSupplierTags.split(',');
      console.log(arr, 'tag array');
      if (!arr.includes('Inactive')) {
        newSupp.push(listData[i]);
      }
    }
    return newSupp;
  }

  async getSupplierNameById(id: any) {
    console.log(id,"id")
    const manager = getManager(Environment.postgres.supplierdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('"companyName"')
      .from(FlatTableList.supplier, FlatTableList.supplier)
      .where('"id" =:id', { id: id })
      .getRawOne();
    // console.log("company_name:: ", listData);
    if (listData) return listData.companyName;

    return '';
  }

  async getSupplierNameByVendor(id: any) {
    console.log(id,"id")
    const manager = getManager(Environment.postgres.supplierdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('"companyName"')
      .from(FlatTableList.supplier, FlatTableList.supplier)
      .where('"vendorCode" =:id', { id: id })
      .getRawOne();
    // console.log("company_name:: ", listData);
    if (listData) return listData.companyName;

    return '';
  }
}
