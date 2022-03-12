import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsLikedRepository } from '../repositories/products.like.repository';

@Injectable()
export class ProductsLikedService {
  constructor(
    @InjectRepository(ProductsLikedRepository)
    private productsLikedRepository: ProductsLikedRepository,
  ) {}
}
