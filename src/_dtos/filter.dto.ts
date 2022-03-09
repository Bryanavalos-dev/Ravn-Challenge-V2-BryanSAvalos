import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FilterDTO {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  limit: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  page: number;
}
