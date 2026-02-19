import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  createPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayment(dto);
  }

  @Get()
  getAllPayments() {
    return this.paymentService.getAllPayments();
  }

  @Get(':id')
  getPaymentById(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.getPaymentById(id);
  }

  @Get('tenant/:tenantId')
  getTenantPayments(@Param('tenantId', ParseIntPipe) tenantId: number) {
    return this.paymentService.getPaymentsByTenant(tenantId);
  }

  @Get('invoice/:invoiceId')
  getInvoicePayments(@Param('invoiceId', ParseIntPipe) invoiceId: number) {
    return this.paymentService.getPaymentsByInvoice(invoiceId);
  }
}
