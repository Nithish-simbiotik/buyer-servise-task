import { PRDocumentDto } from "src/dto/pr/create-pr.dto";
import { PrJustificationDocumentEntity } from "src/entities/pr/pr-justification-document.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PrJustificationDocumentEntity)
export class PRJustificationDocumentRepository extends Repository<PrJustificationDocumentEntity>{

  constructor() {
    super();
  }
}