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
import { Action } from "rxjs/internal/scheduler/Action";
import { ActionType } from "src/enum/rfs/actionType.enum";
import { Response } from "express";
import { PreprNotificationsHistoryEntity } from "src/entities/prepr/prepr_notificationsHistory";
import { PrePrSummaryPdfService } from "./preprSummary.service";

@Injectable()
export class ApproveRFSService {
    constructor(
        private readonly rfsRepo: RFSRepository,
        private getUserService: GetAllUsers,
        private getRfsService: RFSService,
        private prePrSummaryPdfService:PrePrSummaryPdfService

    ) { }

    async approveRFS(res: Response, user: JwtPayload, preprId: any) {

        const levelObj = await this.getNotification(preprId.prepr, user);
        // console.log(levelObj, "data");
        if (levelObj.level == 1 && levelObj.level != levelObj.totalLevel) {
            await getRepository(PreprNotificationsEntity)
                .createQueryBuilder()
                .update()
                .set({ status: SubmitType.APPROVED, remark: preprId.remarks })
                .where('"preprId" = :id', { id: preprId.prepr })
                .andWhere('"level" = :level', { level: 1 })
                .execute();

            let notifyData = await getRepository(PreprNotificationsEntity).findOne({ preprId: preprId.prepr, level: levelObj.level });
            await getRepository(PreprNotificationsHistoryEntity).save(notifyData);

            if (levelObj.totalLevel > levelObj.level)
                await getRepository(PreprNotificationsEntity)
                    .createQueryBuilder()
                    .update()
                    .set({ status: SubmitType.PENDING })
                    .where('"preprId" = :id', { id: preprId.prepr })
                    .andWhere('"level" = :level', { level: 1 + 1 })
                    .execute();

            await getRepository(PrePrLevelsEntity)
                .createQueryBuilder()
                .update()
                .set({ activeLevel: levelObj.level + 1 })
                .where('"preprId" = :id', { id: preprId.prepr })
                .execute();

            let history = new PreprHistoryEntity();
            history.action = ActionType.APPROVED;
            history.actionBy = user.userName;
            history.remarks = preprId.remarks;
            history.preprId = preprId.prepr;
            await getRepository(PreprHistoryEntity).save(history);

            await this.getRfsService.sendMailtoApprover(preprId.prepr, levelObj.level + 1, user.userName)
            res.json("Approved");
        }
        else if (levelObj.level == levelObj.totalLevel) {

            let levelInfo = levelObj.level
            // console.log(levelInfo, "level");
            await getRepository(PreprNotificationsEntity)
                .createQueryBuilder()
                .update()
                .set({ status: SubmitType.APPROVED, remark: preprId.remarks })
                .where('"preprId" = :id', { id: preprId.prepr })
                .andWhere('"level" = :level', { level: levelInfo })
                .execute();
            await getRepository(PrePrLevelsEntity)
                .createQueryBuilder()
                .update()
                .set({ activeLevel: 0 })
                .where('"preprId" = :id', { id: preprId.prepr })
                .execute();

            let notifyData = await getRepository(PreprNotificationsEntity).findOne({ preprId: preprId.prepr, level: levelObj.level });
            await getRepository(PreprNotificationsHistoryEntity).save(notifyData);
            const date = new Date();
            if (levelObj.totalLevel == 1) {
                await getRepository(PreprEntity)
                    .createQueryBuilder()
                    .update()
                    .set({ submitStatus: SubmitType.FINISHED, gpd_acceptance_date: date, final_approval_date: date })
                    .where('id = :id', { id: preprId.prepr })
                    .execute();
            } else {
                await getRepository(PreprEntity)
                    .createQueryBuilder()
                    .update()
                    .set({ submitStatus: SubmitType.FINISHED, gpd_acceptance_date: date })
                    .where('id = :id', { id: preprId.prepr })
                    .execute();
            }
            let history = new PreprHistoryEntity();
            history.action = ActionType.APPROVED;
            history.actionBy = user.userName;
            history.remarks = preprId.remarks;
            history.preprId = preprId.prepr;
            await getRepository(PreprHistoryEntity).save(history);

            await this.getRfsService.sendFinalMailtoApprover(preprId.prepr, user.userName)
            res.json("Approved");
        } else {
            let levelInfo = levelObj.level
            let totalLevel = levelObj.totalLevel;
            const repo = await getRepository(PreprNotificationsEntity).createQueryBuilder();
            // let data = await repo.where(
            //     '"preprId" = :preprId and "level" = :level',
            //     { preprId: preprId.prepr, level: levelInfo - 1 }
            // ).getRawOne();
            // console.log(data.PreprNotificationsEntity_status, "status")
            // if (data.PreprNotificationsEntity_status == SubmitType.APPROVED) {
            await getRepository(PreprNotificationsEntity)
                .createQueryBuilder()
                .update()
                .set({ status: SubmitType.APPROVED, remark: preprId.remarks })
                .where('"preprId" = :id', { id: preprId.prepr })
                .andWhere('"level" = :level', { level: levelInfo })
                .execute();

            let notifyData = await getRepository(PreprNotificationsEntity).findOne({ preprId: preprId.prepr, level: levelObj.level });
            await getRepository(PreprNotificationsHistoryEntity).save(notifyData);

            if (totalLevel > levelInfo)
                await getRepository(PreprNotificationsEntity)
                    .createQueryBuilder()
                    .update()
                    .set({ status: SubmitType.PENDING })
                    .where('"preprId" = :id', { id: preprId.prepr })
                    .andWhere('"level" = :level', { level: levelInfo + 1 })
                    .execute();

            await getRepository(PrePrLevelsEntity)
                .createQueryBuilder()
                .update()
                .set({ activeLevel: levelInfo + 1 })
                .where('"preprId" = :id', { id: preprId.prepr })
                .execute();
            await this.getRfsService.sendMailtoApprover(preprId.prepr, levelInfo + 1, user.userName)

            let history = new PreprHistoryEntity();
            history.action = ActionType.APPROVED;
            history.actionBy = user.userName;
            history.remarks = preprId.remarks;
            history.preprId = preprId.prepr;
            await getRepository(PreprHistoryEntity).save(history);

            if (levelInfo == totalLevel - 1) {
                const date = new Date();
                await getRepository(PreprEntity)
                    .createQueryBuilder()
                    .update()
                    .set({ final_approval_date: date })
                    .where('id = :id', { id: preprId.prepr })
                    .execute();


            }
            res.json("Approved");
            // } else {
            //     throw new HttpException(
            //         {
            //             status: HttpStatus.UNPROCESSABLE_ENTITY,
            //             error: 'Previous Level has not approved it yet',
            //         },
            //         HttpStatus.UNPROCESSABLE_ENTITY,
            //     );
            // }
        }
        this.prePrSummaryPdfService.createPdf(res, preprId.prepr);
    }

    async getNotification(preprId: number, user) {
        console.log(preprId, "idididid")
        const repo = getRepository(PreprNotificationsEntity);
        let data = await repo.find(
            { "preprId": Number(preprId) }
        )
        console.log(data, "dataaaaa");
        let levelObj: any = {};
        levelObj.totalLevel = data[0].totalLevels;
        for (let i = 0; i < data.length; i++) {
            const userData = await this.getUserService.getUserIdByRoleandDepatmentId(data[i].departmentId, data[i].userRole)
            console.log("UseriD " + i, userData, "userId", user.userId)
            // console.log(user,"user")
            if (user.userId == userData) {
                levelObj.level = data[i].level;
                console.log("levelobj:", levelObj)
            }
        }
        console.log("Level Obj :: ", levelObj)
        return levelObj;

    }
}