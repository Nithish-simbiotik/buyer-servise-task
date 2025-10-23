import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  // import { PreprEntity } from "./prepr.entity";
  
  @Entity({ name: 'uom' })
  export class UOMEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    name: string;
  
    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    status: string;
 
  }
  