import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SystemCities } from './system.cities.entity';
import { SystemCountries } from './system.countries.entity';
import { UsersAddresses } from '../../users/entities/users.addresses.entity';

@Entity()
export class SystemStates extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @CreateDateColumn({ select: false })
  createdAt: string;

  @UpdateDateColumn({ select: false })
  updatedAt: string;

  @OneToMany(() => UsersAddresses, (user) => user.state)
  userAddresses: UsersAddresses[];

  @OneToMany(() => SystemCities, (city) => city.state)
  cities: SystemCities[];

  @ManyToOne(() => SystemCountries, (country) => country.states)
  country: SystemCountries;
}
