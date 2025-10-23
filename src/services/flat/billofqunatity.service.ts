import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { CreateRFSTemplateDto } from "src/dto/rfsTemplate/create-rfsTemplate.dto";
import { PagingDto } from "src/dto/paging.dto";
import { RFSRepository } from "src/repos/rfs.repository";
import { RFSTemplateRepository } from "src/repos/rfsTemplate.repository";
// import { FlatRepository } from "src/repos/flats/costCenter.repository";
import { getManager, getRepository, Repository } from "typeorm";
// import { TestEntity } from "src/entities/flat/costCeter.entity";
// import { AddressEntity } from "src/entities/flat/address.entity";
import { FlatTableList } from "src/enum/flat/flatTables.enum";
import { Environment } from "src/env/environment";

@Injectable()
export class BillOfQuantity {
  constructor(
    // @InjectConnection('test-database')
    // private readonly flatRepo: FlatRepository,
  ) { } 

 
  async getAddressList(pagingDto: PagingDto) {
    const manager = getManager(Environment.postgres.flatdatabase)
    const listData = await manager
    .createQueryBuilder()
    .select("*")
    .from(FlatTableList.address,FlatTableList.address)
    .getRawMany();
    return listData;
  }

  

}