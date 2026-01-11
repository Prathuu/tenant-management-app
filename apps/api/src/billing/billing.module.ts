import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

/**
 * BillingModule
 * -------------
 * Responsible for:
 * - Bill generation
 * - Rent & utility tracking
 * - Payments
 */
@Module({
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
