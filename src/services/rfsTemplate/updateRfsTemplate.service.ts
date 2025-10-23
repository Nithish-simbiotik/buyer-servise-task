import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRFSDto } from 'src/dto/rfs/create-rfs.dto';
import { CreateRFSTemplateDto } from 'src/dto/rfsTemplate/create-rfsTemplate.dto';
import { PagingDto } from 'src/dto/paging.dto';
import { RFSRepository } from 'src/repos/rfs.repository';
import { RFSTemplateRepository } from 'src/repos/rfsTemplate.repository';
import { Environment } from 'src/env/environment';
import { getConnection, getManager } from 'typeorm';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { GetDepartmentService } from '../user/getDepartment.service';

@Injectable()
export class UpdateRFSTemplateService {
  constructor(
    private readonly rfsTemplateRepo: RFSTemplateRepository,
    private getDepartmentService: GetDepartmentService,
  ) {}

  async updateRFSTemplate(
    id: number,
    user: JwtPayload,
    createRFSTemplateDto: CreateRFSTemplateDto,
  ) {
    // console.log(createRFSTemplateDto);

    let data = await this.rfsTemplateRepo.updateRFSTemplate(
      id,
      user,
      createRFSTemplateDto,
      this.getDepartmentService,
    );
    if (data) {
      // const manager = getManager(Environment.postgres.userdatabase);
      const manager = getConnection()
      const listData = await manager
        .createQueryBuilder()
        .delete()
        .from('USER_PRE_PR', 'USER_PRE_PR')
        .where('"PRE_PR_TEMPLATE_ID" = :PRE_PR_TEMPLATE_ID', {
          PRE_PR_TEMPLATE_ID: data.id,
        })
        .execute();
      // console.log(listData);
      data = await this.rfsTemplateRepo.findOne({ id: id });
      console.log('data', data.id, user.userId, data.templateName);
      // console.log(createRFSTemplateDto.templateUser);
      for await (const u of createRFSTemplateDto.templateUser) {
        console.log(user.userId, 'user');
        // const manager = getManager(Environment.postgres.userdatabase);
        const manager = getConnection()
        const listData = await manager
          .createQueryBuilder()
          .insert()
          .into('USER_PRE_PR')
          .values({
            PRE_PR_template_name: data.templateName,
            userId: u.userId,
            PRE_PR_TEMPLATE_ID: data.id,
          })
          .execute();
      }
      // const manager1 = getManager(Environment.postgres.userdatabase)
      // const listData1 = await manager
      // .createQueryBuilder()
      // .insert()
      // .into("USER_PRE_PR")
      // .values(
      //     { PRE_PR_template_name:data.templateName , userId:user.userId,PRE_PR_TEMPLATE_ID:data.id  },
      //  )
      // .execute();
    }
    return data;
  }
}
