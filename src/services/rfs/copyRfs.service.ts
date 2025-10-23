import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { CreateRFSTemplateDto } from "src/dto/rfsTemplate/create-rfsTemplate.dto";
import { PagingDto } from "src/dto/paging.dto";
import { RFSRepository } from "src/repos/rfs.repository";
import { JwtPayload } from "src/interface/user/jwt.payload.interface";
import { ExportDto } from "src/dto/export.dto";
import { Response } from 'express';
import { SubmitType } from "src/enum/rfs/submitType.enum";
import { PreprEntity } from "src/entities/prepr/prepr.entity";
@Injectable()
export class CopyRFSService {
  constructor(
    private readonly rfsRepo: RFSRepository,
  ) { }

  async copyRFS(id:number,user:JwtPayload) {
    return await this.rfsRepo.copyRFS(id,user);
  }  
  
  async getCopyRfsList(res: Response,pagingDto: PagingDto){
    let keyword: string = pagingDto.keyword || '';
    // let newData;
    let data:any = this.rfsRepo
      .createQueryBuilder('PRE_PR_LIST')
      // .orderBy('PRE_PR_LIST.created_At', 'DESC') 
      // .where('PRE_PR_LIST.submitStatus =:q', {
      //   q: SubmitType.APPROVED,
      // })
      .where(' cast(PRE_PR_LIST.id as text) ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PRE_PR_LIST.title ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PRE_PR_LIST.purchasingOrgName ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PRE_PR_LIST.internalReferenceNumber ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('PRE_PR_LIST.created_by ILIKE :q', {
        q: `%${keyword}%`,
      })
      // .where('PRE_PR_LIST.submitStatus =:q', {
      //   q: SubmitType.APPROVED,
      // })
      // .andWhere('PRE_PR_LIST.id >0')
      // .orWhere('PRE_PR_LEVELS.levelName ILIKE :q', { q: `%${keyword}%` })

      
    let page: number = pagingDto.page || 1;
    let limit: number = pagingDto.size || 10;
    // let total = await data.getCount();
    const newData:any=[];
    // data.offset((page - 1) * limit).limit(limit);
   const  data1:any= await data.getMany();
  //  console.log(data1,"datttt")
    for await(let el of data1){
      console.log(el.submitStatus,"stats")
      if(el.submitStatus===SubmitType.FINISHED){
      console.log(el,"approve data")
      newData.push(el);
      }
      }
      let newDt;
      let total = await newData.length;
      if(page*limit<=total)
      newDt =newData.slice((page-1)*limit,page*limit)
      else
      newDt=newData.slice((page-1)*limit,total)
  //  
  
   
    return res.send({
      data: newDt,
      total,
      page,
    });
  }
  }

  

  