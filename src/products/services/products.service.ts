import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ResponseListDTO,
  ResponseMinimalDTO,
} from '../../_dtos/responseList.dto';
import { ProductsCreateDTO } from '../dtos/products.create.dto';
import { ProductsFiltersDTO } from '../dtos/products.filter.dto';
import { Products } from '../entities/products.entity';
import { ProductsRepository } from '../repositories/products.repository';
import * as generateUniqueId from 'generate-unique-id';
import { ProductsBrands } from '../entities/products.brand.entity';

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

    return {
      data,
      count,
      limit: filter.limit,
      page: filter.page,
    };
  }

  async createProduct(data: ProductsCreateDTO): Promise<ResponseMinimalDTO> {
    let unique;
    let productsWUnique;
    do {
      unique = generateUniqueId({ length: 10 }).toUpperCase();
      productsWUnique = await this.productRepository.getProductsByUnique(
        unique,
      );
    } while (productsWUnique.length > 0);

    const dataToInsert = {
      ...data,
      quantityAvailable: data.initialQuantity,
      unique,
      brand: data.brand as unknown as ProductsBrands,
      category: data.category as unknown as ProductsBrands,
    };

    const { id } = await this.productRepository.createProduct(dataToInsert);

    return {
      id,
      message: 'The product was been create successfully.',
    };
  }
}
