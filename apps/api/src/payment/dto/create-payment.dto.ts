import { IsInt, IsNumber, IsEnum } from 'class-validator';
import { PaymentType, PaymentStatus } from '@prisma/client';

export class CreatePaymentDto {
  @IsInt()
  invoiceId: number;

  @IsNumber()
  amount: number;

  @IsEnum(PaymentType)
  type: PaymentType;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
