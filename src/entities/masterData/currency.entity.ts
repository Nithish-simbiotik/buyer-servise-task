import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'currency' })
export class CurrencyEntity {
  @PrimaryGeneratedColumn()
  currId: number;

  @Column({ type: 'varchar', nullable: true })
  currencyName: string;

  @Column({ type: 'varchar', nullable: true })
  isoCode: string;

  @Column({ type: 'varchar', nullable: true })
  alternativeKey: string;

  @Column({ nullable: true, type: 'timestamptz' })
  validUntil: Date;

  @Column({ type: 'float4' })
  primarySapCodeForIsoCode: number;

  @Column({ type: 'varchar', nullable: true })
  longText: string;

  @Column({ type: 'varchar', nullable: true })
  shortText: string;
}
