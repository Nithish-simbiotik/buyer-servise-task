import { RfxFormQuestionnairSectionAttachementEntity } from "src/entities/rfx/rfx-form/rfx-form-questionnair-section-attachement.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(RfxFormQuestionnairSectionAttachementEntity)
export class RfxFormQuestionnairAttachementRepository extends Repository<RfxFormQuestionnairSectionAttachementEntity> {
  constructor() {
    super();
  }
}
