import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { CreateRFSDto } from 'src/dto/rfs/create-rfs.dto';
import { CreateRFSTemplateDto } from 'src/dto/rfsTemplate/create-rfsTemplate.dto';
import { PagingDto } from 'src/dto/paging.dto';
import { RFSRepository } from 'src/repos/rfs.repository';
import { RFSTemplateRepository } from 'src/repos/rfsTemplate.repository';
// import { FlatRepository } from "src/repos/flats/costCenter.repository";
import { getManager, getRepository, Repository } from 'typeorm';
// import { TestEntity } from "src/entities/flat/costCeter.entity";
// import { AddressEntity } from "src/entities/flat/address.entity";
import { FlatTableList } from 'src/enum/flat/flatTables.enum';
import { Environment } from 'src/env/environment';

@Injectable()
export class PartNumberService {
  constructor() // @InjectConnection('test-database')
  // private readonly flatRepo: FlatRepository,
  {}

  async getPartNumberList() {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(FlatTableList.partNumber, FlatTableList.partNumber)
      .getRawMany();
    return listData;
  }

  async getPartNumberNameById(id: number): Promise<string> {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('"material_number","pir_number"')
      .from(FlatTableList.partNumber, FlatTableList.partNumber)
      .where('id = :id', { id: id })
      .getRawOne();
    // console.log('PartNumber data :: ', id, listData.material_number);
    if(listData){
    let partString = `${listData.pir_number} - ${listData.material_number}`
    return await partString;
    }
    return "";
  }

  async getPartNumberIdByName(pirnumber:number,name: string): Promise<number> {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('id')
      .from(FlatTableList.partNumber, FlatTableList.partNumber)
      .where('material_number = :material_number', {
        material_number: name.trim(),
      })
      .andWhere('pir_number =:pir_number',{pir_number:pirnumber})
      .getRawOne();
    // console.log("material number :: ",name,listData.id);
    if(listData)
    
    return await Number(listData.id);

    return 0;
  }
}
