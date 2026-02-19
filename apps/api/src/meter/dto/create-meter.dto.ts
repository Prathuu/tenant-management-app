import { IsString } from 'class-validator';

export class CreateMeterDto {
  @IsString()
  meterNumber: string;
}
