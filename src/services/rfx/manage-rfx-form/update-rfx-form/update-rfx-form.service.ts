import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRfxDto } from 'src/dto/rfx-form/create-rfx-form.dto';
import { RfxFormStatus } from 'src/enum/rfx/rfx-form-status.enum';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { RfxRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx.repository';
import { ManageSupplierService } from '../manage-supplier/manage-supplier.service';
import * as moment from 'moment';
import { MailService } from 'src/services/mail/mailservice.service';
import { PurchaseOrgEnum, RfxEventType } from 'src/enum/rfx/rfx.enum';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { RfxMeetingEntity } from 'src/entities/rfx/rfx-form/rfx-meeting.entity';
import { RfxMeetingRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx-meeting.repository';
import { MettingStatus } from 'src/enum/rfx/meeting-status.enum';
import { TeamMemberType } from 'src/enum/team-member/team-member-type.enum';
import { LessThan, MoreThan } from 'typeorm';

@Injectable()
export class UpdateRfxFormService {
  constructor(
    @InjectRepository(RfxRepository)
    private rfxFormRepo: RfxRepository,
    @InjectRepository(RfxMeetingRepository)
    private rfxMeetingRepo: RfxMeetingRepository,
    private manageSupplierService: ManageSupplierService,
    private smtpService: MailService,
    private readonly scheduleRegistry: SchedulerRegistry,

  ) {
    this.scheduleMeetingDefault()
  }
  async updateRfx(updateDto: UpdateRfxDto) {
    return await this.rfxFormRepo.updateRfxForm(updateDto);
  }
  async inviteSuppliers(rfxId: number) {
    try {
      let selectedTemplate;
      let invitee: Array<{
        id?: number;
        supplierEmail: string;
        referenceNo?:string;
        meeting: {
          meetingDate?: string;
          meetingTime?: string;
          meetingVenu?: string;
          meetingType: string;
          meetingTitle?: string;
        }[];
        meetingRequired: boolean;
        sourcingId: string;
        rfxTitle: string;
        eventClosingDate: string;
        eventCloseTime: string;
        eventStartDate: string;
        eventStartTime: string;
        supplierName: string;
        purchaseOrg: string;
        redirectLink: string;
      }> = Array();
      let rfx = await this.rfxFormRepo.findOne({ id: rfxId }, { relations: ['supplier', 'supplier.selectedSupplier', 'meeting'], loadEagerRelations: false })
      rfx.status = RfxFormStatus.ACTIVE;
      rfx.eventStartDate = new Date()

      if (rfx.meeting.length != 0) {
        for await (const meeting of rfx.meeting) {
          let mdate = new Date(meeting.meetingDate)
          mdate.setHours(mdate.getHours() + 24);
          meeting.scheduledMeetingEndDate = mdate;
          meeting.isActiveMeeting = true
        }
        console.log("Execution controll");
        
        await this.scheduleMeeting(rfx.meeting)
      }
      const updatedRfx = await rfx.save();
      //1.IF COMMON THEN BROADCAST EMAIL
      //ELSE LOOP THROUGH SEND EMAIL
      //2.UPDATE STATUS TO INVITED
      console.log("rfx.eventStartDate", rfx.eventStartDate);

      for (const supplier of rfx['supplier']['selectedSupplier']) {
        //send email
        console.log('', supplier.supplier.accountPicEmail);
        let meetings = rfx.meeting.map((meeting) => {
          return {
            meetingDate: moment(meeting.meetingDate).format('DD-MM-YYYY'),
            meetingTime: meeting.meetingTime,
            meetingVenu: meeting.meetingVenue,
            meetingType: meeting.meetingType,
            meetingTitle: meeting.meetingTitle
          }
        })
        invitee.push(
          {
            id: rfx.id,
            referenceNo:rfx.internalReferenceNumber??'',
            supplierEmail: supplier.supplier.accountPicEmail,
            meetingRequired: true,//rfx.isMeetingRequired,
            supplierName: supplier.supplier.companyName,
            rfxTitle: rfx.title,
            eventClosingDate: moment(rfx.closingDate).format('DD-MM-YYYY'),
            eventCloseTime: moment(rfx.closingDate).format('Hh:mm'),
            eventStartDate: moment(rfx.eventStartDate).format('DD-MM-YYYY'),
            eventStartTime: moment(rfx.eventStartDate).format('Hh:mm'),
            meeting: meetings,
            redirectLink: "",
            sourcingId: "",
            purchaseOrg: rfx.purchasingOrgCode,

          })

      }
      //template selecter
      // if (rfx.purchasingOrg==null) {
      //   rfx.purchasingOrg=PurchaseOrgEnum.AISB
      // }
      switch (rfx.eventType) {
        case RfxEventType.RFT:
          if (rfx.purchasingOrgCode == PurchaseOrgEnum.UMWT) {
            selectedTemplate = './supplierInvitation-RFT-UMWT';
          } else {
            selectedTemplate = './supplierInvitation-RFT-GEN';
          }
          break;
        case RfxEventType.RFQ:
          if (rfx.purchasingOrgCode.toString() == PurchaseOrgEnum.UMWT) {
            selectedTemplate = './supplierInvitation-RFQ-UMWT';
          } else {
            selectedTemplate = './supplierInvitation-RFQ-GEN';
          }
        default:
          break;
      }
      await this.manageSupplierService.updateAllSupplier(rfxId)
      this.smtpService.sendInvitationEmail(invitee, selectedTemplate, 'subject')
      return updatedRfx
      //TODO TRIGGER SUPPLIER INVITATION EMAIL NOTIFICATION
    } catch (error) {
      console.log('Invitation  error', error);
    }
  }

  // change rfx status when approval cycle reset/rejected by any one level.
  async resetApprovalCycle(rfxId: number) {
    const rfx = await this.rfxFormRepo.findOneOrFail(
      { id: rfxId },
      { loadEagerRelations: false },
    );
    rfx.status = RfxFormStatus.NOT_SUBMITED;
    return await rfx.save();
  }

  async submitRfxForApproval(rfxId: number, user: JwtPayload) {
    const rfx = await this.rfxFormRepo.findOneOrFail(
      { id: rfxId },
      {
        loadEagerRelations: false,
        relations: ['teamMembers'],
      },
    );

    // is status draft ?
    if (rfx.status !== RfxFormStatus.NOT_SUBMITED)
      throw new ForbiddenException('this form is no longer a draft');

    // is current user an associate team member?
    const associateTeamMember = rfx.teamMembers.find(
      (member) =>
        member.userId === user.userId &&
        member.viewStatus === TeamMemberType.ASSOCIATE_OWNER,
    );

    const isCreator = rfx.createdById === user.userId;

    if (associateTeamMember || isCreator) {
      rfx.status = RfxFormStatus.PENDING;

      await this.rfxFormRepo.save(rfx);

      return {
        message: 'rfx has successfully been initialized for future approvals',
      };
    } else {
      throw new ForbiddenException(
        'You are not an authorised personell to submit this rfx for approval',
      );
    }
  }
  async scheduleMeeting(meetings: RfxMeetingEntity[]) {
    for await (const meeting of meetings) {
      console.log("meetings",meeting.id);
      
      let job = new CronJob(meeting.meetingDate, async () => {
        let meetingUpdates1 = await this.rfxMeetingRepo.findOne(
          { id: meeting.id }
        );
        if (meetingUpdates1) {
          //Send notification
          meetingUpdates1.meetingStatus = MettingStatus.ONGOING;
          meetingUpdates1.save()
        }
      });
      let mdate = new Date(meeting.meetingDate)
      mdate.setHours(mdate.getHours() + 24);
      const job2 = new CronJob(mdate, async () => {
        const meetingUpdates = await this.rfxMeetingRepo.findOne(
          { id: meeting.id }
        );
        if (meetingUpdates) {
          //Send notification
          meetingUpdates.meetingStatus = MettingStatus.ENDED;
          meetingUpdates.save()
        }
      });

      this.scheduleRegistry.addCronJob(`${meeting.id}${meeting.meetingDate}${meeting.meetingTitle}-changeStatus`, job);
      job.start();
      this.scheduleRegistry.addCronJob(`${meeting.id}${mdate}${meeting.meetingTitle}-'end'-changeStatus`, job);
      job2.start();
    }
    console.log(`scheduling triger ${this.scheduleRegistry.getCronJobs().size} jobs`);
  }
  async scheduleMeetingDefault() {
    try {

      const meetings = await this.rfxMeetingRepo.find({
        where: {
          isActiveMeeting: true,
          scheduledMeetingEndDate: MoreThan(new Date().toUTCString()),
          // meetingDate: MoreThan(new Date().toUTCString())
        }
      }
      )
      // console.log("meetings",meetings);
      console.log("today",new Date());
      
      for await (const meeting of meetings) {
        if (moment(meeting.meetingDate).isBefore(moment())) {
          console.log("true");
          console.log("today", new Date());


        } else {
          console.log("Past");
          let job = new CronJob(meeting.meetingDate, async () => {
            let meetingUpdates1 = await this.rfxMeetingRepo.findOne(
              { id: meeting.id }
            );
            if (meetingUpdates1) {
              //Send notification
              meetingUpdates1.meetingStatus = MettingStatus.ONGOING;
              meetingUpdates1.save()

            }
          });
          this.scheduleRegistry.addCronJob(`${meeting.id}${meeting.meetingDate}${meeting.meetingTitle}-changeStatus`, job);
          job.start();

        }

        let mdate = new Date(meeting.scheduledMeetingEndDate)
        const job2 = new CronJob(mdate, async () => {
          const meetingUpdates = await this.rfxMeetingRepo.findOne(
            { id: meeting.id }
          );
          if (meetingUpdates) {
            //Send notification
            meetingUpdates.meetingStatus = MettingStatus.ENDED;
            meetingUpdates.save()
          }
        });

        this.scheduleRegistry.addCronJob(`${meeting.id}${mdate}${meeting.meetingTitle}'end'-changeStatus`, job2);
        job2.start();
      }
      console.log(`scheduling triger ${this.scheduleRegistry.getCronJobs().size} jobs`);

    } catch (error) {
      console.log("$$$$$$", error);

    }

  }
}
