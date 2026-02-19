import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @Roles('TENANT')
  createPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayment(dto);
  }

  @Get()
  @Roles('OWNER', 'MANAGER')
  getAllPayments() {
    return this.paymentService.getAllPayments();
  }

  @Get(':id')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getPaymentById(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.getPaymentById(id);
  }

  @Get('tenant/:tenantId')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getTenantPayments(@Param('tenantId', ParseIntPipe) tenantId: number) {
    return this.paymentService.getPaymentsByTenant(tenantId);
  }

  @Get('invoice/:invoiceId')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getInvoicePayments(@Param('invoiceId', ParseIntPipe) invoiceId: number) {
    return this.paymentService.getPaymentsByInvoice(invoiceId);
  }
}
