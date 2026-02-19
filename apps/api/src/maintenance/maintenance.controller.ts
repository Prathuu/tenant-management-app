import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { MaintenanceStatus } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  @Roles('TENANT')
  createMaintenance(@Body() dto: CreateMaintenanceDto) {
    return this.maintenanceService.createMaintenance(dto);
  }

  @Get()
  @Roles('OWNER', 'MANAGER')
  getAllMaintenance() {
    return this.maintenanceService.getAllMaintenanceRequests();
  }

  @Get(':id')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getMaintenanceById(@Param('id', ParseIntPipe) id: number) {
    return this.maintenanceService.getMaintenanceById(id);
  }

  @Get('tenant/:tenantId')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getTenantMaintenance(@Param('tenantId', ParseIntPipe) tenantId: number) {
    return this.maintenanceService.getMaintenanceByTenant(tenantId);
  }

  @Get('room/:roomId')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getRoomMaintenance(@Param('roomId', ParseIntPipe) roomId: number) {
    return this.maintenanceService.getMaintenanceByRoom(roomId);
  }

  @Patch(':id/status')
  @Roles('OWNER', 'MANAGER')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: MaintenanceStatus,
  ) {
    return this.maintenanceService.updateStatus(id, status);
  }
}
