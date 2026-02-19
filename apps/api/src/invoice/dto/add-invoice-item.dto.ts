import { IsString, IsNumber, IsEnum } from 'class-validator';
import { PaymentType } from '@prisma/client';

export class AddInvoiceItemDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsEnum(PaymentType)
  type: PaymentType;
}
