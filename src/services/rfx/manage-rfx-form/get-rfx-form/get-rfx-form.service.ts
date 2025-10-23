import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingDto, RfxColSearch, RfxListFilterDto, RfxSearchFilter } from 'src/dto/paging.dto';
import { SupplierStatus } from 'src/enum/rfx/rfx-form-status.enum';
import { RfxListSearchEnum } from 'src/enum/rfx/rfx.enum';
import { RfxInvitationActionInterface } from 'src/interface/rfx/rfx-invitation-action.interface';
import { JwtPayload } from 'src/interface/supplier/login-interface';
import { RFSRepository } from 'src/repos/rfs.repository';
import { RfxRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx.repository';
import { AddressService } from 'src/services/flat/address.service';
import { GetRfxTemplateService } from '../../manage-rfx-template/get-rfx-template/get-rfx-template.service';

@Injectable()
export class GetRfxFormService {
    constructor(
        @InjectRepository(RfxRepository)
        private rfxFormRepo: RfxRepository,
        private readonly getRfxTemplateService: GetRfxTemplateService,
        @InjectRepository(RFSRepository)
        private readonly rfsRepo: RFSRepository,
        private getDeliveryAddress: AddressService,


    ) { }
    /**
     * 
     * @param userId 
     * @param pagingDto 
     * @returns 
     */
    async getRfxList(userId: number, pagingDto: RfxListFilterDto) {
        const searchKey: string = pagingDto.keyword || '';
        const page: number = pagingDto.page || 1;
        const limit: number = pagingDto.size || 5;
        let fromDate;
        let toDate;
        if (pagingDto.fromDate) {
            fromDate = new Date(pagingDto.fromDate)
        }
        if (pagingDto.toDate) {
            toDate = new Date(pagingDto.toDate)
        }
        let data = this.rfxFormRepo
            .createQueryBuilder('rfx')
            .leftJoinAndSelect('rfx.approvalRoute', 'aprvl')
            .leftJoinAndSelect('aprvl.approvalLevels', 'approvlvl')
            .leftJoinAndSelect('rfx.teamMembers', 'tm')
            .leftJoinAndSelect('rfx.requestor', 'req')
            .leftJoinAndSelect('rfx.creator', 'creator')
            .leftJoinAndSelect('rfx.sourcingProposalRoute', 'sourcingProposalRoute')
            .leftJoinAndSelect('sourcingProposalRoute.proposalLevels', 'proposalLevels')

            .andWhere("((rfx.createdById=:userId) OR ( approvlvl.userId=:level) OR ( tm.userId=:tmUser) OR (proposalLevels.userId=:propser)) AND ((rfx.title ilike :q) OR (rfx.status ilike :q) OR (rfx.eventType ilike :q) OR (rfx.internalReferenceNumber ilike :q) OR (rfx.sourcingProposalStatus ilike :q) OR (requestor.name ilike :q))", {
                userId: userId,
                level: userId,
                tmUser: userId,
                propser: userId,
                q: `%${searchKey}%`
            })
            // .where("(rfx.title ilike :q)  OR (rfx.status ilike :q) OR (rfx.eventType ilike :q) OR (rfx.internalReferenceNumber ilike :q) OR (rfx.sourcingProposalStatus ilike :q) OR (requestor.name ilike :q)", { q: `%${searchKey}%` })

            .leftJoinAndSelect('rfx.approvalRoute', 'approval')
            .leftJoinAndSelect('rfx.requestor', 'requestor')

            .leftJoinAndSelect('approval.approvalLevels', 'approvalLevels')
            .leftJoinAndSelect('rfx.teamMembers', 'teamMembers')
            .select([
                "approvlvl",
                "rfx.urgentJob",
                "rfx.eventType",
                "rfx.internalReferenceNumber",
                "rfx.title",
                "rfx.id",
                "rfx.createdAt",
                "rfx.closingDate",
                "rfx.status",
                "rfx.sourcingProposalStatus",
                "approval.id",
                "requestor.name",
                "requestor.department",
                "requestor.mobileNo",
                "requestor.emailAddress",
                "requestor.contactNo",
                "approvalLevels.levelName",
                "approvalLevels.userId",
                "teamMembers.viewStatus",
                "teamMembers.userId",
                "creator.name"
                // "purchasingOrg"
            ])
            .orderBy('rfx.createdAt', 'DESC')
        if (pagingDto.fromDate) {
            data.where("(rfx.eventStartDate >= :startDate) AND (rfx.eventStartDate <= :endDate)", { startDate: fromDate, endDate: toDate })
            data.where("(rfx.closingDate >= :startDate) AND (rfx.closingDate <= :endDate)", { startDate: fromDate, endDate: toDate })

        }
        const total = await data.getCount()
        data.skip((page - 1) * limit).take(limit);
        return { total: total, data: await data.getMany() }
    }
    /**
     * 
     * @param id 
     * @returns 
     */
    async getRfxById(id: number) {
        let data = await this.rfxFormRepo.findOne(id)
        if (data) {
            return data
        } else {
            throw new NotFoundException(`Can't find rfx`)
        }
    }
    /**
     * 
     * @param templateId 
     * @param pprId 
     * @returns 
     */
    async getPrefilledRfxFormData(templateId: number, pprId: number) {


        // let templateData = await this.getRfxTemplateService.getTemplateDetailsById(templateId)
        // console.log(templateData);

        /**
         * Get template details
         * Get ppr details
         **/
        let templateDetals = await this.getRfxTemplateService.getTemplateDetailsById(templateId)
        //  let pprDetails=await this.

        const rfsSelection: any =

            [
                'id',
                // 'urgentJobOption',
                'urgentJobOption',
                'justificationOfPurchase',
                'internalReferenceNumber',
                // 'closingDate',
                // 'closingTime',
                'title',
                // 'title_readonly',
                'deliveryAddressId',
                'deliveryAddress',
                // 'deliveryDate',
                'expectedDeliveryLeadTime', //alternate delevery date
                'warranty',
                // 'baseCurrencyId',
                'currency',
                'estimateCost',
                'previousPurchase',
                // 'description',
                // 'requestor',
                // 'costCenterCode',
                'deliveryAddressType',//
                'warranty',
                'previousPurchase',
                'estimateCost',
                'costCenter',
                'purchasingOrg',
                'userId',
                'created_by',
                'purchasingOrgName',
                'recommandedNewSupplier',
            ]
        let data: any = await this.rfsRepo.findOne({ id: pprId }, {
            select: rfsSelection, relations: ['boq', 'recommandedSuppliers', 'supportingDocuments']
        });
        if (data.deliveryAddressType == "List")
            data.deliveryAddress = await this.getDeliveryAddress.getDeliveryAddressNameById(data.deliveryAddressId)
        return { ...templateDetals, ...data }
    }
    //| 'eventStartDate' | 'eventType' | 'id' | 'internalReferenceNumber' | 'status' | 'title' | 'urgentJob'
    async rfxSearch(userId: number, pagingDto: RfxSearchFilter, filter: Omit<RfxSearchFilter, 'page' | 'keyword' | 'size'>) {
        if (!filter) {
            throw new UnprocessableEntityException('Please select filter')
        }
        const filterArr = ['closingDate', 'createdAt', 'eventStartDate', 'eventType', 'id', 'internalReferenceNumber', 'status', 'title', 'urgentJob']
        console.log("filter", filter);

        let qStr = '((rfx."createdById"=:userId) OR ( approvlvl.userId=:level) OR ( tm.userId=:tmUser))'
        let data = this.rfxFormRepo
            .createQueryBuilder('rfx')
            .leftJoinAndSelect('rfx.approvalRoute', 'aprvl')
            .leftJoinAndSelect('aprvl.approvalLevels', 'approvlvl')
            .leftJoinAndSelect('rfx.teamMembers', 'tm')
            .leftJoinAndSelect('rfx.requestor', 'req')
            .leftJoinAndSelect('rfx.approvalRoute', 'approval')
            .leftJoinAndSelect('rfx.requestor', 'requestor')
            // .leftJoinAndSelect('requestor.user', 'requestedUser')
            .leftJoinAndSelect('approval.approvalLevels', 'approvalLevels')
            .leftJoinAndSelect('rfx.teamMembers', 'teamMembers')
            .leftJoinAndSelect('rfx.creator', 'creator')

            .select([
                "rfx.urgentJob",
                "rfx.eventType",
                "rfx.internalReferenceNumber",
                "rfx.title",
                "rfx.id",
                "rfx.createdAt",
                "rfx.closingDate",
                "rfx.status",
                "rfx.sourcingProposalStatus",
                "approval.id",
                "approvalLevels.levelName",
                "approvalLevels.userId",
                "teamMembers.viewStatus",
                "teamMembers.userId",
                "requestor.name",
                "requestor.mobileNo",
                "requestor.emailAddress",
                "requestor.department",
                "creator.name"

                // "purchasingOrg"
            ])
            .orderBy('rfx.createdAt', 'DESC')
        for await (const iterator of Object.keys(filter)) {
            if (filter[iterator] !== undefined && filterArr.includes(iterator)) {
                filter[iterator] = `%${filter[iterator]}%`
                if (iterator == RfxListSearchEnum.CLOSING_DATE) {
                    qStr = qStr + `AND(rfx."${iterator}"::date=:${iterator})`
                } else if (iterator == RfxListSearchEnum.CREATED_AT) {
                    qStr = qStr + `AND(rfx."${iterator}"::date=:${iterator})`
                } else if (iterator == RfxListSearchEnum.EVENT_START_DATE) {
                    qStr = qStr + `AND(rfx."${iterator}"::date=:${iterator})`
                } else {
                    qStr = qStr + `AND(CAST(rfx."${iterator}" AS TEXT) ilike :${iterator})`
                }
            } else {
                delete filter[iterator]
            }


        }
        filter['userId'] = filter['level'] = filter['tmUser'] = userId;
        console.log("obj", filter);
        data.where(`${qStr}`, filter)

        //old code
        // if (pagingDto.key == RfxListSearchEnum.CLOSING_DATE) {
        //     // pagingDto.colKeyword = new Date(pagingDto.colKeyword)
        //     data.where(`(rfx."${pagingDto.key}"::date=:q) AND((req.userId=:userId) OR ( approvlvl.userId=:level) OR ( tm.userId=:tmUser))`, {
        //         q: `%${pagingDto.colKeyword}%`,
        //         userId: userId,
        //         level: userId,
        //         tmUser: userId
        //     })
        // } else if (pagingDto.key == RfxListSearchEnum.CREATED_AT) {
        //     // pagingDto.colKeyword = new Date(pagingDto.colKeyword)
        //     data.where(`(rfx."${pagingDto.key}"::date=:q) AND((req.userId=:userId) OR ( approvlvl.userId=:level) OR ( tm.userId=:tmUser))`, {
        //         q: `%${pagingDto.colKeyword}%`,
        //         userId: userId,
        //         level: userId,
        //         tmUser: userId
        //     })

        // } else if (pagingDto.key == RfxListSearchEnum.EVENT_START_DATE) {
        //     data.where(`(rfx."${pagingDto.key}"::date=:q) AND((req.userId=:userId) OR ( approvlvl.userId=:level) OR ( tm.userId=:tmUser))`, {
        //         q: `%${pagingDto.colKeyword}%`,
        //         userId: userId,
        //         level: userId,
        //         tmUser: userId
        //     })

        // } else {
        //     data.where(`(CAST(rfx."${pagingDto.key}" AS TEXT) ilike :q) AND((req.userId=:userId) OR ( approvlvl.userId=:level) OR ( tm.userId=:tmUser))`, {
        //         q: `%${pagingDto.colKeyword}%`,
        //         userId: userId,
        //         level: userId,
        //         tmUser: userId
        //     })
        // }
        //the end
        const total = await data.getCount()
        const page: number = pagingDto.page || 1;
        const limit: number = pagingDto.size || 10;
        data.offset((page - 1) * limit).limit(limit);
        const result = await data.getMany();
        return { total: total, result: result }
    }
    async getRfxDetailsById(id: number) {
        let data = this.rfxFormRepo
            .createQueryBuilder('rfx')
            .where('rfx.id=:id', { id: id })
            .leftJoinAndSelect('rfx.requestor', 'requestor')
            .leftJoinAndSelect('rfx.creator', 'creator')

            .leftJoinAndSelect('rfx.envelopes', 'envelopes')
            .leftJoinAndSelect('envelopes.envelopeEvaluators', 'envelopeEvaluators')
            .leftJoinAndSelect('envelopeEvaluators.userDetails', 'envelopEvaluateUser')
            .leftJoinAndSelect('envelopes.envelopeApprovers', 'envelopeApprovers')
            .leftJoinAndSelect('envelopeApprovers.userDetails', 'envelopeApproversUser')




            .leftJoinAndSelect('rfx.supplier', 'supplier')
            .leftJoinAndSelect('supplier.recommendedSuppliers', 'recommendedSuppliers')
            .leftJoinAndSelect('recommendedSuppliers.supplier', 'recommendedSupSupplier')
            .leftJoinAndSelect('supplier.selectedSupplier', 'selectedSupplier')
            .leftJoinAndSelect('selectedSupplier.supplier', 'selectedSupSupplier')

            .leftJoinAndSelect('rfx.teamMembers', 'teamMembers')
            .leftJoinAndSelect('teamMembers.user', 'teamMemberUser')

            .leftJoinAndSelect('rfx.rfxTemplate', 'rfxTemplate')

            .leftJoinAndSelect('rfx.prePr', 'prePr')

            .leftJoinAndSelect('rfx.meeting', 'meeting')
            .leftJoinAndSelect('meeting.meetingAttendees', 'meetingAttendees')
            .leftJoinAndSelect('meetingAttendees.user', 'attendeeuser')
            .leftJoinAndSelect('meeting.meetingContactPersons', 'meetingContactPersons')
            .leftJoinAndSelect('meetingContactPersons.user', 'meetingContactPersonsUser')

            .leftJoinAndSelect('meeting.meetingReminder', 'meetingReminder')


            .leftJoinAndSelect('rfx.questionnaire', 'questionnaire')
            .leftJoinAndSelect('questionnaire.sections', 'sections')
            .leftJoinAndSelect('sections.questions', 'questions')
            .leftJoinAndSelect('questions.attachments', 'attachments')

            .leftJoinAndSelect('rfx.approvalRoute', 'approval')
            .leftJoinAndSelect('approval.approvalLevels', 'approvalLevels')
            .leftJoinAndSelect('approvalLevels.userDetails', 'approvalLevelUser')

            .leftJoinAndSelect('rfx.sourcingProposalRoute', 'sourcingProposalRoute')
            .leftJoinAndSelect('sourcingProposalRoute.proposalLevels', 'sourcingProposalLevels')
            .leftJoinAndSelect('sourcingProposalLevels.userDetails', 'sourcingProposalLevelsUser')

            .leftJoinAndSelect('rfx.boq', 'boq')
            .leftJoinAndSelect('rfx.department', 'department')

            .leftJoinAndSelect('rfx.supportingDocuments', 'supportingDocuments')
        const result = await data.getOne()
        // console.log("result", result);

        if (result) {
            return result
        } else {
            throw new NotFoundException(`Can't find rfx`)
        }
    }
    /**
     * 
     * @param rfxId 
     * @param supplierId 
     * @returns RfxInvitationActionInterface
     */
    async getRfxInvitaionDetails(rfxId: number, supplierId: number) {
        console.log("supplierId", supplierId);
        console.log("rfxId", rfxId);

        const result = await this.rfxFormRepo
            .createQueryBuilder('rfx')
            .where('rfx.id=:rfxId', { rfxId: rfxId })
            .andWhere('selectedSupplier.supplierId=:supplierId', { supplierId: supplierId })
            .leftJoinAndSelect('rfx.requestor', 'requestor')
            .leftJoinAndSelect('rfx.creator', 'creator')
            .leftJoinAndSelect('rfx.supplier', 'supplier')
            .leftJoinAndSelect('supplier.selectedSupplier', 'selectedSupplier')
            .leftJoinAndSelect('rfx.termsAndConditionDoc', 'termsAndConditionDoc')

            
            .select([
                'creator.name',
                'creator.email_address',
                'creator.contact_number',
                'requestor',
                'rfx.id',
                'rfx.internalReferenceNumber',
                'rfx.closingDate',
                'rfx.eventType',
                'rfx.eventStartDate',
                'rfx.description',
                'rfx.expectedDeliveryLeadTime',
                'supplier.id',
                'rfx.status',
                'rfx.title',
                'rfx.quotationValidity',
                'termsAndConditionDoc'
                // 'selectedSupplier.rfxSupplierId'

            ])
            .getOne() as unknown as RfxInvitationActionInterface
        if (result) {
            console.log("rfxId", result.supplier);

            return result
        } else {
            throw new UnprocessableEntityException('Invalid invitation')
        }

    }
    async getRfxEventList(user: JwtPayload, supplierStatus: SupplierStatus) {
        let data = this.rfxFormRepo
            .createQueryBuilder('rfx')
            .leftJoinAndSelect('rfx.supplier', 'supplier')
            .leftJoinAndSelect('rfx.creator', 'creator')
            .leftJoinAndSelect('supplier.selectedSupplier', 'selectedSupplier')
            .where("selectedSupplier.supplierId=:supplierId", {
                supplierId: user.userId,
            })
            .andWhere('selectedSupplier.status IN (:...statusList)', {
                statusList: [SupplierStatus.INVITED, SupplierStatus.PREVIEWED]

            })
            .select(['rfx.title', 'rfx.id', 'rfx.internalReferenceNumber', 'rfx.eventStartDate', 'creator.name', 'rfx.purchasingOrg', 'rfx.purchasingOrgCode'])
        //
        return await data.getMany()
    }
}
