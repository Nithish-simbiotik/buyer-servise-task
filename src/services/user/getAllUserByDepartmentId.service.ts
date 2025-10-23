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
import { UserTableList } from 'src/enum/user/userTables.enum';

@Injectable()
export class GetAllUsersByDepartmentId {
  async getAllUsersByDepartmentId(departmentId: number) {
    console.log('departmentId ', departmentId);
    const manager = getManager(Environment.postgres.userdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(UserTableList.user, UserTableList.user)
      .where(' department_id = :dId', { dId: departmentId })
      .andWhere('status = :status', { status: 'Active' })
      .getRawMany();
    console.log('listData :: ', listData);
    return listData;
  }
}
