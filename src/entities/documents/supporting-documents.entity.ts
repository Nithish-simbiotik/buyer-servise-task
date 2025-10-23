import { RfxTemplateStatus, RfxTempModuleStatus } from 'src/enum/rfx/rfx.enum';
import { Attachment } from 'src/interface/common/rfx-attachment.interface';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../comon/user.entity';

@Entity({ name: 'supporting_documents' })
export class SupportingDocumentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  originalname: string;

  @Column({ type: 'varchar', nullable: true })
  filename: string;

  @Column({ type: 'varchar', nullable: true })
  path: string;

  @Column({ type: 'varchar', nullable: true })
  documentName: string;

  @Column({ type: 'varchar', nullable: true })
  module: RfxTempModuleStatus;

  @Column({ type: 'varchar', nullable: true })
  status: RfxTemplateStatus;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  modifiedAt?: Date;

  @Column({ nullable: true })
  createdById: number;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: UserEntity;

  @Column({ nullable: true })
  updatedById: number;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy: UserEntity;
}
