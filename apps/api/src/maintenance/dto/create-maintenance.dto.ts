import { IsInt, IsString, IsEnum, IsOptional } from 'class-validator';
import { MaintenancePriority } from '@prisma/client';

export class CreateMaintenanceDto {
  @IsInt()
  tenantId: number;

  @IsInt()
  roomId: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(MaintenancePriority)
  priority: MaintenancePriority;

  @IsOptional()
  @IsString()
  notes?: string;
}
