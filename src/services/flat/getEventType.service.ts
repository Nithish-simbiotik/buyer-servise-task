import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { FlatTableList } from 'src/enum/flat/flatTables.enum';
import { Environment } from 'src/env/environment';

@Injectable()
export class EventTypeService {
  constructor() // private readonly flatRepo: FlatRepository, // @InjectConnection('test-database')
  {}
  async getEventTypeList() {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(FlatTableList.event_type, FlatTableList.event_type)
      .where('"status" =:status', { status: 'Active' })
      .getRawMany();
    return listData;
  }
}
