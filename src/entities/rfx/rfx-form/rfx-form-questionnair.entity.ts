import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RfxFormQuestionnairSectionEntity } from "./rfx-form-questionnair-section.entity";
import { RfxEntity } from "./rfx.entity";


@Entity()

export class RfxFormQuestionnairEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({nullable:true})
    setName: string;
  
    @OneToMany(
      () => RfxFormQuestionnairSectionEntity,
      (section) => section.rfxQuestionnaire,{cascade:true,eager:true,onDelete:'CASCADE'}
    )
    sections: RfxFormQuestionnairSectionEntity[];
  
    @ManyToOne(
      () => RfxEntity,
      (rfx) => rfx.questionnaire,
      {
        eager:false,
        orphanedRowAction: 'delete'
      },
    )
    rfx: RfxEntity;
}
