import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { CreateRFSTemplateDto } from "src/dto/rfsTemplate/create-rfsTemplate.dto";
import { PagingDto } from "src/dto/paging.dto";
import { RFSRepository } from "src/repos/rfs.repository";
import { RFSTemplateRepository } from "src/repos/rfsTemplate.repository";
import { JwtPayload } from "src/interface/user/jwt.payload.interface";
import { GetDepartmentService } from "../user/getDepartment.service";

@Injectable()
export class CopyRFSTemplateService {
  constructor(
    private readonly rfsTemplateRepo: RFSTemplateRepository,
    private getDepartmentService:GetDepartmentService
  ) { }

  async copyRFSTemplate(id:number,user:JwtPayload) {
    return await this.rfsTemplateRepo.copyRFSTemplate(id,user,this.getDepartmentService);
  }
}