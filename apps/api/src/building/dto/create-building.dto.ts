import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsInt,
} from 'class-validator';
import { WaterSource } from '@prisma/client';

export class CreateBuildingDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  ownerName: string;

  @IsOptional()
  @IsString()
  ownerPhone?: string;

  @IsOptional()
  @IsString()
  ownerEmail?: string;

  @IsOptional()
  @IsBoolean()
  hasLift?: boolean;

  @IsOptional()
  @IsInt()
  parkingSlots?: number;

  @IsOptional()
  @IsBoolean()
  powerBackup?: boolean;

  @IsOptional()
  @IsEnum(WaterSource)
  waterSource?: WaterSource;

  @IsOptional()
  @IsBoolean()
  securityAvailable?: boolean;
}
