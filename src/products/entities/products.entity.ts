import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductsBrands } from './products.brand.entity';
import { ProductsCategories } from './products.categories.entity';

@Entity()
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  unique: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @Column({ type: 'int', nullable: false })
  quantityAvailable: number;

  @Column({ type: 'int', nullable: false })
  initialQuantity: number;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'boolean', nullable: false })
  isActiveProduct: boolean;

  @CreateDateColumn({ select: false })
  createdAt: string;

  @UpdateDateColumn({ select: false })
  updateddAt: string;

  @OneToMany(() => ProductsCategories, (category) => category.products)
  category: ProductsCategories;

  @OneToMany(() => ProductsBrands, (category) => category.products)
  brand: ProductsBrands;
}
