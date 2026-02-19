import { IsInt, IsDateString } from 'class-validator';

export class CreateInvoiceDto {
  @IsInt()
  tenantId: number;

  @IsInt()
  leaseId: number;

  @IsInt()
  billingMonth: number;

  @IsInt()
  billingYear: number;

  @IsDateString()
  dueDate: string;
}
