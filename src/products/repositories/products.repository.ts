import { logDatabaseError } from '../../_tools';
import { EntityRepository, Repository } from 'typeorm';
import { ProductsFiltersDTO } from '../dtos/products.filter.dto';
import { Products } from '../entities/products.entity';
import { paginateRaw } from 'nestjs-typeorm-paginate';

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
      return { data, count: 5 };
    } catch (error) {
      console.log(error);

      logDatabaseError('products', error);
    }
  }
}
