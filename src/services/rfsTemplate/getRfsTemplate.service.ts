import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PagingDto } from 'src/dto/paging.dto';
import { PreprTeamMemberEntity } from 'src/entities/prepr/prepr_TeamMember.entity';
import { Environment } from 'src/env/environment';
import { RFSTemplateRepository } from 'src/repos/rfsTemplate.repository';
import { getConnection, getManager, SelectQueryBuilder } from 'typeorm';
import { GetAllUsers } from '../user/getAllUser.service';
import { GetDepartmentService } from '../user/getDepartment.service';
@Injectable()
export class GetRFSTemplateService {
  constructor(
    private readonly rfsTemplateRepo: RFSTemplateRepository,
    private getUserName: GetAllUsers,
    private getDepartmentService : GetDepartmentService,

  ) {}

  async getRFSTemplateList(res: Response, pagingDto: PagingDto) {
    let keyword: string = pagingDto.keyword || '';
   let data = this.rfsTemplateRepo
      .createQueryBuilder('PREPRTEMPLATE')
      .orderBy('PREPRTEMPLATE.created_At', 'DESC')
      .where('PREPRTEMPLATE.templateName ILIKE :q', {
        q: `%$ {keyword}%`,
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
    return res.send({
      data: await data.getMany(),
      total,
      page,
    });
  }

  async getRFSTemplateById(id: number) {
    let data: any = await this.rfsTemplateRepo.findOne(
      { id: id },
      {
        relations: ['teamMembers', 'levels'],
      },
    );
    if (data) {
      // const manager = getManager(Environment.postgres.userdatabase);
      const manager = getConnection()
      const listData = await manager
        .createQueryBuilder()
        .select('*')
        .from('USER_PRE_PR', 'USER_PRE_PR')
        .where('"PRE_PR_TEMPLATE_ID" = :PRE_PR_TEMPLATE_ID', {
          PRE_PR_TEMPLATE_ID: data.id,
        })
        .getRawMany();
      // return listData;
      // console.log(listData, 'user data');
      if(data.departmentId)
         data.departmentName =await this.getDepartmentService.getDepartmentNameById(data.departmentId)
      data.templateUser = listData;
      if(data.teamMembers){
      for (let i = 0; i < data.teamMembers.length; i++) {
        data.teamMembers[i].userName = await this.getUserName.getUserNameById(
          data.teamMembers[i].userId,
        );
      }
    }
      if(data.templateUser){
      for (let i = 0; i < data.templateUser.length; i++) {
        data.templateUser[i].name = await this.getUserName.getUserNameById(
          data.templateUser[i].userId,
        );
      }
    }
    }
    return data;
  }
}
