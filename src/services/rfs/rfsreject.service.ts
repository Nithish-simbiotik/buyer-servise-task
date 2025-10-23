import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { CreateRFSTemplateDto } from "src/dto/rfsTemplate/create-rfsTemplate.dto";
import { PagingDto } from "src/dto/paging.dto";
import { RFSRepository } from "src/repos/rfs.repository";
import { JwtPayload } from "src/interface/user/jwt.payload.interface";
import { getRepository } from "typeorm";
import { PreprNotificationsEntity } from "src/entities/prepr/prepr_notifications.entity";
import { GetAllUsers } from "../user/getAllUser.service";
import { PreprEntity } from "src/entities/prepr/prepr.entity";
import { SubmitType } from "src/enum/rfs/submitType.enum";
import { throwError } from "rxjs";
import { PrePrLevelsEntity } from "src/entities/prepr/prepr_Level.entity";
import { RFSService } from "./rfs.service";
import { PreprHistoryEntity } from "src/entities/prepr/prepr_history.entity";
import { ActionType } from "src/enum/rfs/actionType.enum";
import {Response} from "express";
import { PreprNotificationsHistoryEntity } from "src/entities/prepr/prepr_notificationsHistory";
@Injectable()
export class RejectRFSService {
    constructor(
        private readonly rfsRepo: RFSRepository,
        private getUserService: GetAllUsers,
        private getRfsService: RFSService,


    ) { }

    async rejectRfs(res:Response,user: JwtPayload, prepr: any) {
        // return await this.rfsRepo.
        let preprId = prepr.prepr;
        let remarks = prepr.remarks;
        console.log(preprId,"pre rieriririr")
        const levelObj = await this.getNotification(preprId, user);
        console.log(levelObj, "data");
        // if (levelObj.level == 1) {
            await getRepository(PreprNotificationsEntity)
                .createQueryBuilder()
                .update()
                .set({ status: SubmitType.REJECTED,remark:remarks })
                .where('"preprId" = :id', { id: preprId })
                .andWhere('"level" = :level', { level: levelObj.level })
                .execute();

                await getRepository(PreprEntity)
                .createQueryBuilder()
                .update()
                .set({ submitStatus: SubmitType.NOT_SUBMITED })
                .where('id = :id', { id: preprId })
                .execute();

                let notifyData= await getRepository(PreprNotificationsEntity).findOne({preprId:preprId,level:levelObj.level});
                console.log(notifyData,"NOtify Data");

                await getRepository(PreprNotificationsHistoryEntity).save(notifyData);

                let history = new PreprHistoryEntity();
                history.action = ActionType.REJECTED;
                history.actionBy =user.userName ;
                history.remarks = remarks;
                history.preprId = preprId;
                await getRepository(PreprHistoryEntity).save(history);

                await getRepository(PrePrLevelsEntity)
                .createQueryBuilder()
                .update()
                .set({ activeLevel: 0 })
                .where('"preprId" = :id', { id: preprId.prepr })
                .execute();


                
                await this.getRfsService.sendRejectionMailtoRequestor(preprId,levelObj.level,user.userName,remarks)
                res.json("Rejected")
       
    }

    async getNotification(preprId: any, user) {
        console.log(preprId,"preprdiii")
     const repo = getRepository(PreprNotificationsEntity);
        let data = await repo.find(
            { "preprId": Number(preprId) }
        )
        console.log(data);
        let levelObj: any = {};
        levelObj.totalLevel = data[0].totalLevels;
        for (let i = 0; i < data.length; i++) {
            const userData = await this.getUserService.getUserIdByRoleandDepatmentId(data[i].departmentId, data[i].userRole)
            // console.log("UseriD", userData)
            // console.log(user,"user")
            if (user.userId== userData) {
                levelObj.level = data[i].level;
            }
        }
        return levelObj;

    }
}