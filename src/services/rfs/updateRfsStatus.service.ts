import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { PagingDto } from "src/dto/paging.dto";
import { PreprEntity } from "src/entities/prepr/prepr.entity";
import { RFSRepository } from "src/repos/rfs.repository";
import { JwtPayload } from "src/interface/user/jwt.payload.interface";
import { StatusType, SubmitType } from "src/enum/rfs/submitType.enum";
import { MailService } from "../mail/mailservice.service";
import { GetAllUsers } from "../user/getAllUser.service";
import { RFSService } from "./rfs.service";
import { GetRFSService } from "./getRfs.service";
import { PrePrLevelsEntity } from "src/entities/prepr/prepr_Level.entity";
import { getRepository } from "typeorm";
import { PreprNotificationsEntity } from "src/entities/prepr/prepr_notifications.entity";
import { Response } from "express";
import { PreprHistoryEntity } from "src/entities/prepr/prepr_history.entity";
import { PreprNotificationsHistoryEntity } from "src/entities/prepr/prepr_notificationsHistory";


@Injectable()
export class UpdateRFS_StatusService {
  constructor(
    private readonly rfsRepo: RFSRepository,
    private mailService:MailService,
    private getUserService:GetAllUsers,
    private getRfsService:GetRFSService
  ) { }


  async updateRFS_Status(prepr_id:number,status:SubmitType,user :JwtPayload)
  {
    let rfsData = await this.rfsRepo.updateStatus(prepr_id,status);

    await getRepository(PrePrLevelsEntity)
                .createQueryBuilder()
                .update()
                .set({ activeLevel: 1 })
                .where('"preprId" = :id', { id: prepr_id })
                .execute();
                
                await getRepository(PreprNotificationsEntity)
                .createQueryBuilder()
                .update()
                .set({ status: SubmitType.PENDING })
                .where('"preprId" = :id', { id: prepr_id })
                .andWhere('"level" = :level', { level: 1 })
                .execute();

              

                
              
      let history = new PreprHistoryEntity();
      history.action = "Submitted For Approval"
      history.actionBy = user.userName;
      history.remarks = 'Updated';
      history.preprId = prepr_id;
      await getRepository(PreprHistoryEntity).save(history);
    
  // if(rfsData.submitStatus==SubmitType.SUBMITED && rfsData.notifyMe){
    
  //   // this.mailService.send(rfsData.requestor_email,"Pre Pr Sumbitted",`Prepr form ${rfsData.title} is Submitted`,"FORM SUBMITTED")
  //   // this.mailService.sendMail("sarthakahuja3637@gmail.com","Pre Pr Sumbitted",`Prepr form ${rfsData.title} is Submitted`,"FORM SUBMITTED")
  // }
  if(rfsData.submitStatus==SubmitType.SUBMITED){
    let userRole;
    let departmentId;
   const rfsById= await this.getRfsService.getRFSById(rfsData.id)
    // console.log(rfsById.levels,"levevl")
      for(let i =0;i<rfsById.levels.length;i++){
        if(rfsById.levels[i].level==1){
          userRole=rfsById.levels[i].userRole
          departmentId=rfsById.levels[i].departmentId
        }
      }
    let userEmail = await this.getUserService.getUserEmailByRoleandDepatmentId(departmentId,userRole) 
    let approverName = await this.getUserService.getUserNameByRoleandDepatmentId(departmentId,userRole) 
    console.log(userEmail,"Email")
    this.mailService.sendMailApprovalRequest(userEmail,`T-Procure: Pre-PR Approval Request (${rfsData.internalReferenceNumber})`,approverName,rfsData.id,rfsById.internalReferenceNumber,rfsById.title)
  }
  return rfsData;
  }

  async statusList(res:Response){
    let status:any =StatusType;
    let statusList=[]
    // console.log(statusList,"LIst")
      for(let i in status)
      {
        statusList.push(status[i])
      }
    res.json(statusList)
  }
}