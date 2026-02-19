import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { PersonRelation } from '@prisma/client';

export class AddPersonDto {
  @IsString()
  fullName: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsEnum(PersonRelation)
  relation?: PersonRelation;
}
