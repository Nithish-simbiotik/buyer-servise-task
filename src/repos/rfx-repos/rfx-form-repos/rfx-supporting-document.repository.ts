import { RfxSupportingDocumentEntity } from "src/entities/rfx/rfx-form/rfx-supporting-document";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(RfxSupportingDocumentEntity)
export class RfxSupportingDocumentRepository extends Repository<RfxSupportingDocumentEntity> {
  constructor() {
    super();
  }
}