import { UsersAddresses } from '../../users/entities/users.addresses.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SystemStates } from './system.states.entity';

@Entity()
export class SystemCities extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @CreateDateColumn({ select: false })
  createdAt: string;

  @UpdateDateColumn({ select: false })
  updatedAt: string;

  @OneToMany(() => UsersAddresses, (user) => user.city)
  userAdresses: UsersAddresses[];

  @ManyToOne(() => SystemStates, (state) => state.cities)
  @JoinColumn([{ name: 'stateId', referencedColumnName: 'id' }])
  state: SystemStates;
}
