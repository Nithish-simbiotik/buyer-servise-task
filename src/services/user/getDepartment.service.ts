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
export class GetDepartmentService {
  static getDepartmentNameById(
    departmentId: any,
  ):
    | import('../../entities/comon/department.entity').DepartmentEntity
    | PromiseLike<
        import('../../entities/comon/department.entity').DepartmentEntity
      > {
    throw new Error('Method not implemented.');
  }

  async getDepartmentNameById(id: number): Promise<string> {
    const manager = getManager(Environment.postgres.userdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('department_name')
      .from(UserTableList.department, UserTableList.department)
      .where('id = :id', { id: id })
      .getRawOne();
    console.log('DNAME :: ', listData.department_name);
    return await listData.department_name;
  }

  async getDepartmentIdByName(name: string): Promise<number> {
    const manager = getManager(Environment.postgres.userdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('id')
      .from(UserTableList.department, UserTableList.department)
      .where('department_name = :id', { id: name })
      .getRawOne();
    if (listData) return await listData.id;
    return 0;
  }
  async getDepartmentIdByEmail(id: number): Promise<number> {
    const manager = getManager(Environment.postgres.userdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('department_id,department_name')
      .from(UserTableList.user, UserTableList.user)
      .where('id = :id', { id: id })
      .getRawOne();
    if (listData) return await listData;
    return 0;
  }
}
