import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { RfxFormStatus, SupplierStatus } from 'src/enum/rfx/rfx-form-status.enum';

export class RfxSupplierInvitationDto {
    @ApiPropertyOptional()
    @IsOptional()
    status?: SupplierStatus;
    @ApiPropertyOptional()
    @IsOptional()
    remark?: string;
    previewedDate?: Date;
    invitationActionDate?: Date;
    submitedDate?: Date;
    isPreviewed?: boolean;
    isAccepted?: boolean;
    isRejected?: boolean;
    isSubmited?: boolean;

}
