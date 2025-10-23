import { CreateRfxFormDto, UpdateRfxDto } from 'src/dto/rfx-form/create-rfx-form.dto';
import { RfxEntity } from 'src/entities/rfx/rfx-form/rfx.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RfxEntity)
export class RfxRepository extends Repository<RfxEntity> {
  constructor() {
    super();
  }
  async createRfx(dto: CreateRfxFormDto) {
    let rfx = this.create(dto);
    return await rfx.save();
  }
  async updateRfxForm(updateDto:UpdateRfxDto){
    let updatedRfx = this.create(updateDto)
    return await updatedRfx.save()
  }
}
