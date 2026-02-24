import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './tenant/tenant.module';
import { PrismaModule } from '@prisma/prisma.module';
import { BuildingModule } from './building/building.module';
import { MeterModule } from './meter/meter.module';
import { LeaseModule } from './lease/lease.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PaymentModule } from './payment/payment.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt/jwt.guard';
import { RolesGuard } from './auth/roles/roles.guard';
import { AccessModule } from '@/common/access/access.module';

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
    AuthModule,
    AccessModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
