import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { CreateRFSTemplateDto } from "src/dto/rfsTemplate/create-rfsTemplate.dto";
import { PagingDto } from "src/dto/paging.dto";
import { RFSRepository } from "src/repos/rfs.repository";
import { RFSTemplateRepository } from "src/repos/rfsTemplate.repository";
// import { CostCenterRepository } from "src/repos/flats/costCenter.repository";
import { getManager, getRepository, Repository } from "typeorm";
// import { CurrencyRepository } from "src/repos/flats/currency.repository";
import { FlatTableList } from "src/enum/flat/flatTables.enum";
import { Environment } from "src/env/environment";
@Injectable()
export class GetFlatCurrencyService {
  constructor(
    // @InjectConnection('test-database')
    // private readonly flatRepo: CurrencyRepository,
  ) { }


  async getFlatCostList() {
    const manager = getManager(Environment.postgres.flatdatabase)
    const listData = await manager
      .createQueryBuilder()
      .select("*")
      .from(FlatTableList.currency, FlatTableList.currency)
      .getRawMany();
    return listData;
  }

  async getFlatCurrenyNameById(id:number):Promise<string>{
    const manager = getManager(Environment.postgres.flatdatabase)
    const listData = await manager
    .createQueryBuilder()
    .select("currency_name")
    .from(FlatTableList.currency,FlatTableList.currency)
    .where('curr_id = :id',{id:id})
    .getRawOne();
    // console.log("List data :: ",id,listData.currency_name);
    if(listData)
    return await listData.currency_name;

    return "";
  }

  async getFlatCurrenyIdByName(name:string):Promise<number>{
    const manager = getManager(Environment.postgres.flatdatabase)
    const listData = await manager
    .createQueryBuilder()
    .select("curr_id")
    .from(FlatTableList.currency,FlatTableList.currency)
    .where('currency_name = :id',{id:name})
    .getRawOne();
    console.log("List data :: ",name,listData);
    if(listData)
    return await Number(listData.curr_id);
    return 0;
  }

}