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
export class UOMService {
  constructor() // @InjectConnection('test-database')
  // private readonly flatRepo: FlatRepository,
  {}

  async getUOMList() {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(FlatTableList.uom, FlatTableList.uom)
      .getRawMany();
    return listData;
  }

  async getUOMNameById(id: number): Promise<string> {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('"name","description"')
      .from(FlatTableList.uom, FlatTableList.uom)
      .where('id = :id', { id: id })
      .getRawOne();
    // console.log('UOM data :: ', id, listData.name);
    if(listData){
      let uomid = `${listData.name} - ${listData.description}`
      return  await uomid;
    }
    return "";
   
  }

  async getUOMIdByName(name: string,description:string): Promise<number> {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('id')
      .from(FlatTableList.uom, FlatTableList.uom)
      .where('name = :name', { name: name.trim() })
      .andWhere('"description" =:description',{description:description.trim()})
      .getRawOne();
    // console.log("List data :: ",name,listData.id);
    if(listData)
    return await Number(listData.id);
    else
    return 0 ;
  }
}
