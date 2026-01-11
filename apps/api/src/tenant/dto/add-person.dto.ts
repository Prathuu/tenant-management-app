import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { PersonRelation } from '@prisma/client';

/**
 * DTO for adding a person under a tenant
 * (family member or roommate)
 */
export class AddPersonDto {
  @IsString()
  fullName: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsEnum(PersonRelation)
  relation?: PersonRelation;
}
