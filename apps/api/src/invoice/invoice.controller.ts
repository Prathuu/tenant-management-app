import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  createInvoice(@Body() dto: CreateInvoiceDto) {
    return this.invoiceService.createInvoice(dto);
  }

  @Get()
  getAllInvoices() {
    return this.invoiceService.getAllInvoices();
  }

  @Get(':id')
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
