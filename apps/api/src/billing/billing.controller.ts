import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { GenerateBillDto } from './dto/generate-bill.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';

/**
 * BillingController
 * -----------------
 * HTTP routes for billing and payments
 */
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  // ============================
  // Bills
  // ============================

  @Post('tenants/:tenantId/bills')
  generateBill(
    @Param('tenantId') tenantId: string,
    @Body() dto: GenerateBillDto,
  ) {
    return this.billingService.generateBill(
      Number(tenantId),
      dto.month,
      dto.year,
    );
  }

  @Get('tenants/:tenantId/bills')
  getBills(@Param('tenantId') tenantId: string) {
    return this.billingService.getBillsByTenant(Number(tenantId));
  }

  // ============================
  // Payments
  // ============================

  @Post('tenants/:tenantId/payments')
  addPayment(
    @Param('tenantId') tenantId: string,
    @Body() dto: CreatePaymentDto,
  ) {
    return this.billingService.addPayment(Number(tenantId), dto);
  }
}
