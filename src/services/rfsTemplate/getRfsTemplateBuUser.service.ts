import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { CreateRFSTemplateDto } from "src/dto/rfsTemplate/create-rfsTemplate.dto";
import { PagingDto } from "src/dto/paging.dto";
import { RFSRepository } from "src/repos/rfs.repository";
import { RFSTemplateRepository } from "src/repos/rfsTemplate.repository";
import { getConnection, getManager } from "typeorm";
import { Environment } from "src/env/environment";
import { UserTableList } from "src/enum/user/userTables.enum";
import { RFSTemplateEntity } from "src/entities/preprTemplate/preprTemplate.entity";
import { Response } from 'express';
import { GetDepartmentService } from "../user/getDepartment.service";
@Injectable()
export class GetRFSByUserTemplateService {
  constructor(
    private readonly rfsTemplateRepo: RFSTemplateRepository,
    private getDepartmentService: GetDepartmentService,
  ) { }

  async getRFSTemplateListByUser(res: Response, pagingDto: PagingDto) {

    let keyword: string = pagingDto.keyword || '';
    let data = this.rfsTemplateRepo
      .createQueryBuilder('PREPRTEMPLATE')
      .orderBy('PREPRTEMPLATE.created_At', 'DESC')
      .where('PREPRTEMPLATE.templateName ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PREPRTEMPLATE.createdBy ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PREPRTEMPLATE.updatedBy ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PREPRTEMPLATE.departmentName ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PREPRTEMPLATE.status ILIKE :q', {
        q: `%${keyword}%`,
      });
    let page: number = pagingDto.page || 1;
    let limit: number = pagingDto.size || 10;
    let total = await data.getCount();
    data.offset((page - 1) * limit).limit(limit);
    let rd: any = await data.getMany();
    for (var i = 0; i < rd.length; i++)
      if (rd[i].departmentId)
        rd[i].departmentName = await this.getDepartmentService.getDepartmentNameById(rd[i].departmentId);
    return res.send({
      data: rd,
      total,
      page,
    });
  }

  async getPreprTemplateByUserId(userId: number) {
    console.log()
    // const manager = getManager(Environment.postgres.userdatabase)
    const manager = getConnection()
    const listData = await manager
      .createQueryBuilder()
      .select('"PRE_PR_TEMPLATE_ID"')
      .from(UserTableList.user_pre_pr, UserTableList.user_pre_pr)
      .where(' "userId" = :dId', { dId: userId })
      .getRawMany();
    // console.log("listData :: ", listData);
    if(listData.length==0){
      return [];
    }
    let pList = [];
    await listData.forEach((element) => {
      pList.push(element.PRE_PR_TEMPLATE_ID)
    })

    let listDataP = await this.rfsTemplateRepo.createQueryBuilder("PREPRTEMPLATE")
      .select('id,"templateName","created_At"')
      .where(' "status" = :status', { status: "Active" })
      .andWhere("id IN (:...plist)")
      .setParameter('plist', pList)
      .orderBy('"created_At"', "ASC")
      .getRawMany();
    // console.log("listData :: ", listDataP);

    return listDataP;
  }

}