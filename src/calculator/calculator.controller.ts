import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculateParamsDTO } from './dto';

@Controller('calculate')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}
  @Post()
  async onCalculate(
    @Body() calculateParamsDTO: CalculateParamsDTO,
  ): Promise<any> {
    console.log(calculateParamsDTO);
    return await this.calculatorService.calculator(
      calculateParamsDTO.price_before_discount,
      calculateParamsDTO.discount,
      calculateParamsDTO.price_after_discount,
      calculateParamsDTO.saved,
    );
  }
}
