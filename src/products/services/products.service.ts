import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filter } from 'rxjs';
import { ResponseListDTO } from '../../_dtos/responseList.dto';
import { ProductsFiltersDTO } from '../dtos/products.filter.dto';
import { Products } from '../entities/products.entity';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productRepository: ProductsRepository,
  ) {}

  async getProducts(
    filter: ProductsFiltersDTO,
  ): Promise<ResponseListDTO<Partial<Products>, number, number, number>> {
    const { data, count } = await this.productRepository.getProductsList(
      filter,
    );
    console.log(data.items);

    return {
      data,
      count,
      limit: filter.limit,
      page: filter.page,
    };
  }
}
