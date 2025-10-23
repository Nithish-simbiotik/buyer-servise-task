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
import { Response } from "express";
import { PreprNotificationsHistoryEntity } from "src/entities/prepr/prepr_notificationsHistory";
@Injectable()
export class AutoEscalationRFSService {
    constructor(
        private readonly rfsRepo: RFSRepository,
        private getUserService: GetAllUsers,
        private getRfsService: RFSService,


    ) { }

    async escalateRfs(res: Response, user: JwtPayload, prepr: any) {
        let preprId = prepr.prepr;
        let remarks = prepr.remarks;
        let activeLevel = prepr.activeLevel;
        let escalatedDepartment =prepr.escalatedDepartment;
        let escalatedUserRole:string = prepr.escalatedUserRole;
        


        await getRepository(PrePrLevelsEntity)
            .createQueryBuilder()
            .update()
            .set({ activeLevel: activeLevel + 1 })
            .where('"preprId" = :id', { id: preprId })
            .execute();
        await getRepository(PreprNotificationsEntity)
            .createQueryBuilder()
            .update()
            .set({ status: SubmitType.ESCALATE, remark: remarks })
            .where('"preprId" = :id', { id: preprId })
            .andWhere('"level" = :level', { level: activeLevel })
            .execute();
            let mailLevel = activeLevel+1;
            await this.getRfsService.sendEscalationMail(preprId,mailLevel,remarks,escalatedUserRole,escalatedDepartment)

        await getRepository(PreprNotificationsEntity)
            .createQueryBuilder()
            .update()
            .set({ status: SubmitType.PENDING })
            .where('"preprId" = :id', { id: preprId })
            .andWhere('"level" = :level', { level: activeLevel + 1 })
            .execute();
            let history = new PreprHistoryEntity();
            history.action = "Escalated";
            history.actionBy = user.userName;
            history.remarks =  remarks;
            history.preprId = preprId;
            await getRepository(PreprHistoryEntity).save(history);

    res.json("Escalated")

    }

}