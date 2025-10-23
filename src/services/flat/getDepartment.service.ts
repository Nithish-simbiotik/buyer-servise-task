import { Injectable } from '@nestjs/common';
import { PagingDto } from 'src/dto/paging.dto';
// import { CostCenterRepository } from "src/repos/flats/costCenter.repository";
import { getManager } from 'typeorm';
// import { DepartmentRepository } from "src/repos/flats/departments.repository";
import { Environment } from 'src/env/environment';
import { GetFlatPurchaseOrgService } from './getFlatPurchaseOrg.service';
import { DepartmentRepository } from 'src/repos/comon-repos/department.repository';
import { PurchaseOrgRepository } from 'src/repos/comon-repos/purchasingOrg.repository';
import { FlatTableList } from 'src/enum/flat/flatTables.enum';
@Injectable()
export class GetFlatDepartmentService {
  constructor(
    // @InjectConnection('test-database')
    private readonly departmentRepo: DepartmentRepository,
    private PurchaseOrgRepo: PurchaseOrgRepository,
    private getPurchaseOrgService: GetFlatPurchaseOrgService,
  ) {}

  async getFlatCostList(pagingDto: PagingDto) {
    const manager = getManager(Environment.postgres.userdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(FlatTableList.department, FlatTableList.department)
      .where('"status" =:status', { status: 'Active' })
      .getRawMany();
    return listData;
  }

  async getDepartmentById(id: number) {
    const manager = getManager(Environment.postgres.userdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(FlatTableList.department, FlatTableList.department)
      .where('"id" = :id', { id: id })
      .execute();
    const data = listData[0];
    return data;
  }

  async getDepartmentByPurchaseOrg(id: number) {
    const purchaseOrg = await this.getPurchaseOrgService.getFlatPurchaseOrgName(
      id,
    );
    // console.log(purchaseOrg,"org")

    const manager = getManager(Environment.postgres.userdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(FlatTableList.department, FlatTableList.department)
      .where('"purchasing_org" = :purchasing_org', {
        purchasing_org: purchaseOrg.trim(),
      })
      .andWhere('"status" =:status', { status: 'Active' })
      .execute();
    // const data = listData[0];
    return listData;
  }

  /**========================================================================
   *                           Get Purchasing Org By Department Id
   *========================================================================**/
  async getFlatPurchaseOrgNameByDepartmentId(id: number) {
    const Department = await this.departmentRepo.findOne({
      id: id,
    });
    const name = Department.purchasing_org;

    const manager = getManager(Environment.postgres.flatdatabase);
    const listData = await manager
      .createQueryBuilder()
      .select('*')
      .from(FlatTableList.purchase_org, FlatTableList.purchase_org)
      .where('"purchase_org_name" = :purchase_org_name', {
        purchase_org_name: name,
      })
      .execute();
    const data = listData[0];

    const obj = {
      department_id: id,
      departmentName: Department.department_name,
      purchase_org_id: data.id,
      purchasingOrgName: data.purchase_org_name,
      porgCode: data.porg_code,
    };
    return obj;
  }
}
