import { PrOtherDocumentEntity } from "src/entities/pr/pr-other-document.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PrOtherDocumentEntity)
export class PROtherDocumentRepository extends Repository<PrOtherDocumentEntity>{
  constructor() {
    super();
  }
}