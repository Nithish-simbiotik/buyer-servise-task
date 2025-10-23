import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class RfxTemplateQuestionnaireDto {
  @ApiPropertyOptional()
  @IsOptional()
  setName: string;

  @ApiPropertyOptional()
  @IsOptional()
  sections: RfxQuestionnaireSectionDto[];
}

export class QuestionAttachementDto {
  @ApiPropertyOptional({ default: 'original name' })
  fileOriginalName: string;

  @ApiPropertyOptional({ default: 'original name' })
  filePath: string;

  @ApiPropertyOptional({ default: 'original name' })
  availability: string;

  @ApiPropertyOptional({ default: 'original name' })
  description: string;
}

export class RfxQuestionnaireSectionDto {
  @ApiPropertyOptional()
  @IsOptional()
  sNo: number;

  @ApiPropertyOptional()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  questions: QuestionDto[];
}

export enum AnswerType {
  CHOICE = 'choice',

  CHOICE_WITH_SCORE = 'choice with score',

  TEXT = 'text',

  CHECKBOX = 'checkbox',

  DATE = 'date',

  NUMBER = 'number',
}

export class AnswerChoiceDto {
  @ApiPropertyOptional()
  @IsOptional()
  choiceType: AnswerType;

  @ApiPropertyOptional()
  @IsOptional()
  choiceName: string;

  @ApiPropertyOptional()
  @IsOptional()
  optionScore: number;

  @ApiPropertyOptional()
  @IsOptional()
  optionValue: string;
}

export class QuestionDto {
  question: string;

  answerType: AnswerType;

  @ApiPropertyOptional()
  @IsOptional()
  evaluationMapping: string;

  @ApiPropertyOptional()
  @IsOptional()
  choices: string[];

  @ApiPropertyOptional()
  @IsOptional()
  scoreChoices: { score: number; value: string }[];

  @ApiPropertyOptional()
  @IsOptional()
  isRequired: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  canSupplierAttachDocument: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  isAttachmentRequired: boolean;

  @ApiPropertyOptional({ type: [QuestionAttachementDto] })
  @IsOptional()
  attachments: QuestionAttachementDto[];
}
