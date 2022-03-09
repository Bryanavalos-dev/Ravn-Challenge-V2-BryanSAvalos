import { UsersAddresses } from '../../users/entities/users.addresses.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SystemStates } from './system.states.entity';

@Entity()
export class SystemCountries extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @CreateDateColumn({ select: false })
  createdAt: string;

  @UpdateDateColumn({ select: false })
  updatedAt: string;

  @OneToMany(() => UsersAddresses, (user) => user.country)
  userAddresses: UsersAddresses[];

  @OneToMany(() => SystemStates, (state) => state.country)
  states: SystemStates[];
}
