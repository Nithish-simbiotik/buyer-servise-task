import { Injectable } from '@nestjs/common';
import { RfxTemplateQuestionnaireDto } from 'src/dto/rfx-template/rfx-template-questionnaire.dto';
import { RfxTemplateQuestionnaireEntity } from 'src/entities/rfx/rfx-template/rfx-template-questionnaire/rfx-template-questionnaire.entity';
import { RfxTemplateQuestionAttachmentRepository } from 'src/repos/rfx-repos/rfx-template-repos/rfx-template-questionnaire-repo/rfx-template-question-attachment.repository';
import { RfxTemplateQuestionRepository } from 'src/repos/rfx-repos/rfx-template-repos/rfx-template-questionnaire-repo/rfx-template-question-repository';
import { RfxTemplateQuestionnaireSectionRepository } from 'src/repos/rfx-repos/rfx-template-repos/rfx-template-questionnaire-repo/rfx-template-questionnaire-section.repository';
import { RfxTemplateQuestionnaireRepository } from 'src/repos/rfx-repos/rfx-template-repos/rfx-template-questionnaire-repo/rfx-template-questionnaire.repository';

@Injectable()
export class ManageRfxTemplateQuestionnaireService {
  constructor(
    private questionnaireRepo: RfxTemplateQuestionnaireRepository,
    private questionnaireSectionRepo: RfxTemplateQuestionnaireSectionRepository,
    private questionRepo: RfxTemplateQuestionRepository,
    private questionAttachmentRepo: RfxTemplateQuestionAttachmentRepository,
  ) {}

  async addQuestionnaires(
    questionnaires: RfxTemplateQuestionnaireDto[],
  ): Promise<RfxTemplateQuestionnaireEntity[]> {
    const newQuestionnaires = questionnaires.map((set) =>
      this.questionnaireRepo.create({
        setName: set.setName,
        sections: set.sections.map((section) =>
          this.questionnaireSectionRepo.create({
            ...section,
            questions: section.questions.map((question) =>
              this.questionRepo.create({
                ...question,
                attachments: question.attachments.map((attachment) =>
                  this.questionAttachmentRepo.create(attachment),
                ),
              }),
            ),
          }),
        ),
      }),
    );

    return await this.questionnaireRepo.save(newQuestionnaires);
  }
}
