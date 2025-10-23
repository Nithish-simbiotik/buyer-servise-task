import { SubmitType } from "src/enum/rfs/submitType.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { PreprCostCenterEntity } from "./prepr-cost-center.entity";
import { PreprEntity } from "./prepr.entity";

@Entity({ name: 'PREPR_NOTIFICATIONSHISTORY' })
export class PreprNotificationsHistoryEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number;

  @Column({nullable:true})
  reminderInterval: number;

  @Column({nullable:true})
  reminderFrequency: number;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  created_At: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updated_At: Date;

  @Column({ default: SubmitType.NOT_SUBMITED })
  status: SubmitType;

  @Column()
  totalLevels: number;

  @Column()
  userRole: string;

  @Column()
  departmentId: number;



  @ManyToOne(() => PreprEntity, (rfs) => rfs.notificationsHistory, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'preprId' })
  rfs: PreprEntity;

  @Column({ nullable: true })
  preprId: number;

  @Column({ nullable: true })
  remark: string;


}