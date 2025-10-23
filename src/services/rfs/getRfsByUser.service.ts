import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { PagingDto, SearchDto } from "src/dto/paging.dto";
import { PreprEntity } from "src/entities/prepr/prepr.entity";
import { RFSRepository } from "src/repos/rfs.repository";
import { Response } from 'express';
import { GetFlatPurchaseOrgService } from "../flat/getFlatPurchaseOrg.service";
import { StatusType } from "src/enum/rfs/submitType.enum";
// import 

@Injectable()
export class GetRFSByUserService {
  constructor(
    private readonly rfsRepo: RFSRepository,
    private getPurchaseOrg:GetFlatPurchaseOrgService
  ) { }

  // async getRFSListByUser(pagingDto: PagingDto) {
  //   let total = await (await this.rfsRepo.find()).length;
  //   return {data:await this.rfsRepo.find({
  //     skip: (pagingDto.page-1)*(pagingDto.size), take: pagingDto.size,
  //     relations: ['recommandedSuppliers','supportingDocuments','teamMembers','boq','history','notifications','levels']
  //   }),total:total};
  // }


  async getRFSListByUser(res: Response, pagingDto: PagingDto,user) {
    let keyword: string = pagingDto.keyword || '';
    let data = this.rfsRepo
      .createQueryBuilder('PRE_PR_LIST')
      .orderBy('PRE_PR_LIST.created_At', 'DESC')
      // .leftJoinAndSelect('PRE_PR_LIST.levels', 'PRE_PR_LEVELS')
      // .leftJoinAndSelect(
      //   'PRE_PR_LIST.recommandedSuppliers',
      //   'PRE_PR_RECOMMANDED_SUPPLIERS',
      // )
      // .leftJoinAndSelect('PRE_PR_LIST.supportingDocuments', 'PRE_PR_DOCUMENTS')
      .where('PRE_PR_LIST.userId = :userId ',{ userId:user.userId})
      .where('PRE_PR_LIST.templateName ILIKE :q', { q: `%${keyword}%` })
     
      // .andWhere('PRE_PR_LIST.submitStatus = :q', {
      //   q:status,
      // })
      .orWhere('cast(PRE_PR_LIST.id as text) ILIKE :q', {
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
      .orWhere('PRE_PR_LIST.urgentJobOption ILIKE :q', {
        q: `%${keyword}%`,
      })
      // .orWhere('PRE_PR_LEVELS.levelName ILIKE :q', { q: `%${keyword}%` })
    let page: number = pagingDto.page || 1;
    let limit: number = pagingDto.size || 10;
    let total = await data.getCount();
    data.offset((page - 1) * limit).limit(limit);
   const  data1:any= await data.getMany();
    // for(let i=0;i<data1.length;i++){
    //   // console.log(data1[i],"data")
    //   if(data1[i].purchasingOrg)
    //   data1[i].purchasingOrg =await this.getPurchaseOrg.getFlatPurchaseOrgNameById(data1[i].purchasingOrg)
    // }
    return res.send({
      data: data1,
      total,
      page,
    });
  }

  async getRFSListByUser2(res: Response, pagingDto: SearchDto,user) {
    // console.log(status,typeof status,"StatusType")
    let keyword: string = pagingDto.keyword || '';
    let status: string = pagingDto.status || '';
    let statusList;
    if(status){
      statusList = status.split(",")
      console.log
    }
    let data = this.rfsRepo
      .createQueryBuilder('PRE_PR_LIST')
      .orderBy('PRE_PR_LIST.created_At', 'DESC')
      .leftJoinAndSelect('PRE_PR_LIST.teamMembers', 'PREPR_TEAM_MEMBERS')
      .leftJoinAndSelect(
        'PRE_PR_LIST.levels',
        'PREPR_LEVEL',
      )
      // .leftJoinAndSelect('PRE_PR_LIST.supportingDocuments', 'PRE_PR_DOCUMENTS')
      .where('PRE_PR_LIST.userId = :userId ',{ userId:user.userId})
      .where('PRE_PR_LIST.templateName ILIKE :q', { q: `%${keyword}%` })
     
      // .andWhere('PRE_PR_LIST.submitStatus = :q', {
      //   q:status,
      // })
      .orWhere('cast(PRE_PR_LIST.id as text) ILIKE :q', {
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
      .orWhere('PRE_PR_LIST.urgentJobOption ILIKE :q', {
        q: `%${keyword}%`,
      })
      // .orWhere('PRE_PR_LEVELS.levelName ILIKE :q', { q: `%${keyword}%` })
    let page: number = pagingDto.page || 1;
    let limit: number = pagingDto.size || 10;
    // let total = await data.getCount();
    const newData:any=[];
    // data.offset((page - 1) * limit).limit(limit);
   const  data1:any= await data.getMany();
      
    for await(let el of data1){
      let teamMembers = el.teamMembers.find(tm =>tm.userId==user.userId)
      let levels = el.levels.find(tm =>tm.userId==user.userId)
        console.log(teamMembers,"team members")
        if((statusList && status=="all") || status ==""){
          if(el.userId==user.userId || teamMembers!=undefined || levels!=undefined){
            newData.push(el);
          }
        }
      else if(statusList){
        if(statusList.includes(el.submitStatus)  && (el.userId==user.userId || teamMembers!=undefined || levels!=undefined)){
          newData.push(el);
        }
      } 
    }
      // console.log(el,"teamM")
      // let teamMembers = el.teamMembers.find(tm =>tm.userId==user.userId)
      // console.log(teamMembers,"team members")
      // if(statusList&& statusList.includes(el.submitStatus)){
      // console.log(el,"approve data")
      // newData.push(el);
      // }else if(status=="all" || status ==""){
      //  newData.push(el)
      // }
    // }
      let newDt;
      let total = await newData.length;
      if(page*limit<=total)
      newDt =newData.slice((page-1)*limit,page*limit)
      else
      newDt=newData.slice((page-1)*limit,total)

    return res.send({
      data: newDt,
      total,
      page,
    });
  }


}