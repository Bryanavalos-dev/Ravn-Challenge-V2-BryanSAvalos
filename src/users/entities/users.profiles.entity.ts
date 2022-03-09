import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class UsersProfiles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'json' })
  permissions: string;

  @CreateDateColumn({ select: false })
  createdAt: string;

  @ManyToOne(() => Users, (user) => user.profile)
  users: Users[];
}
