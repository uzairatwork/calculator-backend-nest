import { IsNumber, IsOptional } from 'class-validator';

export class CalculateParamsDTO {
  @IsNumber()
  price_before_discount: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsNumber()
  price_after_discount?: number;

  @IsOptional()
  @IsNumber()
  saved?: number;
}
