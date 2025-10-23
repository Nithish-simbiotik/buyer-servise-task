import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { PagingDto } from "src/dto/paging.dto";
import { PreprEntity } from "src/entities/prepr/prepr.entity";
import { RFSRepository } from "src/repos/rfs.repository";

@Injectable()
export class DeleteRFSService {
  constructor(
    private readonly rfsRepo: RFSRepository,
  ) { }

  async deleteRFS(id: number) {
    return await this.rfsRepo.deleteRFS(id);
  }

}