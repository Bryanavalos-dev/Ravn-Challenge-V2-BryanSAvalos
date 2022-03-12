import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import {
  CheckForCouplesGuard,
  CheckForPermissionGuard,
} from '../../auth/auth.guards.decorator';
import {
  ResponseListDTO,
  ResponseMinimalDTO,
  ResponseSingleDTO,
} from '../../_dtos/responseList.dto';
import { ProductsCreateDTO } from '../dtos/products.create.dto';
import { ProductsFiltersDTO } from '../dtos/products.filter.dto';
import { Products } from '../entities/products.entity';
import { ProductsService } from '../services/products.service';
import { diskStorage } from 'multer';
import { fileFilter, fileName } from '../helpers/images.helpers';
import { GetUserData } from '../../auth/auth.getUserData.decorator';
import { Users } from '../../users/entities/users.entity';
import { GetAuthData } from 'src/auth/auth.getData.decorator';

@Controller('/products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  @UseGuards(CheckForCouplesGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getProducts(
    @Query() filter: ProductsFiltersDTO,
    @GetAuthData({ data: 'user', logged: false }) user?: Users,
  ): Promise<ResponseListDTO<Partial<Products>, number, number, number>> {
    const { data, count } = await this.productService.getProducts(filter, user);
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
    return this.productService.createProduct(data);
  }

  @Post('/:id/upload-image')
  @UseGuards(AuthGuard(), CheckForPermissionGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: fileName,
      }),
      fileFilter: fileFilter,
    }),
  )
  async uploadImagePerProduct(
    @Param('id') productId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseMinimalDTO> {
    if (!file) {
      throw new BadRequestException('The file must been required.');
    }

    return this.productService.uploadImage(productId, file.filename);
  }

  @Get('/:id/product-image')
  async getProductImage(
    @Param('id') productId: string,
    @Res() res,
  ): Promise<any> {
    const imageName = await this.productService.getProductImage(productId);
    res.sendFile(imageName, { root: `./public` });
  }

  @Get('/:id')
  async getProductByID(
    @Param('id') productId: string,
  ): Promise<ResponseSingleDTO<Products>> {
    return this.productService.getProductById(productId);
  }

  @Put('/:id')
  @UseGuards(AuthGuard(), CheckForPermissionGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateProduct(
    @Param('id') id: string,
    @Body() data: ProductsCreateDTO,
  ): Promise<ResponseMinimalDTO> {
    return this.productService.updateProduct(id, data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), CheckForPermissionGuard)
  async deleteProduct(@Param('id') id: string): Promise<ResponseMinimalDTO> {
    return this.productService.deleteProduct(id);
  }
}
