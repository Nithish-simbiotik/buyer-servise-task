import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { CreateRFSTemplateDto } from "src/dto/rfsTemplate/create-rfsTemplate.dto";
import { PagingDto } from "src/dto/paging.dto";
import { RFSRepository } from "src/repos/rfs.repository";
import { RFSTemplateRepository } from "src/repos/rfsTemplate.repository";
// import { FlatRepository } from "src/repos/flats/costCenter.repository";
import { getManager, getRepository, Repository } from "typeorm";
import { FlatTableList } from "src/enum/flat/flatTables.enum";
import { Environment } from "src/env/environment";
@Injectable()
export class WarrantyService {
  constructor(
    // @InjectConnection('test-database')
    // private readonly flatRepo: FlatRepository,
  ) { }


  async getWarrantyList(pagingDto: PagingDto) {
    const manager = getManager(Environment.postgres.flatdatabase)
    const listData = await manager
      .createQueryBuilder()
      .select("*")
      .from(FlatTableList.warranty, FlatTableList.warranty)
      .getRawMany();
    return listData;
  }

  async getWarrantyNameById(id:number):Promise<string>{
    const manager = getManager(Environment.postgres.flatdatabase)
    const listData = await manager
    .createQueryBuilder()
    .select("title")
    .from(FlatTableList.warranty,FlatTableList.warranty)
    .where('id = :id',{id:id})
    .getRawOne();
    // console.log("List data :: ",id,listData);
    return await listData.title;
  }

}