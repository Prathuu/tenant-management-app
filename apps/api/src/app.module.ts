import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildingModule } from './building/building.module';
import { TenantModule } from './tenant/tenant.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [PrismaModule, BuildingModule, TenantModule, BillingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
