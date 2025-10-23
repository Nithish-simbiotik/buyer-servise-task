import { IsEnum, IsOptional } from 'class-validator';
import { RfxTemplateStatus, RfxTempModuleStatus } from 'src/enum/rfx/rfx.enum';
import { Attachment } from 'src/interface/common/rfx-attachment.interface';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { GeneralFile } from 'src/interface/common/rfx-attachment.interface';

export class SupportingDocCreationDto {
  @ApiPropertyOptional()
  id?: number;
  @ApiPropertyOptional()
  @IsOptional()
  documentName: string;
  @ApiPropertyOptional()
  @IsOptional()
  // @IsEnum(RfxTempModuleStatus)
  module: RfxTempModuleStatus;
  @ApiPropertyOptional()
  @IsOptional()
  // @IsEnum(RfxTemplateStatus)
  status: RfxTemplateStatus;
  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  uploadFile: Attachment;
  @IsOptional()
  originalname?: string;
  @IsOptional()
  filename?: string;
  @IsOptional()
  path?: string;

  @ApiPropertyOptional()
  @IsOptional()
  createdById: number;

  @ApiPropertyOptional()
  @IsOptional()
  updatedById: number;
}

// export class DocUpdateDto {
//   @ApiPropertyOptional()
//   documentName: string;

//   @ApiPropertyOptional()
//   module: RfxTempModuleStatus;

//   @ApiPropertyOptional()
//   status: RfxTemplateStatus;

//   id?: number;
// }

export class DocUpdateDto extends PartialType(SupportingDocCreationDto) {}
export class UpdatedDto {
  @ApiPropertyOptional({ type: [DocUpdateDto] })
  docData: DocUpdateDto[];
}
export class SingleFileUploaderDto {
  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  file: Express.Multer.File;
}
export class MultipleFileUploaderDto {
  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  file: Express.Multer.File[];
}
