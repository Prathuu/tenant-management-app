import { IsString, IsEnum } from 'class-validator';
import { MeterType } from '@prisma/client';

export class CreateMeterDto {
  @IsString()
  meterNumber: string;

  @IsEnum(MeterType)
  type: MeterType;
}
