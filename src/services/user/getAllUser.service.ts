import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { CreateRFSTemplateDto } from "src/dto/rfsTemplate/create-rfsTemplate.dto";
import { PagingDto } from "src/dto/paging.dto";
import { RFSRepository } from "src/repos/rfs.repository";
import { RFSTemplateRepository } from "src/repos/rfsTemplate.repository";
// import { FlatRepository } from "src/repos/flats/costCenter.repository";
import { getManager, getRepository, Repository } from "typeorm";
import { FlatTableList } from "src/enum/flat/flatTables.enum";
import { Environment } from "src/env/environment";
import { UserTableList } from "src/enum/user/userTables.enum";
import { list } from "pdfkit";

@Injectable()
export class GetAllUsers {
  

  async getAllUsers() {
    const manager = getManager(Environment.postgres.userdatabase)
    const listData = await manager
      .createQueryBuilder()
      .select("*")
      .from(UserTableList.user, UserTableList.user)
      .where('"status" =:status',{status:"Active"})
      .getRawMany();
    // console.log("listData :: ", listData);
    return listData;
  }

  
  async getUserNameById(id:any) {
    const manager = getManager(Environment.postgres.userdatabase)
    const listData = await manager
      .createQueryBuilder()
      .select("name")
      .from(UserTableList.user, UserTableList.user)
      .where('"id" =:id',{id:id})
      .getRawOne();
    // console.log("username:: ", listData);
    if(listData)
       return listData.name;
    return "";
  } 

  async getUserIdByName(name:any) {
    const manager = getManager(Environment.postgres.userdatabase)
    const listData = await manager
      .createQueryBuilder()
      .select("id")
      .from(UserTableList.user, UserTableList.user)
      .where('"name" =:id',{id:name})
      .getRawOne();
    console.log("username:: ", listData);
    if(listData)
       return listData.id;
    return "";
  } 

  async getUserNameByRoleandDepatmentId(id:any,userRole:string) {
    const manager = getManager(Environment.postgres.userdatabase)
    const listData = await manager
      .createQueryBuilder()
      .select("name")
      .from(UserTableList.user, UserTableList.user)
      .where('"department_id" =:department_id',{department_id:id})
      .andWhere('"user_role_name" =:user_role_name',{user_role_name:userRole})
      .getRawOne();
    if(listData)
    return listData.name;

    return "";
  }

  async getUserIdByRoleandDepatmentId(id:any,userRole:string) {
    const manager = getManager(Environment.postgres.userdatabase)
    const listData = await manager
      .createQueryBuilder()
      .select("id")
      .from(UserTableList.user, UserTableList.user)
      .where('"department_id" =:department_id',{department_id:id})
      .andWhere('"user_role_name" =:user_role_name',{user_role_name:userRole})
      .getRawOne();
    console.log("name:: ", listData,id,userRole);
    if(listData)
       return listData.id;
    return 0;   
  }

  async getUserEmailByRoleandDepatmentId(id:any,userRole:string) {
    const manager = getManager(Environment.postgres.userdatabase)
    const listData = await manager
      .createQueryBuilder()
      .select("email_address")
      .from(UserTableList.user, UserTableList.user)
      .where('"department_id" =:department_id',{department_id:id})
      .andWhere('"user_role_name" =:user_role_name',{user_role_name:userRole})
      .getRawOne();
    console.log("email:: ", listData);
    if(listData)
    return listData.email_address;

    return "" ;
  }

  async getUserIDbyPrimaryId(id:number):Promise<String> {
    const manager = getManager(Environment.postgres.userdatabase)
    const listData = await manager
      .createQueryBuilder()
      .select("user_id")
      .from(UserTableList.user, UserTableList.user)
      .where('"id" =:id',{id:id})
      .getRawOne();
     
    if(listData){
    // console.log(listData);
     return listData.user_id;
    }
     return "";
  }

  async getPrimaryIdBUserId(user_id:string):Promise<String> {
    const manager = getManager(Environment.postgres.userdatabase)
    const listData = await manager
      .createQueryBuilder()
      .select("id")
      .from(UserTableList.user, UserTableList.user)
      .where('"user_id" =:user_id',{user_id:user_id.trim()})
      .getRawOne();
     
    if(listData){
    console.log(listData);
     return listData.id;
    }
     return "";
  }

  async getDepatmentIdByUserId(id:any) {
    const manager = getManager(Environment.postgres.userdatabase)
    const listData = await manager
      .createQueryBuilder()
      .select("department_id")
      .from(UserTableList.user, UserTableList.user)
      .where('"id" =:id',{id:Number(id)})
     
      .getRawOne();
    console.log("deptId:: ", listData);
    if(listData)
    return listData.department_id;

    return "" ;
  }

  async getUserPurchaseOrg(id:number):Promise<any> {
    const manager = getManager(Environment.postgres.userdatabase)
    const listData = await manager
      .createQueryBuilder()
      .select('"purchasingOrgId"')
      .from(UserTableList.userPurchaseOrg, UserTableList.userPurchaseOrg)
      .where('"userId" =:id',{id:id})
      .execute()
    // console.log("deptId:: ", listData);
    if(listData){
    console.log(listData.purchasingOrgId,"dataa")
   const list= listData.map(listData=>{
     return listData.purchasingOrgId
    })
    console.log(listData,"dataa")
    return list
    }

    return "" ;
  }



}