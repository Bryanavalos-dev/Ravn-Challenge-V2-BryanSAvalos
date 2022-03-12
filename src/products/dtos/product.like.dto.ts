import { IsBoolean, IsBooleanString, IsNotEmpty } from 'class-validator';

export class ProductsLikeDTO {
  @IsNotEmpty()
  @IsBooleanString()
  liked: boolean;
}
