import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateRfxFormDto,
  UpdateRfxDto,
} from 'src/dto/rfx-form/create-rfx-form.dto';
import { SubmitType } from 'src/enum/rfs/submitType.enum';
import { RfxFormStatus } from 'src/enum/rfx/rfx-form-status.enum';
import { Environment } from 'src/env/environment';
import { JwtPayload } from 'src/interface/user/jwt.payload.interface';
import { UserRepository } from 'src/repos/comon-repos/user.repository';
import { RfxEnvelopeEvaluatorRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx-envelope-evaluator.repository';
import { RfxEnvelopeRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx-envelope.repository';
import { RfxMeetingAttendeeRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx-meeting-attendee.repository';
import { RfxMeetingRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx-meeting.repository';
import { RfxSupplierRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx-supplier.repository';
import { RfxTeamMemberRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx-team-member.repository';
import { RfxRepository } from 'src/repos/rfx-repos/rfx-form-repos/rfx.repository';
import { getConnection, getManager, QueryRunner } from 'typeorm';

@Injectable()
export class AddRfxFormService {
  constructor(
    @InjectRepository(RfxRepository)
    private rfxFormRepo: RfxRepository,
    @InjectRepository(RfxTeamMemberRepository)
    private rfxFormTeamMemRepo: RfxTeamMemberRepository,
    @InjectRepository(RfxSupplierRepository)
    private rfxFormSuplierRepo: RfxSupplierRepository,
    @InjectRepository(RfxMeetingRepository)
    private rfxFormMeetingRepo: RfxMeetingRepository,
    @InjectRepository(RfxMeetingAttendeeRepository)
    private rfxFormMeetingAttendeeRepo: RfxMeetingAttendeeRepository,
    @InjectRepository(RfxEnvelopeRepository)
    private rfxFormEnvelopRepo: RfxEnvelopeRepository,
    @InjectRepository(RfxEnvelopeEvaluatorRepository)
    private rfxFormEnvelopEvaluaterRepo: RfxEnvelopeEvaluatorRepository,
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
  ) {}
  async createatRfx(dto: CreateRfxFormDto) {
    if (dto.isSubmit) {
      dto.status = RfxFormStatus.PENDING;
    }
    return await this.rfxFormRepo.createRfx(dto);
  }
  public async rfxFormDown(): Promise<any> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.dropTable('rfx_team_member_entity', true);
    await queryRunner.dropTable(
      'rfx_form_questionnair_section_attachement_entity',
      true,
    );
    await queryRunner.dropTable('rfx_form_questionnair_section_entity', true);
    await queryRunner.dropTable('rfx_form_questionnair_entity', true);
    await queryRunner.dropTable('rfx_meeing_contact_persons_entity', true);
    await queryRunner.dropTable('rfx_meeting_attendee_entity', true);
    await queryRunner.dropTable('rfx_meeting_entity', true);
    await queryRunner.dropTable('rfx_requestor_entity', true);
    await queryRunner.dropTable('rfx_sourcing_proposal_level_entity', true);
    await queryRunner.dropTable('rfx_sourcing_proposal_entity', true);
    await queryRunner.dropTable('rfx_envelope_evaluator_entity', true);
    await queryRunner.dropTable('rfx_envelope_entity', true);
    await queryRunner.dropTable('rfx_bill_of_quantity_entity', true);
    await queryRunner.dropTable('rfx_supplier_entity', true);
    await queryRunner.dropTable('rfx_approval_level_entity', true);
    await queryRunner.dropTable('recommended_supplier_entity', true);
    await queryRunner.dropTable('rfx_approval_entity', true);
    await queryRunner.dropTable('rfx_entity', true);
    return true;
  }
}
