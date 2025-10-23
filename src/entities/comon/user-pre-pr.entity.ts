import {
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
  } from 'typeorm';
  import { UserEntity } from './user.entity';
  
  @Entity({ name: 'USER_PRE_PR' })
  export class UserPrePrEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', unique: false, nullable: true })
    PRE_PR_template_name: string;
  
    @ManyToOne(() => UserEntity, (ue) => ue.pre_pr)
    user: UserEntity;
  
    @Column({ nullable: true })
    PRE_PR_TEMPLATE_ID: number;
  }
  