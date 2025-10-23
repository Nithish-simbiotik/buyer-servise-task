import { ApiProperty } from "@nestjs/swagger";

export interface Attachment {
    originalname?: string;
    filename?: string;
    path?: string;
}
export interface GeneralFile {
    path: string;
    filename: string;
    originalname: string;
    fieldname?: string;
    size?: number;
    createdDate?:Date;
}
export class GeneralFileDto {
    @ApiProperty({ required: false })
    filename: string;
    @ApiProperty({ required: false })
    originalname: string;

}