import { PrEXCODocumentEntity } from "src/entities/pr/pr-exco-document.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PrEXCODocumentEntity)
export class PREXCODocumentRepository extends Repository<PrEXCODocumentEntity>{

  constructor() {
    super();
  }
}