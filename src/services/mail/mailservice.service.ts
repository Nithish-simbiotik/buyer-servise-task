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
import { MailerService } from '@nestjs-modules/mailer';
import * as moment from 'moment';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  async sendMail(to: string, subject: string, text: string, html: string,) {
    console.log(await this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'testdb01@toyota.com.my', // sender address
        subject: subject, // Subject line
        // text:text, // plaintext body,
        template: '<p>Hi {{name}},</p> <p>Hello from NestJS NodeMailer</p>',
        context: {
          name: "Sarthak"
        },
        // html: ', // HTML body content
      }))
    //.then(() => {})
    // .catch(() => {});
    return "Done"
  }
  async sendMailApprovalRequest(to: string, subject: string, userName: String, preprId: number, referenceNumber: String, title: String) {
    console.log(await this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'testdb01@toyota.com.my', // sender address
        subject: subject, // Subject line
        // text:text, // plaintext body,
        template: './approvalRequest',
        context: {
          userName: userName,
          preprId: preprId,
          title: title,
          referenceNumber: referenceNumber,
          preprLink: Environment.preprUrls.url + `${preprId}`

        },
        // html: ', // HTML body content
      }))
    //.then(() => {})
    // .catch(() => {});
    return "Done"
  }
  async sendMailApprovalReminder(to: string, subject: string, userName: String, preprId: number, referenceNumber: String, title: String) {
    console.log(await this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'testdb01@toyota.com.my', // sender address
        subject: subject, // Subject line
        // text:text, // plaintext body,
        template: './approvalReminder',
        context: {
          userName: userName,
          preprId: preprId,
          title: title,
          referenceNumber: referenceNumber,
          preprLink: Environment.preprUrls.url + `${preprId}`


        },
        // html: ', // HTML body content
      }))
    //.then(() => {})
    // .catch(() => {});
    return "Done"
  }
  async sendMailApprovedRequestor(to: string, subject: string, userName: String, preprId: number, referenceNumber: String, title: String, approver: String) {
    console.log(await this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'testdb01@toyota.com.my', // sender address
        subject: subject, // Subject line
        // text:text, // plaintext body,
        template: './approvedRequestor',
        context: {
          userName: userName,
          preprId: preprId,
          title: title,
          referenceNumber: referenceNumber,
          approverName: approver,
          preprLink: Environment.preprUrls.url + `${preprId}`

        },
        // html: ', // HTML body content
      }))
    //.then(() => {})
    // .catch(() => {});
    return "Done"
  }
  async sendMailInactiveApproval(to: string, subject: string, userName: String, preprId: number, referenceNumber: String, title: String, approver: String) {
    console.log(await this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'testdb01@toyota.com.my', // sender address
        subject: subject, // Subject line
        // text:text, // plaintext body,
        template: './inactiveApproval',
        context: {
          userName: userName,
          preprId: preprId,
          title: title,
          referenceNumber: referenceNumber,
          approverName: approver,
          preprLink: Environment.preprUrls.url + `${preprId}`

        },
        // html: ', // HTML body content
      }))
    //.then(() => {})
    // .catch(() => {});
    return "Done"
  }
  async sendMailRejectedRequest(to: string, subject: string, userName: String, preprId: number, referenceNumber: String, title: String, approver: String, rejectionRemark: String) {
    console.log(await this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'testdb01@toyota.com.my', // sender address
        subject: subject, // Subject line
        // text:text, // plaintext body,
        template: './rejectedRequestor',
        context: {
          userName: userName,
          preprId: preprId,
          title: title,
          referenceNumber: referenceNumber,
          approverName: approver,
          remark: rejectionRemark,
          preprLink: Environment.preprUrls.url + `${preprId}`

        },
        // html: ', // HTML body content
      }))
    //.then(() => {})
    // .catch(() => {});
    return "Done"
  }

  async sendMailEscalatedRequest(to: string, subject: string, userName: String, preprId: number, referenceNumber: String, title: String, approver: String, rejectionRemark: String) {
    console.log(await this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'testdb01@toyota.com.my', // sender address
        subject: subject, // Subject line
        // text:text, // plaintext body,
        template: './escalatedApproval',
        context: {
          userName: userName,
          preprId: preprId,
          title: title,
          referenceNumber: referenceNumber,
          approverName: approver,
          remarks: rejectionRemark,
          preprLink: Environment.preprUrls.url + `${preprId}`

        },
        // html: ', // HTML body content
      }))
    //.then(() => {})
    // .catch(() => {});
    return "Done"
  }
  // formateDate = async (date: Date) => {
  //   return moment(date).format('DD-MM-YYY')
  // }
  async sendInvitationEmail(invitees: any[], selectedTemplate: string, subject: string) {
    for (const context of invitees) {
      await this.mailerService
        .sendMail({
          to: 'jaleelkt786@gmail.com', // list of receivers
          from: 'testdb01@toyota.com.my', // sender address
          subject: subject, // Subject line
          // text:text, // plaintext body,
          template: selectedTemplate,
          context: context,
          // html: ', // HTML body content
        })
    }

  }

  async sendMailToEcapexApprover(to: string, subject: string, userName: string, prId: number, ecapexNo: string) {
    console.log(await this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'testdb01@toyota.com.my', // sender address
        subject: subject, // Subject line
        template: '',
        context: {
          //TODO: Need to be finalized.
        },
      }))
    return "Done"
  }

  async sendMailToCreatorAfterEcapexApproval(
    to: string, // creator email
    subject: string,
    userName: string, // approver name
    prId: number,
    ecapexNo: string) {
    console.log(await this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'testdb01@toyota.com.my', // sender address
        subject: subject, // Subject line
        template: '',
        context: {
          //TODO: Need to be finalized.
        },
      }))
    return "Done"
  }

  async sendMailToCreatorAfterEcapexRejection(
    to: string, // creator email
    subject: string,
    userName: string, // approver name
    prId: number,
    ecapexNo: string
  ) {
    console.log(await this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'testdb01@toyota.com.my', // sender address
        subject: subject, // Subject line
        template: '',
        context: {
          //TODO: Need to be finalized.
        },
      }))
    return "Done"
  }

  async sendMailToPRApprover(to: string,
    subject: string,
    userName: string,
    prId: number) {
    console.log(await this.mailerService
      .sendMail({
        to: to,
        from: 'testdb01@toyota.com.my', // sender address
        subject: subject, // Subject line
        template: '',
        context: {
          // TODO: Need to be finalized.
        },
      }))
    return "Done"
  }

  async sendMailToCreatorAfterPRApproval(
    to: string, // creator email
    subject: string,
    userName: string, // approver name
    prId: number,
    ecapexNo: string
  ) {
    console.log(await this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'testdb01@toyota.com.my', // sender address
        subject: subject, // Subject line
        template: '',
        context: {
          //TODO: Need to be finalized.
        },
      }))
    return "Done"
  }

  async sendMailToCreatorAfterPRRejection(
    to: string, // creator email
    subject: string,
    userName: string, // approver name
    prId: number,
    ecapexNo: string
  ) {
    console.log(await this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'testdb01@toyota.com.my', // sender address
        subject: subject, // Subject line
        template: '',
        context: {
          //TODO: Need to be finalized.
        },
      }))
    return "Done"
  }
}