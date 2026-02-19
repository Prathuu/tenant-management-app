import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { MaintenanceStatus } from '@prisma/client';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  createMaintenance(@Body() dto: CreateMaintenanceDto) {
    return this.maintenanceService.createMaintenance(dto);
  }

  @Get()
  getAllMaintenance() {
    return this.maintenanceService.getAllMaintenanceRequests();
  }

  @Get(':id')
  getMaintenanceById(@Param('id', ParseIntPipe) id: number) {
    return this.maintenanceService.getMaintenanceById(id);
  }

  @Get('tenant/:tenantId')
  getTenantMaintenance(@Param('tenantId', ParseIntPipe) tenantId: number) {
    return this.maintenanceService.getMaintenanceByTenant(tenantId);
  }

  @Get('room/:roomId')
  getRoomMaintenance(@Param('roomId', ParseIntPipe) roomId: number) {
    return this.maintenanceService.getMaintenanceByRoom(roomId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: MaintenanceStatus,
  ) {
    return this.maintenanceService.updateStatus(id, status);
  }
}
