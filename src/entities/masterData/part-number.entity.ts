import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'part_number' })
export class PartNumberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  pirNumber: number;

  @Column({ nullable: true })
  materialNumber: number;

  @Column({ type: 'varchar', nullable: true })
  supplier: string;

  @Column({ type: 'varchar', nullable: true })
  currency: string;

  @Column({ type: 'float4' })
  unitPrice: string;

  @Column()
  uom: string;

  @Column({ type: 'varchar', nullable: true })
  status: string;

  @Column({ nullable: true, type: 'timestamptz' })
  validityEndDate: Date;
}
