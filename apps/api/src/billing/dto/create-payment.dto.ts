import { IsEnum, IsInt } from 'class-validator';
import { PaymentType } from '@prisma/client';

/**
 * DTO for recording a payment
 */
export class CreatePaymentDto {
  @IsInt()
  amount: number;

  @IsEnum(PaymentType)
  type: PaymentType;
}
