import { Users } from '../../users/entities/users.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Products } from './products.entity';

@Entity()
export class ProductsLiked extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean' })
  liked: boolean;

  @CreateDateColumn({ select: false })
  createdAt: string;

  @UpdateDateColumn({ select: false })
  updateddAt: string;

  @ManyToOne(() => Products, (product) => product.like)
  product: Products;

  @ManyToOne(() => Users, (user) => user.like)
  user: Users;
}
