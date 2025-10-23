import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PrListSearchEnum } from 'src/enum/prTemplate/prTemplates.enum';
import { RfxListSearchEnum } from 'src/enum/rfx/rfx.enum';

export class PagingDto {
  @ApiProperty({ required: false })
  keyword: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  size: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  page: number;

  constructor(search: string, size: number, page: number) {
    this.keyword = search;
    this.size = size;
    this.page = page;
  }
}
export class RfxColSearch extends PagingDto {
  @ApiProperty({ required: false })
  key: RfxListSearchEnum;
  @ApiProperty({ required: false })
  colKeyword: string | Date;
}
export class SearchDto {
  @ApiProperty({ required: false })
  keyword: string;

  @ApiProperty({ required: false })
  status: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  size: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  page: number;

  constructor(search: string, size: number, page: number) {
    this.keyword = search;
    this.size = size;
    this.page = page;
  }
}
export class RfxListFilterDto extends PagingDto {
  @ApiProperty({ required: false })
  fromDate: Date;
  @ApiProperty({ required: false })
  toDate: Date;
}
export class RfxTemplateDropDown {
  @ApiProperty({ required: false })
  eventType: string;
}
export class RfxSearchFilter extends PagingDto {
  @ApiProperty({ required: false })
  title: RfxListSearchEnum;
  createdAt: RfxListSearchEnum;
  @ApiProperty({ required: false })
  eventType: RfxListSearchEnum;
  @ApiProperty({ required: false })
  id: RfxListSearchEnum;
  @ApiProperty({ required: false })
  urgentJob: RfxListSearchEnum;
  @ApiProperty({ required: false })
  internalReferenceNumber: RfxListSearchEnum;
  @ApiProperty({ required: false })
  status: RfxListSearchEnum;
  @ApiProperty({ required: false })
  sourcingProposalStatus: RfxListSearchEnum;
  @ApiProperty({ required: false })
  eventStartDate: RfxListSearchEnum;
  @ApiProperty({ required: false })
  closingDate: RfxListSearchEnum;
}

export class PaymentRemittanceFilterDto extends PagingDto {
  @ApiProperty({ required: false })
  fromDate: Date;
  @ApiProperty({ required: false })
  toDate: Date;
  @ApiProperty({ required: false })
  purchaseOrg: string;
}

/**======================
 *    PR TEMPLATE
 *========================**/
export class PrTempateColSearch extends PagingDto {
  @ApiProperty({ required: false })
  key: PrListSearchEnum;
  @ApiProperty({ required: false })
  colKeyword: string | Date;
}
