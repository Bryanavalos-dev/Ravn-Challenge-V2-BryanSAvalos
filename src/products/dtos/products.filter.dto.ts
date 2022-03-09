import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { FilterDTO } from '../../_dtos/filter.dto';
import { ProductsCategories } from '../entities/products.categories.entity';

export class ProductsFiltersDTO extends FilterDTO {
  @IsOptional()
  @Transform(({ value }) => {
    try {
      return JSON.parse(value).map((v) => parseInt(v));
    } catch (error) {
      throw new BadRequestException('The field must be a json');
    }
  })
  @IsInt({ each: true })
  categories: number[];
}
