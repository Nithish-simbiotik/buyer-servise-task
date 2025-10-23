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
import { list } from 'pdfkit';
@Injectable()
export class GetFlatCostService {
  constructor() {} // private readonly flatRepo: FlatRepository, // @InjectConnection('test-database')

  // async getFlatCostList(pagingDto: PagingDto) {
  //   return await getRepository(TestEntity,'test-database').find();
  // }

  async getFlatCostList() {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(FlatTableList.costcenter, FlatTableList.costcenter)
      .where('"status" =:status', { status: 'Active' })
      .getRawMany();
    const costCentreList = listData.map((list) => ({
      ...list,
      codeDesc: `${list.code} - ${list.description}`,
    }));
    return costCentreList;
  }
  async getFlatCostListByPurchaseOrg(companycode: string) {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(FlatTableList.costcenter, FlatTableList.costcenter)
      .where('"status" =:status', { status: 'Active' })
      .andWhere('"companycode" =:code', { code: companycode })
      .orderBy('code', 'ASC')
      .getRawMany();

    // console.log('listData :: ', listData);
    return listData;
  }

  async getFlatCostCenterNameById(id: number): Promise<string> {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('"code","description"')
      .from(FlatTableList.costcenter, FlatTableList.costcenter)
      .where('id = :id', { id: id })
      .getRawOne();
    //console.log('List data :: ', id, listData.code);
    if (listData) {
      let dataString = `${listData.code} - ${listData.description}`;
      return await dataString;
    }
    return '';
  }

  async getFlatCostCenterIdByName(name: number): Promise<number> {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('id')
      .from(FlatTableList.costcenter, FlatTableList.costcenter)
      .where('code = :code', { code: name })
      .getRawOne();
    //console.log('List data :: ', name, listData.id);
    if (listData) return await Number(listData.id);

    return 0;
  }
  async getFlatCostCenterIdByNameandDescription(
    name: number,
    description: string,
  ): Promise<number> {
    console.log(description.trim(), 'trim');
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('id')
      .from(FlatTableList.costcenter, FlatTableList.costcenter)
      .where('code = :code', { code: name })
      .andWhere('description = :description', {
        description: description.trim(),
      })
      .getRawOne();
    //console.log('List data :: ', name, listData.id);
    if (listData) return await Number(listData.id);

    return 0;
  }
}
