import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ExportDto } from 'src/dto/export.dto';
import { PagingDto } from 'src/dto/paging.dto';
import { PrTemplateEntity } from 'src/entities/prTemplates/prTemplates.entity';
import { PRTemplateRepository } from 'src/repos/pr_Repos/prTemplateNew.repository';

@Injectable()
export class GetPrTemplateService {
  constructor(private prTemplateRepo: PRTemplateRepository) {}

  /**========================================================================
   *                           GEt PR TEmplate By ID
   *========================================================================**/
  async getPrTemplateById(id: number) {
    try {
      return this.prTemplateRepo.findOneOrFail(id);
    } catch (error) {
      throw error;
    }
  }

  /**========================================================================
   *                           GEt PR TEmplate List / FILTER
   *========================================================================**/
  async listPrTemplate(res: Response, pagingDto: PagingDto) {
    try {
      let dateRegex =
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
      const keyword: string = pagingDto.keyword || '';
      const data = this.prTemplateRepo
        .createQueryBuilder('PRTEMPLATE')
        .leftJoinAndSelect('PRTEMPLATE.createdBy', 'creator')
        .leftJoinAndSelect('PRTEMPLATE.updatedBy', 'updator')
        .leftJoinAndSelect('PRTEMPLATE.department', 'dept')
        .leftJoinAndSelect('PRTEMPLATE.teamMembers', 'teamMembers')
        // .leftJoinAndSelect('PRTEMPLATE.purchasingOrg', 'purchasingOrg')
        .orderBy('PRTEMPLATE.createdAt', 'DESC')
        .where('PRTEMPLATE.templateName ILIKE :q', {
          q: `%${keyword}%`,
        })
        .orWhere('dept.department_name ILIKE :q', {
          q: `%${keyword}%`,
        })
        .orWhere('PRTEMPLATE.prType ILIKE :q', {
          q: `%${keyword}%`,
        })
        .orWhere('creator.name ILIKE :q', {
          q: `%${keyword}%`,
        })
        .orWhere('updator.name ILIKE :q', {
          q: `%${keyword}%`,
        })
        .orWhere('PRTEMPLATE.prStatus ILIKE :q', {
          q: `%${keyword}%`,
        });
      // .orWhere('PRTEMPLATE.createdAt  :q', {
      //   q: `%${keyword}%`,
      // })
      // .orWhere('PRTEMPLATE.updatedAt ILIKE :q', {
      //   q: `%${keyword}%`,
      // });

      //accept only 20/10/2022 this format date from frontend
      if (keyword.match(dateRegex)) {
        const date = keyword.split('/');
        const day = date[0];
        const month = date[1];
        const year = date[2];
        const newDate = `${year}-${month}-${day}`;
        const newDate1 = new Date(newDate);
        const newDate2 = new Date(newDate);
        newDate2.setDate(newDate2.getDate() + 1);
        data.orWhere('PRTEMPLATE.createdAt BETWEEN :date1 AND :date2', {
          date1: newDate1,
          date2: newDate2,
        });
        data.orWhere('PRTEMPLATE.updatedAt BETWEEN :date1 AND :date2', {
          date1: newDate1,
          date2: newDate2,
        });
      }

      const page: number = pagingDto.page || 1;
      const limit: number = pagingDto.size || 10;
      const total = await data.getCount();
      data.offset((page - 1) * limit).limit(limit);
      return res.send({
        data: await data.getMany(),
        total,
        page,
      });
    } catch (error) {
      return error;
    }
  }

  /**========================================================================
   *                           Export PR TEmplate LIST
   *========================================================================**/
  async exportPrTemplateList(
    exportDto: ExportDto,
  ): Promise<PrTemplateEntity[]> {
    try {
      const keyword: string = exportDto.keyword || '';
      const GetAllData = await this.prTemplateRepo
        .createQueryBuilder('PRTEMPLATE')
        .leftJoinAndSelect('PRTEMPLATE.teamMembers', 'teamMembers')
        .leftJoinAndSelect('PRTEMPLATE.department', 'dept')
        .leftJoinAndSelect('PRTEMPLATE.createdBy', 'creator')
        .leftJoinAndSelect('PRTEMPLATE.updatedBy', 'updator')
        .leftJoinAndSelect('PRTEMPLATE.approvalRoute', 'approvalRoute')
        .leftJoinAndSelect('approvalRoute.approvalLevels', 'approver')
        .leftJoinAndSelect(
          'PRTEMPLATE.ECAPEXApprovalRoute',
          'ECAPEXApprovalRoute',
        )
        .leftJoinAndSelect(
          'ECAPEXApprovalRoute.approvalLevelsECAPEX',
          'ECAPEXApprover',
        )
        .leftJoinAndSelect('PRTEMPLATE.templateUsers', 'templateUsers')
        // // .leftJoinAndSelect('PRTEMPLATE.purchasingOrg', 'purchasingOrg')
        // // .leftJoinAndSelect('PRTEMPLATE.deliveryAddress' , 'deliveryAddress')
        .orderBy('PRTEMPLATE.createdAt', 'DESC')
        .where('PRTEMPLATE.templateName ILIKE :q', {
          q: `%${keyword}%`,
        })
        .orWhere('dept.department_name ILIKE :q', {
          q: `%${keyword}%`,
        })
        .orWhere('PRTEMPLATE.prType ILIKE :q', {
          q: `%${keyword}%`,
        })
        .orWhere('creator.name ILIKE :q', {
          q: `%${keyword}%`,
        })
        .orWhere('updator.name ILIKE :q', {
          q: `%${keyword}%`,
        })
        .orWhere('PRTEMPLATE.prStatus ILIKE :q', {
          q: `%${keyword}%`,
        })
        .getMany();
      return GetAllData;
    } catch (error) {
      return error;
    }
  }

  /**========================================================================
   *                       GEt PR TEmplate Details By Id
   *========================================================================**/
  async getTemplateDetailsById(id: number) {
    try {
      return (
        this.prTemplateRepo
          .createQueryBuilder('PRTEMPLATE')
          .leftJoinAndSelect('PRTEMPLATE.department', 'dept')
          .leftJoinAndSelect('PRTEMPLATE.createdBy', 'creator')
          .leftJoinAndSelect('PRTEMPLATE.updatedBy', 'updator')
          .leftJoinAndSelect('PRTEMPLATE.teamMembers', 'teamMembers')
          .leftJoinAndSelect('PRTEMPLATE.approvalRoute', 'approvalRoute')
          .leftJoinAndSelect('approvalRoute.approvalLevels', 'approver')
          .leftJoinAndSelect('PRTEMPLATE.ECAPEXApprovalRoute', 'ECAPEXRoute')
          .leftJoinAndSelect(
            'ECAPEXApprovalRoute.approvalLevelsECAPEX',
            'ECAPEXapprover',
          )
          .leftJoinAndSelect(
            'PRTEMPLATE.ECAPEXApprovalRoute',
            'ECAPEXApprovalRoute',
          )
          .leftJoinAndSelect('PRTEMPLATE.templateUsers', 'templateUsers')
          // .leftJoinAndSelect('PRTEMPLATE.purchasingOrg', 'purchasingOrg')
          .where('PRTEMPLATE.id = :id', { id })
          .getOne()
      );
    } catch (error) {
      return error;
    }
  }
}
