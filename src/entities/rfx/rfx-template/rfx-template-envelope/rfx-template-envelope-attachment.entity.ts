import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RfxTemplateEnvelopeAttachementEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  fileOriginalName: string;
  @Column({ nullable: true })
  filePath: string;
  @Column({ nullable: true })
  availability: string;
  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;
  @Column({ nullable: true })
  offset: number;
  @Column({ nullable: true })
  description: string;
}
