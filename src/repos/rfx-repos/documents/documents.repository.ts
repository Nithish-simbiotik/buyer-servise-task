import { SupportingDocumentEntity } from "src/entities/documents/supporting-documents.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(SupportingDocumentEntity)
export class DocumentsRepository extends Repository<SupportingDocumentEntity> {
    constructor() {
        super();
    }
}