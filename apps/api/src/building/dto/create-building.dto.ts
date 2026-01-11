import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { WaterSource } from '@prisma/client';

/**
 * DTO for creating a Building
 */
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
  @IsInt()
  yearBuilt?: number;

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
