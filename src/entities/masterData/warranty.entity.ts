import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  // import { PreprEntity } from "./prepr.entity";
  
  @Entity({ name: 'warranty' })
  export class WarrantyEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    title: string;
  
    @Column({ nullable: true })
    status: string;
 
  }
  