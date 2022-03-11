import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ResponseListDTO,
  ResponseMinimalDTO,
  ResponseSingleDTO,
} from '../../_dtos/responseList.dto';
import { ProductsCreateDTO } from '../dtos/products.create.dto';
import { ProductsFiltersDTO } from '../dtos/products.filter.dto';
import { Products } from '../entities/products.entity';
import { ProductsRepository } from '../repositories/products.repository';
import * as generateUniqueId from 'generate-unique-id';
import { ProductsBrands } from '../entities/products.brand.entity';
import { plainToInstance } from 'class-transformer';

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

  async getProductById(id: string): Promise<ResponseSingleDTO<Products>> {
    const product = await this.productRepository.getProductById(id);
    return new ResponseSingleDTO(plainToInstance(Products, product));
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

  async uploadImage(
    id: string,
    imageName: string,
  ): Promise<ResponseMinimalDTO> {
    const product = await this.productRepository.getProductById(id);

    await this.productRepository.updateProduct(id, {
      ...product,
      imageName,
    });

    return {
      message: 'The image was been save successfully.',
    };
  }

  async getProductImage(id: string): Promise<string> {
    const { imageName } = await this.productRepository.getProductById(id);

    return imageName;
  }

  async updateProduct(
    id: string,
    data: ProductsCreateDTO,
  ): Promise<ResponseMinimalDTO> {
    const product = await this.productRepository.getProductById(id);

    const updateData = {
      ...data,
      imageName: product.imageName ?? null,
      quantityAvailable: product.quantityAvailable + data.initialQuantity,
      initialQuantity:
        product.initialQuantity + data.initialQuantity < 0
          ? product.initialQuantity + product.initialQuantity
          : 0,
      brand: product.brand,
      category: product.category,
    };
    await this.productRepository.updateProduct(id, updateData);
    return {
      message: 'The product was been update susccessfully.',
    };
  }

  async deleteProduct(id: string): Promise<ResponseMinimalDTO> {
    await this.productRepository.getProductById(id);

    const result = await this.productRepository.deleteProduct(id);
    if (result.affected == 0) {
      throw new BadRequestException('Something went worng.');
    }

    return {
      message: 'The prodcut was been delete successfully.',
    };
  }
}
