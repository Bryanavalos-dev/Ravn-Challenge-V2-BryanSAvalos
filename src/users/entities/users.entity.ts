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
import { UsersAddresses } from './users.addresses.entity';
import { UsersProfiles } from './users.roles.entity';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  unique: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  names: string;

  @Column({ type: 'varchar' })
  lastnames: string;

  @Column({ nullable: true, type: 'date' })
  dob: string;

  @Column({ default: true, type: 'boolean' })
  isActive: boolean;

  @Column({ nullable: true, type: 'varchar' })
  phone: string;

  @Column({ nullable: true, type: 'varchar' })
  cellphone: string;

  @CreateDateColumn({ select: false })
  createdAt: string;

  @UpdateDateColumn({ select: false })
  updatedAt: string;

  @OneToMany(() => UsersProfiles, (profile) => profile.users)
  rol: UsersProfiles;

  @OneToMany(() => UsersAddresses, (userAddresses) => userAddresses.user)
  userAddresses: UsersAddresses;
}