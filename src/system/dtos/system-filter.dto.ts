import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class SystemFilterDTO {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  country: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  state: number;
}
