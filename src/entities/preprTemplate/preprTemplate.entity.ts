import { UrgentJobOption } from 'src/enum/rfsTemplate/UrgentJobOption';
import {
  Column,
  CreateDateColumn,
  Entity,
  IsNull,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RfsTemplateLevelsEntity } from './preprTemplate_Level.entity';
import { RfsTemplateTeamMemberEntity } from './preprTemplate_TeamMember.entity';

@Entity({ name: 'PREPRTEMPLATE' })
export class RFSTemplateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  templateName: string;

  @Column({ nullable: true })
  purchasingOrgId: number;

  @Column()
  purchasingOrg_readonly: boolean;

  @Column()
  purchasingOrg_visible: boolean;

  @Column({ nullable: true })
  departmentId: number;

  @Column({ nullable: true })
  departmentName: string;

  @Column()
  department_readonly: boolean;

  @Column()
  department_visible: boolean;

  // @Column({nullable:true})
  // urgent_job_readonly: boolean;

  @Column()
  urgent_job_visible: boolean;

  @Column({ nullable: true })
  urgentJobOption: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  baseCurrencyId: number;

  @Column()
  baseCurrency_readonly: boolean;

  @Column()
  baseCurrency_visible: boolean;

  @Column({ nullable: true })
  costCenterId: number;

  @Column()
  costCenter_readonly: boolean;

  @Column()
  costCenter_visible: boolean;

  @OneToMany(() => RfsTemplateTeamMemberEntity, (tm) => tm.rfsTemplate)
  teamMembers: RfsTemplateTeamMemberEntity[];

  @Column({ nullable: true })
  reminderAlert: boolean;

  @Column({ nullable: true })
  reminderInterval: number;

  @Column({ nullable: true })
  reminderFrequency: number;

  @Column({ nullable: true })
  reminderAlert_visible: boolean;

  @Column({ nullable: true })
  notifyMe: boolean;

  @Column({ nullable: true })
  addApprovalRouting: boolean;

  @Column({ nullable: true })
  approvalRouting_readonly: boolean;

  @Column({ nullable: true })
  approvalRouting_visible: boolean;

  @Column({ nullable: true })
  approvalRouting_optional: boolean;

  @OneToMany(() => RfsTemplateLevelsEntity, (tm) => tm.rfsTemplate)
  levels: RfsTemplateLevelsEntity[];

  @CreateDateColumn({
    type: 'timestamptz',
  })
  created_At: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_At: Date;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;
}
