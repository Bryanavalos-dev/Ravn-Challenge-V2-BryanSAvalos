import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controllers/products.controller';
import { ProductsRepository } from './repositories/products.repository';
import { ProductsService } from './services/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsRepository])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
