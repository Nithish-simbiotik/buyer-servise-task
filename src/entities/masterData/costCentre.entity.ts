import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  // import { PreprEntity } from "./prepr.entity";
  
  @Entity({ name: 'cost_center' })
  export class CostCenterEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    code: string;
  
    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    companycode: string;

    @Column({ nullable: true })
    status: string;
 
  }
  