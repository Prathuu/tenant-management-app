import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @Roles('OWNER', 'MANAGER')
  createInvoice(@Body() dto: CreateInvoiceDto) {
    return this.invoiceService.createInvoice(dto);
  }

  @Get()
  @Roles('OWNER', 'MANAGER')
  getAllInvoices() {
    return this.invoiceService.getAllInvoices();
  }

  @Get(':id')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getInvoiceById(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceService.getInvoiceById(id);
  }

  @Get('tenant/:tenantId')
  getTenantInvoices(@Param('tenantId', ParseIntPipe) tenantId: number) {
    return this.invoiceService.getInvoicesByTenant(tenantId);
  }

  @Get('lease/:leaseId')
  getLeaseInvoices(@Param('leaseId', ParseIntPipe) leaseId: number) {
    return this.invoiceService.getInvoicesByLease(leaseId);
  }
}
