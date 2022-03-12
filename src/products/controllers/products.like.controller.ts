import { Controller } from '@nestjs/common';
import { ProductsLikedService } from '../services/products.like.service';

@Controller('/liked')
export class ProductsController {
  constructor(private productsLikedService: ProductsLikedService) {}
}
