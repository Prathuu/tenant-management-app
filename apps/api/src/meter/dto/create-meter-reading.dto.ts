import { IsNumber } from 'class-validator';

export class CreateMeterReadingDto {
  @IsNumber()
  reading: number;
}
