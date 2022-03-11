import { ProductsBrands } from '../entities/products.brand.entity';
import { ProductsCategories } from '../entities/products.categories.entity';

export class ProductsBaseDTO {
  unique?: string;
  name: string;
  description: string;
  color: string;
  quantityAvailable?: number;
  initialQuantity: number;
  price: number;
  isAvailable: boolean;
  category: ProductsCategories;
  brand: ProductsBrands;
}
