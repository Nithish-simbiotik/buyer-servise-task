import { Column, Entity } from 'typeorm';

@Entity({ name: 'decimal' })
export class DecimalEntity {
  @Column({ type: 'varchar', nullable: true })
  value: string;

  @Column({ type: 'varchar', nullable: true })
  status: string;
}
