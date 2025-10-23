import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PRDocumentDto } from "src/dto/pr/create-pr.dto";
import { SupportingDocumentsDto } from "src/dto/rfs/create-rfs.dto";
import { PRDocumentType } from "src/enum/pr/pr-document-type.enum";
import { PREXCODocumentRepository } from "src/repos/pr_Repos/pr_excoDocuments.repository";
import { PRJustificationDocumentRepository } from "src/repos/pr_Repos/pr_justificationDocuments.repository";
import { PROtherDocumentRepository } from "src/repos/pr_Repos/pr_otherDocument.repository";

@Injectable()
export class PRDocumentService {
  constructor(
    @InjectRepository(PRJustificationDocumentRepository)
    private readonly prJustificationDocumentRepo: PRJustificationDocumentRepository,
    @InjectRepository(PREXCODocumentRepository)
    private readonly prEXCODocumentRepo: PREXCODocumentRepository,
    @InjectRepository(PROtherDocumentRepository)
    private readonly prOtherDocumentRepo: PROtherDocumentRepository,
  ) { }
}