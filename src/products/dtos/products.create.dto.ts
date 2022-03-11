import { Transform } from 'class-transformer';
import {
  IsBooleanString,
  IsHexColor,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class ProductsCreateDTO {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  initialQuantity: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsNotEmpty()
  @IsBooleanString()
  isAvailable: boolean;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  category: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  brand: number;
}
