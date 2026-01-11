import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';

/**
 * TenantModule
 * -------------
 * Handles:
 * - Tenant creation
 * - Person (family / roommates) management
 * - Room occupancy queries
 *
 * PrismaService is global, so no need to import PrismaModule here.
 */
@Module({
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
