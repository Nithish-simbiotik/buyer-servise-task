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
import { UserRoleRepository } from 'src/repos/comon-repos/user.role.repository';
@Injectable()
export class UserRolesService {
  constructor(private UserRoleRepo: UserRoleRepository) {} // private readonly flatRepo: FlatRepository, // @InjectConnection('test-database')

  async getUserRolesList(pagingDto: PagingDto) {
    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(FlatTableList.user_roles, FlatTableList.user_roles)
      .getRawMany();
    return listData;
  }

  async getUserRoleByDepartmentId(departmentId: number) {
    const departMent = await this.UserRoleRepo.find({
      department_id: departmentId,
    });
    const data = departMent.map((item) => {
      var obj = {
        user_role_id: item.id,
        user_role_name: item.user_role_name ? item.user_role_name : '',
        department_id: item.department_id,
      };
      return obj;
    });

    return data;
  }
}
