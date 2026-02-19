import { IsNumber } from 'class-validator';

export class AssignRoomDto {
  @IsNumber()
  roomId: number;

  @IsNumber()
  agreedRent: number;
}
