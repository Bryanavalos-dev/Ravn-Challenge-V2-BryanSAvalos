import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import {
  CheckForCouplesGuard,
  CheckForPermissionGuard,
} from 'src/auth/auth.guards.decorator';
import {
  ResponseListDTO,
  ResponseMinimalDTO,
} from '../../_dtos/responseList.dto';
import { ProductsCreateDTO } from '../dtos/products.create.dto';
import { ProductsFiltersDTO } from '../dtos/products.filter.dto';
import { Products } from '../entities/products.entity';
import { ProductsService } from '../services/products.service';

@Controller('/products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  @UseGuards(CheckForCouplesGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getInvoices(
    @Query() filter: ProductsFiltersDTO,
  ): Promise<ResponseListDTO<Partial<Products>, number, number, number>> {
    const { data, count } = await this.productService.getProducts(filter);
    return new ResponseListDTO(
      plainToInstance(Products, data),
      count,
      filter.page,
      filter.limit,
    );
  }

  @Post()
  @UseGuards(AuthGuard(), CheckForPermissionGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createProducts(
    @Body() data: ProductsCreateDTO,
  ): Promise<ResponseMinimalDTO> {
    return { message: 'ola' };
  }
}
