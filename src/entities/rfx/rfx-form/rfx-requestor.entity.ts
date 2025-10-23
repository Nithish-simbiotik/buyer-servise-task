import { DepartmentEntity } from 'src/entities/comon/department.entity';
import { UserEntity } from 'src/entities/comon/user.entity';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RfxEntity } from './rfx.entity';

@Entity()
export class RfxRequestorEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable:true})
  name: string
  @Column({ nullable: true })
  department: string;
  @Column({nullable:true})
  contactNo: string
  @Column({nullable:true})
  mobileNo: string
  @Column({nullable:true})
  emailAddress: string
  @Column({ nullable: true })
  rfxId:number
  @ManyToOne(() => RfxEntity, (rfx) => rfx.requestor, {
    onDelete: 'CASCADE',
    eager:false,
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  rfx: RfxEntity;
}
