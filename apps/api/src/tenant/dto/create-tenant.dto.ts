import { IsEmail, IsOptional, IsString } from 'class-validator';

/**
 * DTO for creating a Tenant
 * Represents the primary rent-paying entity
 */
export class CreateTenantDto {
  @IsString()
  fullName: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
