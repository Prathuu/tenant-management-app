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
import { Roles } from '../auth/roles.decorator';
import { JwtUser } from '../auth/types/jwt-user.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Access } from '@/common/access/access.decorator';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @Roles('OWNER', 'MANAGER')
  createInvoice(@Body() dto: CreateInvoiceDto, @CurrentUser() user: JwtUser) {
    return this.invoiceService.createInvoice(dto, user);
  }

  @Get()
  @Roles('OWNER', 'MANAGER')
  getAllInvoices(@CurrentUser() user: JwtUser) {
    return this.invoiceService.getAllInvoices(user);
  }

  @Access('invoice', 'id')
  @Get(':id')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getInvoiceById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtUser,
  ) {
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
