import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { FlatTableList } from 'src/enum/flat/flatTables.enum';
import { Environment } from 'src/env/environment';

@Injectable()
export class DecimalService {
    constructor() // @InjectConnection('test-database')
    // private readonly flatRepo: FlatRepository,
    { }
    async getDecimalList() {
        const manager = getManager(Environment.postgres.flatdatabase);
        const listData = await manager
            .createQueryBuilder()
            .select('*')
            .from(FlatTableList.decimal, FlatTableList.decimal)
            .getRawMany();
        return listData;
    }
}