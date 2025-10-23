import { Injectable } from '@nestjs/common';
import { RfxTemplateEnvelopeDto } from 'src/dto/rfx-template/create.rfx.template.dto';
import { RfxTemplateEnvelopeEntity } from 'src/entities/rfx/rfx-template/rfx-template-envelope/rfx-template-envelope.entity';
import { RfxTemplateEnvelopeRepository } from 'src/repos/rfx-repos/rfx-template-repos/rfx-template-envelope-repo/rfx-template-envelope.repository';

@Injectable()
export class ManageRfxTemplateEnvelopeService {
  constructor(private rfxTemplateEnvelopeRepo: RfxTemplateEnvelopeRepository) {}

  async addEnvelopes(
    envelopes: RfxTemplateEnvelopeDto[],
  ): Promise<RfxTemplateEnvelopeEntity[]> {
    const newEnvelopes = envelopes.map((envelope) =>
      this.rfxTemplateEnvelopeRepo.create({
        envelopeName: envelope.envelopeName,
        openingSequence: envelope.openingSequence,
        readonly: envelope.readonly,
        canApproveWorkflow: envelope.canApproveWorkflow,
        attachmentType: envelope.attachmentType,
        showAttachmentOption: envelope.showAttachmentOption,
        envelopeSequence: envelope.envelopeSequence,
      }),
    );

    return await this.rfxTemplateEnvelopeRepo.save(newEnvelopes);
  }

  async getEnvelopes(): Promise<RfxTemplateEnvelopeEntity[]> {
    return await this.rfxTemplateEnvelopeRepo.find();
  }
}
