import { SystemCities } from 'src/system/entities/system.cities.entity';
import { SystemCountries } from 'src/system/entities/system.countries.entity';
import { SystemStates } from 'src/system/entities/system.states.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class UsersAddresses extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  address1: string;

  @Column({ nullable: true, type: 'varchar' })
  address2: string;

  @Column({ default: true, type: 'boolean' })
  default: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ select: false })
  updatedAt: string;

  @ManyToOne(() => SystemCities, (city) => city.userAdresses)
  city: SystemCities;

  @ManyToOne(() => SystemCountries, (country) => country.userAddresses)
  country: SystemCountries;

  @ManyToOne(() => SystemStates, (state) => state.userAddresses)
  state: SystemStates;

  @ManyToOne(() => Users, (user) => user.userAddresses, {
    onDelete: 'CASCADE',
  })
  user: Users;
}
