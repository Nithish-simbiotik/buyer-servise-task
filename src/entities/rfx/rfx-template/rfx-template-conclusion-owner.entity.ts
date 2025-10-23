import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RfxTemplateEntity } from './rfx-template.entity';

@Entity()
export class RfxTemplateConclusionOwnerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(
    () => RfxTemplateEntity,
    (rfxTemplate) => rfxTemplate.conclusionOwners,
    {
      onDelete: 'SET NULL',
      orphanedRowAction:'delete'
    },
  )
  rfxTemplate: RfxTemplateEntity;
}
