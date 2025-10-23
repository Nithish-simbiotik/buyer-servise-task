import { Injectable } from '@nestjs/common';
import { RfxTemplateRepository } from 'src/repos/rfx.template.repository';
import { Response } from 'express';
import { PagingDto, RfxTemplateDropDown } from 'src/dto/paging.dto';
import { ExportDto } from 'src/dto/export.dto';
import { RfxTemplateEntity } from 'src/entities/rfx/rfx-template/rfx-template.entity';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
@Injectable()
export class GetRfxTemplateService {
  constructor(private rfxTemplateRepo: RfxTemplateRepository) {}
  async getRfxTemplateById(id: number) {
    try {
      return this.rfxTemplateRepo.findOneOrFail(id);
    } catch (error) {
      throw error;
    }
  }
  async listRfxTemplates(res: Response, pagingDto: PagingDto) {
    const keyword: string = pagingDto.keyword || '';
    const data = this.rfxTemplateRepo
      .createQueryBuilder('rfx_template_entity')
      .leftJoinAndSelect('rfx_template_entity.createdBy', 'creator')
      .leftJoinAndSelect('rfx_template_entity.updatedBy', 'updator')
      .leftJoinAndSelect('rfx_template_entity.department', 'dept')
      .leftJoinAndSelect('rfx_template_entity.questionnaires', 'questionnaires')
      .leftJoinAndSelect('rfx_template_entity.teamMembers', 'teamMembers')
      .orderBy('rfx_template_entity.createdAt', 'DESC')
      .where('rfx_template_entity.templateName ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('creator.name ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('updator.name ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('dept.department_name ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('rfx_template_entity.status ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('rfx_template_entity."eventType" ILIKE :q', {
        q: `%${keyword}%`,
      });
    const page: number = pagingDto.page || 1;
    const limit: number = pagingDto.size || 10;
    const total = await data.getCount();
    data.offset((page - 1) * limit).limit(limit);
    return res.send({
      data: await data.getMany(),
      total,
      page,
    });
  }
  async exportRfxTemplateList(
    exportDto: ExportDto,
  ): Promise<RfxTemplateEntity[]> {
    const keyword: string = exportDto.keyword || '';
    console.log('quer key', keyword);

    return await this.rfxTemplateRepo
      .createQueryBuilder('rfx_template_entity')
      .leftJoinAndSelect('rfx_template_entity.envelopes', 'envelopes')
      .leftJoinAndSelect('rfx_template_entity.approvalRoute', 'approvalRoute')
      .leftJoinAndSelect('rfx_template_entity.questionnaires', 'questionnaires')
      .leftJoinAndSelect('rfx_template_entity.teamMembers', 'teamMembers')
      .leftJoinAndSelect('rfx_template_entity.department', 'dept')
      .leftJoinAndSelect('rfx_template_entity.createdBy', 'creator')
      .leftJoinAndSelect('rfx_template_entity.updatedBy', 'updator')
      .leftJoinAndSelect(
        'rfx_template_entity.sourcingProposalRoute',
        'sourcingProposalRoute',
      )
      .where('rfx_template_entity.templateName ILIKE :q', {
        q: `%${keyword}%`,
      })

      .orWhere('dept.department_name ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('rfx_template_entity.eventType ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('creator.name ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('updator.name ILIKE :q', {
        q: `%${keyword}%`,
      })
      .orWhere('rfx_template_entity.status ILIKE :q', {
        q: `%${keyword}%`,
      })

      .orderBy('rfx_template_entity.createdAt', 'DESC')
      .getMany();
    // const total = await data.getCount();
  }
  async getRfxTemplateListDropDown(
    user: JwtPayload,
    eventType: RfxTemplateDropDown,
  ) {
    try {
      let data;
      if (eventType.eventType) {
        data = this.rfxTemplateRepo
        .createQueryBuilder('template')
        .leftJoinAndSelect('template.teamMembers', 'tm')
        .leftJoinAndSelect('template.templateUsers', 'templateUsers')
        .where('template.eventType=:eventType')
        .andWhere(
          '((template.createdById=:userId) OR ( templateUsers.userId=:tm) OR ( tm.userId=:tm))',
          {
            userId: user.userId,
            tmUser: user.userId,
            tm: user.userId,
            eventType: eventType.eventType,
          },
        )
        .select(['template.id','template.templateName','template.title'])
      }else{
        data = this.rfxTemplateRepo
        .createQueryBuilder('template')
        .leftJoinAndSelect('template.teamMembers', 'tm')
        .leftJoinAndSelect('template.templateUsers', 'templateUsers')
        .andWhere(
          '((template.createdById=:userId) OR ( templateUsers.userId=:tm) OR ( tm.userId=:tm))',
          {
            userId: user.userId,
            tmUser: user.userId,
            tm: user.userId
          },
        )
        .select(['template.id','template.templateName','template.title'])
      }

        
      const result= data.getMany()
      return result
    } catch (error) {
      throw error;
    }
  }
  async getTemplateDetailsById(templateId: number) {
    const template = this.rfxTemplateRepo
      .createQueryBuilder('template')
      .where('template.id=:id', { id: templateId })
      //approval
      .leftJoinAndSelect('template.approvalRoute', 'approvalRoute')
      .leftJoinAndSelect('approvalRoute.approvalLevels', 'approvalLevels')
      .leftJoinAndSelect('approvalLevels.user', 'approvalUser')
      //sourcingProposalRoute
      .leftJoinAndSelect('template.sourcingProposalRoute', 'proposalRoute')
      .leftJoinAndSelect('proposalRoute.proposalLevels', 'proposalLevels')
      .leftJoinAndSelect('proposalLevels.user', 'proposalLevelUser')
      .leftJoinAndSelect('template.teamMembers', 'teamMembers')
      .leftJoinAndSelect('teamMembers.user', 'teamMemberUser')
      .leftJoinAndSelect('template.unmaskOwners', 'unmaskOwners')
      .leftJoinAndSelect('unmaskOwners.user', 'unmaskOwnerUser')
      //envelops
      .leftJoinAndSelect('template.envelopes', 'envelopes')
      .leftJoinAndSelect('envelopes.envelopeApprovers', 'envelopeApprovers')
      .leftJoinAndSelect('envelopeApprovers.user', 'envelopeApproversUser')
      // questionnaires
      .leftJoinAndSelect('template.questionnaires', 'questionnaires')
      .leftJoinAndSelect('questionnaires.sections', 'sections')
      .leftJoinAndSelect('sections.questions', 'questions')
      .leftJoinAndSelect('questions.attachments', 'attachments')
      .select([
        'template.documentId',
        'template.id',
        'questionnaires',
        'sections',
        'questions',
        'attachments',
        'envelopes',
        'envelopeApprovers',
        'envelopeApproversUser.name',
        'unmaskOwners',
        'unmaskOwnerUser.name',
        'teamMembers',
        'teamMemberUser.name',
        'proposalRoute',
        'proposalLevels',
        'proposalLevelUser.name',
        'approvalRoute',
        'approvalLevels',
        'approvalUser.name',
        'template.templateName',
        'template.canSuspendEvent',
        'template.suspendedEvent_visible',
        'template.suspendedEvent_readonly',
        'template.canApproveResume',
        'template.canAddAdditionalApproval',
        'template.costCenter_visible',
        'template.costCenter_readonly',
        'template.costCenterCode',
        'template.purchasingOrgCode',
        'template.purchasingOrg_readonly',
        'template.canEditBillOfQuantity',
        'template.teamMembers_readonly',
        'template.baseCurrency_readonly',
        'template.baseCurrency_visible',
        'template.decimal_visible',
        'template.decimal_readonly',
        'template.templateName',
        'template.title_readonly',
        'template.supplierCategory',
        'template.supplierCategory_visible',
        'template.supplierCategory_readonly',
        'template.quotationValidity',
        'template.quotationValidity_readonly',
        'template.enableSupplierNameMaskingForEvaluation',
        'template.selectUnmaskOwners_visible',
        'template.canCloseEnvelope',
        'template.canCloseEnvelope_visible',
        'template.canAddSupplier',
        'template.canAddSupplier_visible',
        'template.enableSupplierTnC',
        'template.supplierTnCDeclarationId',
        'template.supplierTnC_visible',
        'template.supplierTnC_readonly',
        'template.canEvaluateConclusion',
        'template.selectConclusionOwners_visible',
        // baseCurrencyId
        'template.baseCurrency_readonly',
        'template.baseCurrency_visible',
      ])
      .getOne();
    return template;
  }
}
