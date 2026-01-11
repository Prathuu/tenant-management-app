import { IsInt, IsString } from 'class-validator';

/**
 * DTO for creating a Floor
 */
export class CreateFloorDto {
  @IsString()
  name: string; // GROUND, SECOND, THIRD

  @IsInt()
  code: number; // 0, 2, 3, 4

  @IsInt()
  roomCount: number;
}
