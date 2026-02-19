import { IsString, IsOptional } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  fullName: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  email?: string;
}
