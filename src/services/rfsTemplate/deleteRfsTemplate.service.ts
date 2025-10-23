import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { CreateRFSTemplateDto } from "src/dto/rfsTemplate/create-rfsTemplate.dto";
import { PagingDto } from "src/dto/paging.dto";
import { RFSRepository } from "src/repos/rfs.repository";
import { RFSTemplateRepository } from "src/repos/rfsTemplate.repository";

@Injectable()
export class DeleteRFSTemplateService {
  constructor(
    private readonly rfsTemplateRepo: RFSTemplateRepository,
  ) { }

  async deleteRFSTemplate(id: number) {
    return await this.rfsTemplateRepo.deleteRFSTemplate(id);
  }
}