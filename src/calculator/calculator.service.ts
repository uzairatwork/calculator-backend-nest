import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  constructor() {}

  async calculator(
    price_before_discount: number | undefined,
    discount: number | undefined,
    price_after_discount: number | undefined,
    saved: number | undefined,
  ): Promise<{ status: boolean; statusCode: number; data: object }> {
    try {
      if (
        price_before_discount !== undefined &&
        discount !== undefined &&
        price_after_discount === undefined &&
        saved === undefined
      ) {
        price_after_discount = price_before_discount - (price_before_discount * discount) / 100;
        saved = price_before_discount - price_after_discount;
      } else if (
        price_before_discount !== undefined &&
        discount === undefined &&
        price_after_discount !== undefined &&
        saved === undefined
      ) {
        discount = ((price_before_discount - price_after_discount) / price_before_discount) * 100;
        saved = price_before_discount - price_after_discount;
      } else if (
        price_before_discount !== undefined &&
        discount === undefined &&
        price_after_discount === undefined &&
        saved !== undefined
      ) {
        price_after_discount = price_before_discount - saved;
        discount = ((price_before_discount - price_after_discount) / price_before_discount) * 100;
      } else if (
        price_before_discount === undefined &&
        discount !== undefined &&
        price_after_discount !== undefined &&
        saved === undefined
      ) {
        price_before_discount = (price_after_discount / (100 - discount)) * 100;
        saved = price_before_discount - price_after_discount;
      } else if (
        price_before_discount === undefined &&
        discount !== undefined &&
        price_after_discount === undefined &&
        saved !== undefined
      ) {
        price_after_discount = price_before_discount - saved;
        price_before_discount = (price_after_discount / (100 - discount)) * 100;
      } else if (
        price_before_discount === undefined &&
        discount !== undefined &&
        price_after_discount !== undefined &&
        saved === undefined
      ) {
        saved = price_before_discount - price_after_discount;
        price_before_discount = (price_after_discount / (100 - discount)) * 100;
      } else if (
        price_before_discount === undefined &&
        discount === undefined &&
        price_after_discount !== undefined &&
        saved !== undefined
      ) {
        price_before_discount = price_after_discount + saved;
        discount = ((price_before_discount - price_after_discount) / price_before_discount) * 100;
      } else if (
        price_before_discount !== undefined &&
        discount === undefined &&
        price_after_discount !== undefined &&
        saved !== undefined
      ) {
        discount = ((price_before_discount - price_after_discount) / price_before_discount) * 100;
        price_before_discount = price_after_discount + saved;
      } else if (
        price_before_discount !== undefined &&
        discount !== undefined &&
        price_after_discount === undefined &&
        saved !== undefined
      ) {
        price_after_discount = price_before_discount - saved;
      } else if (
        price_before_discount === undefined &&
        discount !== undefined &&
        price_after_discount !== undefined &&
        saved !== undefined
      ) {
        price_before_discount = this.calculatePriceBeforeDiscount(price_after_discount, discount, saved);
      } else {
        throw new BadRequestException(
          'At least one of price_before_discount, discount, price_after_discount, or saved is required.',
        );
      }

      const data = {
        price_before_discount: +price_before_discount.toFixed(2),
        discount: +discount.toFixed(2),
        price_after_discount: +price_after_discount.toFixed(2),
        saved: +saved.toFixed(2),
      };

      return { status: true, statusCode: 200, data };
    } catch (error) {
      return { status: false, statusCode: 400, data: { error: error.message } };
    }
  }

  private calculatePriceBeforeDiscount(
    price_after_discount: number,
    discount: number,
    saved: number,
  ): number {
    // Calculate the price before discount using the provided values
    // Replace this with your calculation logic
    return (price_after_discount + saved) / (1 - discount / 100);
  }
}
