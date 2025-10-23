import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RFSTemplateEntity } from './preprTemplate.entity';

@Entity({ name: 'PREPRTEMPLATE_LEVEL' })
export class RfsTemplateLevelsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  level: number;

  @Column({ nullable: true })
  levelName: string;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  userRole: string;

  @Column({ nullable: true })
  departmentId: number;

  @ManyToOne(() => RFSTemplateEntity, (rfsTemplate) => rfsTemplate.levels, {
    onDelete: 'CASCADE',
  })
  rfsTemplate: RFSTemplateEntity;
}
