import { Logger } from '@nestjs/common';
import { logDatabaseError } from '../../_tools';
import { EntityRepository, Repository } from 'typeorm';
import { ProductsLiked } from '../entities/products.likes.entity';

const logger = new Logger('ProductsLiked');

@EntityRepository(ProductsLiked)
export class ProductsLikedRepository extends Repository<ProductsLiked> {
  async getLikes(): Promise<ProductsLiked[]> {
    try {
      return this.find({
        join: {
          alias: 'l',
          leftJoinAndSelect: { p: 'l.product', u: 'l.user' },
        },
      });
    } catch (error) {
      logger.error(error);
      logDatabaseError('likes', error);
    }
  }
}
