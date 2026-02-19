import { IsNumber, IsDateString } from 'class-validator';

export class CreateLeaseDto {
  @IsNumber()
  tenantRoomId: number;

  @IsNumber()
  rentAmount: number;

  @IsNumber()
  depositAmount: number;

  @IsDateString()
  startDate: string;
}
