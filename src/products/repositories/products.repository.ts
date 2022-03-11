import { logDatabaseError } from '../../_tools';
import { EntityRepository, Repository } from 'typeorm';
import { ProductsFiltersDTO } from '../dtos/products.filter.dto';
import { Products } from '../entities/products.entity';
import { paginateRaw } from 'nestjs-typeorm-paginate';
import { Logger } from '@nestjs/common';
import { ProductsBaseDTO } from '../dtos/products.base.dto';

const logger = new Logger('Products');

@EntityRepository(Products)
export class ProductsRepository extends Repository<Products> {
  async getProductsList(
    filter: ProductsFiltersDTO,
  ): Promise<{ data: any; count }> {
    try {
      const { limit, page, categories } = filter;

      const products = this.createQueryBuilder('p')
        .leftJoinAndSelect('p.category', 'category')
        .leftJoinAndSelect('p.brand', 'brand')
        .orderBy('p.quantityAvailable', 'DESC')
        .addOrderBy('p.isAvailable', 'DESC')
        .groupBy('p.id')
        .addGroupBy('category.id')
        .addGroupBy('brand.id');

      //filter by cateogries
      if (categories?.length > 0) {
        products.andWhere('category.id in (:...categories)', { categories });
      }
      const count = await products.getCount();
      const data = await paginateRaw<Products>(products, {
        limit: limit ? limit : null,
        page: page ? page : null,
      });
      return {
        data: data.items.map((d) => {
          const pkeys = Object.keys(d).filter((k) => k.startsWith('p_'));
          const ckeys = Object.keys(d).filter((k) => k.startsWith('category_'));
          const bkeys = Object.keys(d).filter((k) => k.startsWith('brand_'));
          const root: Partial<Products> = {};
          const products = {};
          const category = {};
          const brand = {};
          for (const v of pkeys) {
            root[v.replace('p_', '')] = d[v];
          }
          for (const v of ckeys) {
            category[v.replace('category_', '')] = d[v];
          }
          for (const v of bkeys) {
            brand[v.replace('brand_', '')] = d[v];
          }

          return {
            ...root,
            category,
            brand,
          };
        }),
        count,
      };
    } catch (error) {
      logger.error(error);
      logDatabaseError('products', error);
    }
  }

  async createProduct(data: ProductsBaseDTO): Promise<Products> {
    let response: Products;
    try {
      const createdProduct = this.create({ ...data });
      response = await this.save(createdProduct);
    } catch (error) {
      logger.error(error);
    }
    return response;
  }

  async getProductsByUnique(unique: string): Promise<Products[]> {
    try {
      return this.find({ where: { unique } });
    } catch (error) {
      logger.error(error);
    }
  }
}
