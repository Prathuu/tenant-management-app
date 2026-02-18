import { IsString, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  roomNumber: string;

  @IsNumber()
  baseRent: number;
}
