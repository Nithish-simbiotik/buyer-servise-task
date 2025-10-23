import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { CreateRFSDto } from 'src/dto/rfs/create-rfs.dto';
import { CreateRFSTemplateDto } from 'src/dto/rfsTemplate/create-rfsTemplate.dto';
import { PagingDto } from 'src/dto/paging.dto';
import { RFSRepository } from 'src/repos/rfs.repository';
import { RFSTemplateRepository } from 'src/repos/rfsTemplate.repository';
// import { CostCenterRepository } from "src/repos/flats/costCenter.repository";
import { getManager, getRepository, Repository } from 'typeorm';
// import { PurchaseOrgRepository } from "src/repos/flats/purchaseOrg.repository";
import { FlatTableList } from 'src/enum/flat/flatTables.enum';
import { Environment } from 'src/env/environment';
import { AnyRecord } from 'dns';
import { GetAllUsers } from '../user/getAllUser.service';
import { PurchaseOrgRepository } from 'src/repos/comon-repos/purchasingOrg.repository';
@Injectable()
export class GetFlatPurchaseOrgService {
  constructor(
    // @InjectConnection('test-database')
    // private readonly flatRepo: PurchaseOrgRepository,
    // private PurchaseOrgRepo : PurchaseOrgRepository,
    private getUserService: GetAllUsers,
  ) {}

  async getFlatCostList(pagingDto: PagingDto) {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(FlatTableList.purchase_org, FlatTableList.purchase_org)
      .getRawMany();
    return listData;
  }

  async getFlatPurchaseOrgNameById(id: number): Promise<string> {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(FlatTableList.purchase_org, FlatTableList.purchase_org)
      .where('porg_code = :id', { id: id })
      .getRawOne();
    // console.log("List data :: ",id,listData.name);
    if (listData) {
      // let dataString =`${listData.company_code} - ${listData.name}`;
      return listData.name;
    }
    return '';
  }

  async getFlatPurchaseOrgIdByName(name: string): Promise<number> {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('porg_code')
      .from(FlatTableList.purchase_org, FlatTableList.purchase_org)
      .where('name = :id', { id: name })
      .getRawOne();
    console.log('List data :: ', name, listData.porg_code);
    return await Number(listData.porg_code);
  }

  async getFlatPurchaseOrgByNameandCompany(
    name: string,
    company_code: string,
  ): Promise<number> {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('porg_code')
      .from(FlatTableList.purchase_org, FlatTableList.purchase_org)
      .where('name = :name', { name: name.trim() })
      // .where('company_code = :company_code',{company_code:company_code.trim()})
      .getRawOne();
    // console.log("List data :: ",id,listData.name);
    if (listData) return await Number(listData.porg_code);

    return 0;
  }

  async getFlatPurchaseOrgName(id: number): Promise<string> {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(FlatTableList.purchase_org, FlatTableList.purchase_org)
      .where('porg_code = :id', { id: id })
      .getRawOne();
    // console.log("List data :: ",id,listData.name);
    if (listData) {
      // let dataString =`${listData.company_code} - ${listData.name}`;
      return listData.name;
    }
    return '';
  }
  async getFlatPurchaseOrgData(id: number): Promise<any> {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(FlatTableList.purchase_org, FlatTableList.purchase_org)
      .where('porg_code = :id', { id: id })
      .getRawOne();

    if (listData) {
      let address = `${listData.display_name}${
        listData.address_line1 ? ',<br> ' + listData.address_line1 : ''
      }${listData.address_line2 ? ', ' + listData.address_line2 : ''}${
        listData.address_line_3 ? ', ' + listData.address_line_3 + '.' : '.'
      }`;
      const data = {
        address: address,
        logo: listData.logo,
      };
      return data;
    }
    return '';
  }

  async getFlatPurchaseOrgNameByCode(id: string): Promise<string> {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('display_name')
      .from(FlatTableList.purchase_org, FlatTableList.purchase_org)
      .where('code = :id', { id: Number(id) })
      .getRawOne();
    // console.log("List data :: ",id,listData.name);
    if (listData) {
      // let dataString =`${listData.company_code} - ${listData.name}`;
      return listData.display_name;
    }
    return '';
  }

  async getFlatPurchaseNameByCode(id: string): Promise<string> {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('name')
      .from(FlatTableList.purchase_org, FlatTableList.purchase_org)
      .where('code = :id', { id: Number(id) })
      .getRawOne();
    // console.log("List data :: ",id,listData.name);
    if (listData) {
      // let dataString =`${listData.company_code} - ${listData.name}`;
      return listData.name;
    }
    return '';
  }

  async getFlatPurchaseOrgUserList(id: number): Promise<string> {
    let data = await this.getUserService.getUserPurchaseOrg(id);
    console.log(data, 'data n purc');
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('name,code')
      .from(FlatTableList.purchase_org, FlatTableList.purchase_org)
      .where('porg_code IN (:...id)', { id: data })
      .execute();
    // console.log("List data :: ",id,listData.name);
    if (listData) {
      // let dataString =`${listData.company_code} - ${listData.name}`;
      return listData;
    }
    return '';
  }
}
