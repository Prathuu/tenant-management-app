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
import { Roles } from '../auth/roles.decorator';
import { JwtUser } from '../auth/types/jwt-user.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Access } from '@/common/access/access.decorator';

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

  @Access('payment', 'id')
  @Get(':id')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getPaymentById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtUser,
  ) {
    return this.paymentService.getPaymentById(id);
  }

  @Access('tenant', 'id')
  @Get('tenant/:tenantId')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getTenantPayments(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @CurrentUser() user: JwtUser,
  ) {
    return this.paymentService.getPaymentsByTenant(tenantId);
  }

  @Access('invoice', 'id')
  @Get('invoice/:invoiceId')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getInvoicePayments(
    @Param('invoiceId', ParseIntPipe) invoiceId: number,
    @CurrentUser() user: JwtUser,
  ) {
    return this.paymentService.getPaymentsByInvoice(invoiceId);
  }
}
