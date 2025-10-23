import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { PreprEntity } from "./prepr.entity";

@Entity({ name: 'part_number' })
export class PartNumberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  pir_number: number;

  @Column({ nullable: true })
  material_number: string;

  @Column({ nullable: true })
  supplier: string;

  @Column({ nullable: true })
  currency: string;

  @Column({ type: 'float4' })
  unit_price: number;

  @Column({ nullable: true })
  uom: string;

  //   @Column({nullable:true})
  //   validity_end_date:Date;

  @Column()
  status: string;
}
