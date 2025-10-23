import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'internal_order_number' })
export class InternalOrderNumberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  status: string;

  @Column({ type: 'varchar', nullable: true })
  orderNumber: string;
}
