import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'delivery_address' })
export class DeliveryAddressEntity {
  @PrimaryGeneratedColumn()
  addrId: number;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  addressLine1: string;

  @Column({ type: 'varchar', nullable: true })
  addressLine2: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  state: string;

  @Column({ type: 'float4' })
  zipCode: number;

  @Column({ type: 'varchar', nullable: true })
  country: string;

  @Column({ type: 'varchar', nullable: true })
  status: string;
}
