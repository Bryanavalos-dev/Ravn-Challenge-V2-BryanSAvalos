import {
  Controller,
  Get,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { CheckForCouplesGuard } from 'src/auth/auth.guards.decorator';
import { ResponseListDTO } from 'src/_dtos/responseList.dto';
import { ProductsFiltersDTO } from '../dtos/products.filter.dto';
import { Products } from '../entities/products.entity';
import { ProductsService } from '../services/products.service';

@Controller('/products')
@UseGuards()
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @UseGuards(CheckForCouplesGuard)
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getInvoices(
    @Query() filter: ProductsFiltersDTO,
  ): Promise<ResponseListDTO<Partial<Products>, number, number, number>> {
    const { data, count } = await this.productService.getProducts(filter);
    return new ResponseListDTO(
      plainToClass(Products, data),
      count,
      filter.page,
      filter.limit,
    );
  }
}
