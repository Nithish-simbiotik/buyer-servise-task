import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PREntity } from "./pr.entity";

@Entity({ name: 'PR_OTHER_DOCUMENT' })
export class PrOtherDocumentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  originalname: string;

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ nullable: true })
  availabitly: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => PREntity, (pr) => pr.otherDocument, {
    onDelete: 'CASCADE',
    eager: false,
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  @JoinColumn()
  pr: PREntity;
}
