import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './tenant/tenant.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BuildingModule } from './building/building.module';
import { MeterModule } from './meter/meter.module';
import { LeaseModule } from './lease/lease.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PaymentModule } from './payment/payment.module';
import { MaintenanceModule } from './maintenance/maintenance.module';

@Module({
  imports: [
    PrismaModule,
    BuildingModule,
    TenantModule,
    MeterModule,
    LeaseModule,
    InvoiceModule,
    PaymentModule,
    MaintenanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
