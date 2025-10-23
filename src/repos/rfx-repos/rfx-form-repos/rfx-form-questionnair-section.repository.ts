import { RfxFormQuestionnairSectionEntity } from "src/entities/rfx/rfx-form/rfx-form-questionnair-section.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(RfxFormQuestionnairSectionEntity)
export class RfxFormQuestionnairSectionRepository extends Repository<RfxFormQuestionnairSectionEntity> {
  constructor() {
    super();
  }
}