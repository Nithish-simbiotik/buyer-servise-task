import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { PagingDto } from "src/dto/paging.dto";
import { PreprEntity } from "src/entities/prepr/prepr.entity";
import { RFSRepository } from "src/repos/rfs.repository";
import { getRepository } from "typeorm";
import { PreprNotificationsEntity } from "src/entities/prepr/prepr_notifications.entity";
import { SubmitType } from "src/enum/rfs/submitType.enum";
import * as moment from 'moment';
import { stat } from "fs/promises";
import { elementAt } from "rxjs";
import { NotificationMessageType } from "src/enum/rfs/notificationMessageType.enum";
import { RFSService } from "./rfs.service";
import { MailService } from "../mail/mailservice.service";
import { GetRFSService } from "./getRfs.service";
import { GetAllUsers } from "../user/getAllUser.service";
import { PrePrLevelsEntity } from "src/entities/prepr/prepr_Level.entity";
import { PreprNotificationsHistoryEntity } from "src/entities/prepr/prepr_notificationsHistory";

@Injectable()
export class PreprNotificationService {
  constructor(
    private rfsService:GetRFSService,
    private mailService:MailService,
    private getUserService:GetAllUsers
  ) { }

 async  getNotificationList()
 {
    await this.deleteNonReferalNotification();
    await this.checkAndUpdateRecjectedNotification()
    await this.updateNotificationIntervals()
    return [];
 }
 async checkAndUpdateRecjectedNotification()
 {
    const repo = await getRepository(PreprNotificationsEntity).createQueryBuilder();
    let dataZero = await repo.where(
        'status = :status and "reminderFrequency" = 0', 
        { status: SubmitType.PENDING}
        ).getMany()
    // console.log(dataZero);
    await dataZero.forEach(async (element) => {
        let approverName = await this.getUserService.getUserNameByRoleandDepatmentId(element.departmentId,element.userRole) ;
       
        let current_dt = new Date();
        // console.log((current_dt.getTime()-element.updated_At.getTime())/(1000*60*60));
        let updateFlag = (current_dt.getTime()-element.updated_At.getTime())/(1000*60*60)>=element.reminderInterval;
        // console.log("Res Zero :: ",updateFlag);
        // console.log(element.updated_At," ",new Date()," ",new Date().getHours());
        if(updateFlag){
            await getRepository(PreprNotificationsEntity)
                    .createQueryBuilder()
                    .update()
                    .set({ status: SubmitType.REJECTED,remark : NotificationMessageType.NOT_APPROVED_DUE_TO_TTIME_OUT})
                    .where('"preprId" = :id', { id: element.preprId })
                    .andWhere('"level" = :level',{level:element.level})
                    .execute();
            
            await getRepository(PreprEntity)
                    .createQueryBuilder()
                    .update()
                    .set({ submitStatus: SubmitType.PENDING })
                    .where('id = :id', { id: element.preprId })
                    .execute();
            const rfsData = await this.rfsService.getRFSById(element.preprId);

            let notifyData= await getRepository(PreprNotificationsEntity).findOne({preprId:element.preprId,remark :NotificationMessageType.NOT_APPROVED_DUE_TO_TTIME_OUT,level:element.level});
            await getRepository(PreprNotificationsHistoryEntity).save(notifyData);

            // await getRepository(PrePrLevelsEntity)
            // .createQueryBuilder()
            // .update()
            // .set({ activeLevel: 0 })
            // .where('"preprId" = :id', { id: element.preprId})
            // .execute();

                    await this.mailService.sendMailInactiveApproval(rfsData.requestor_email,`T-Procure: Pre-PR Inactive Approval (${rfsData.internalReferenceNumber})`,rfsData.requestor_name,element.preprId,rfsData.internalReferenceNumber,rfsData.title,approverName)
                    
        } 
    });

 }
 async deleteNonReferalNotification()
 {

     await getRepository(PreprNotificationsEntity)
         .createQueryBuilder()
         .delete()
         .where('"preprId" is null')
         .execute();

 }
 async updateNotificationIntervals()
 {
    const repo = await getRepository(PreprNotificationsEntity).createQueryBuilder();
    let data = await repo.where(
        'status = :status and "reminderFrequency" >0', 
        { status: SubmitType.PENDING }
        ).getMany()
    
    await data.forEach(async (element) => {
        let approveremail = await this.getUserService.getUserEmailByRoleandDepatmentId(element.departmentId,element.userRole);
        let approverName = await this.getUserService.getUserNameByRoleandDepatmentId(element.departmentId,element.userRole) ;
        let current_dt = new Date();
        // console.log((current_dt.getTime()-element.updated_At.getTime())/(1000*60*60));
        let updateFlag = (current_dt.getTime()-element.updated_At.getTime())/(1000*60*60)>=element.reminderInterval;
        // console.log("Res :: ",updateFlag);
        // console.log(element.updated_At," ",new Date()," ",new Date().getHours());
        if(updateFlag){
            element.reminderFrequency--;
            await getRepository(PreprNotificationsEntity).save(element);
            const rfsData = await this.rfsService.getRFSById(element.preprId);

                    await this.mailService.sendMailApprovalReminder(approveremail,` T-Procure: Pre-PR Approval Reminder (${rfsData.internalReferenceNumber})`,approverName,element.preprId,rfsData.internalReferenceNumber,rfsData.title)
         
        } 
    });

 }
 
}