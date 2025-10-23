import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRFSDto } from "src/dto/rfs/create-rfs.dto";
import { PagingDto } from "src/dto/paging.dto";
import { PreprEntity } from "src/entities/prepr/prepr.entity";
import { RFSRepository } from "src/repos/rfs.repository";
import { FileUpload } from "../fileupload/fileupload.service";
import { JwtPayload } from "src/interface/user/jwt.payload.interface";
import { GetRFSService } from "./getRfs.service";
import { GetAllUsers } from "../user/getAllUser.service";
import { MailService } from "../mail/mailservice.service";
import { PreprSupportingDocumentEntity } from "src/entities/prepr/prepr-supporting-documents.entity";
import { getRepository } from "typeorm";
import { SubmitDocs } from "src/dto/rfs/supportDocs.dto";
import { GetFlatPurchaseOrgService } from "../flat/getFlatPurchaseOrg.service";
import { UpdateDocsDto } from "src/dto/rfs/updateDocs.dto";
import { Response } from "express";
import { CopyPrePrDataService } from "./copyPreprData.service";

@Injectable()
export class RFSService {
  constructor(
    private readonly rfsRepo: RFSRepository,
    private getUserService: GetAllUsers,
    private readonly getRfsService: GetRFSService,
    private mailService: MailService,
    private getPurchaseOrg: GetFlatPurchaseOrgService,
    private preprCopyService: CopyPrePrDataService

  ) { }

  async createRFS(user: JwtPayload, createRFSDto: CreateRFSDto) {
    let data = await this.rfsRepo.createRFS(user, createRFSDto, this.getPurchaseOrg, this.getUserService);
    let preprCopy = await this.preprCopyService.createPrePrCopy(user, data);
    return data;
  }

  async sendMailtoApprover(preprId, level, userName) {

    let userRole;
    let departmentId;
    console.log(preprId, "prepr in mail")
    const rfsById = await this.getRfsService.getRFSById(preprId)
    // console.log(rfsById,"levevl")
    for (let i = 0; i < rfsById.levels.length; i++) {
      if (rfsById.levels[i].level == level) {
        userRole = rfsById.levels[i].userRole
        departmentId = rfsById.levels[i].departmentId
      }
    }
    let applevelv = level - 1;

    let approveremail = await this.getUserService.getUserEmailByRoleandDepatmentId(departmentId, userRole)
    let approverName = await this.getUserService.getUserNameByRoleandDepatmentId(departmentId, userRole)
    console.log(approveremail, "Email")
    this.mailService.sendMailApprovalRequest(approveremail, `T-Procure: Pre-PR Approval Request (${rfsById.internalReferenceNumber})`, approverName, preprId, rfsById.internalReferenceNumber, rfsById.title)

    this.mailService.sendMailApprovedRequestor(rfsById.requestor_email, `T-Procure: Pre-PR Approved (${rfsById.internalReferenceNumber})`, rfsById.requestor_name, preprId, rfsById.internalReferenceNumber, rfsById.title, userName)
  }


  async sendMailtoRequestor(preprId, level) {
    let userRole;
    let departmentId;
    const rfsById = await this.getRfsService.getRFSById(preprId)




    this.mailService.sendMail(rfsById.requestor_email, "Pre Pr Approved b level", `Prepr form ${rfsById.title} is waiting for approval`, `FORM REJECTED By level ${level}`)
  }

  async deleteSupportingDocs(res: Response, docs: SubmitDocs) {
    let data = await getRepository(PreprSupportingDocumentEntity)
      .createQueryBuilder()
      .delete()
      .where('"preprId" = :preprId', { preprId: docs.preprId })
      .andWhere("id IN (:...plist)")
      .setParameter('plist', docs.docID)
      .execute();
    console.log(data, "data")
    res.json("Documents deleted")
  }


  async updateSupportingDocs(res: Response, id: number, docs: UpdateDocsDto) {
    console.log(docs.docData.length, "length")
    for (let i = 0; i < docs.docData.length; i++) {
      await getRepository(PreprSupportingDocumentEntity)
        .createQueryBuilder()
        .update()
        .set({ availability: docs.docData[i].availability, description: docs.docData[i].description })
        .where('"preprId" = :preprId', { preprId: id })
        .andWhere('"id" = :id', { id: docs.docData[i].docID })
        .execute();
      console.log("data")
    }
    res.json("Document Updated");

  }
  async sendFinalMailtoApprover(preprId, username) {

    let userRole;
    let departmentId;
    console.log(preprId, "prepr in mail")
    const rfsById = await this.getRfsService.getRFSById(preprId)
    console.log(rfsById, "rfs datatt");

    this.mailService.sendMailApprovedRequestor(rfsById.requestor_email, `T-Procure: Pre-PR Approved (${rfsById.internalReferenceNumber})`, rfsById.requestor_name, preprId, rfsById.internalReferenceNumber, rfsById.title, username)
  }

  async sendRejectionMailtoRequestor(preprId, level, userName, remarks) {
    let userRole;
    let departmentId;
    const rfsById = await this.getRfsService.getRFSById(preprId)


    this.mailService.sendMailRejectedRequest(rfsById.requestor_email, `T-Procure: Pre-PR Rejected (${rfsById.internalReferenceNumber})`, rfsById.requestor_name, preprId, rfsById.internalReferenceNumber, rfsById.title, userName, remarks)
  }

  async sendEscalationMail(preprId, level, remarks, escalatedUserRole, escalatedDepartment) {
    let userRole;
    let departmentId;
    console.log(preprId, "prepr in mail")
    const rfsById = await this.getRfsService.getRFSById(preprId)
    // console.log(rfsById,"levevl")
    for (let i = 0; i < rfsById.levels.length; i++) {
      if (rfsById.levels[i].level == level) {
        userRole = rfsById.levels[i].userRole
        departmentId = rfsById.levels[i].departmentId
      }
    }
    let approveremail = await this.getUserService.getUserEmailByRoleandDepatmentId(departmentId, userRole)
    let approverName = await this.getUserService.getUserNameByRoleandDepatmentId(departmentId, userRole)

    let escalatedApprovalEmail = await this.getUserService.getUserEmailByRoleandDepatmentId(escalatedDepartment, escalatedUserRole)
    let escalatedApprovaName = await this.getUserService.getUserNameByRoleandDepatmentId(escalatedDepartment, escalatedUserRole)

    this.mailService.sendMailApprovalRequest(approveremail, `T-Procure: Pre-PR Approval Request (${rfsById.internalReferenceNumber})`, approverName, preprId, rfsById.internalReferenceNumber, rfsById.title)

    this.mailService.sendMailEscalatedRequest(escalatedApprovalEmail, `T-Procure: Pre-PR Escalated Approval (${rfsById.internalReferenceNumber})`, escalatedApprovaName, preprId, rfsById.internalReferenceNumber, rfsById.title, escalatedApprovaName, remarks)
  }
}