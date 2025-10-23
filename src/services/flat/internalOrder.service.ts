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
export class InternalOrderService {
  constructor() // @InjectConnection('test-database')
  // private readonly flatRepo: FlatRepository,
  {}

  async getInternalOrdertList() {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(
        FlatTableList.internal_order_number,
        FlatTableList.internal_order_number,
      )
      .getRawMany();
    return listData;
  }

  async getInternalOrderNumberNameById(id: number): Promise<string> {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('"order_number","description"')
      .from(
        FlatTableList.internal_order_number,
        FlatTableList.internal_order_number,
      )
      .where('id = :id', { id: id })
      .getRawOne();

      if(listData){
        let dataString =`${listData.order_number} - ${listData.description}`
        return await dataString;
        }
   
    return await "";
  }

  async getInternalOrderNumberIdByName(name: number,description:string): Promise<number> {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('id')
      .from(
        FlatTableList.internal_order_number,
        FlatTableList.internal_order_number,
      )
      .where('order_number = :order_number', { order_number: name })
      .andWhere('description =:description',{description:description.trim()})
      .getRawOne();
    // console.log('List data :: ', name, listData.id);
    if(listData)
    return await listData.id;

    return 0;
  }
}
