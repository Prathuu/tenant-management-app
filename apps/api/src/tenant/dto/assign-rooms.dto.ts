import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

/**
 * DTO for assigning one or more rooms to a tenant
 */
export class AssignRoomsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  roomIds: number[];
}
