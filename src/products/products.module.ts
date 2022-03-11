import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsRepository } from './repositories/products.repository';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ProductsRepository])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
