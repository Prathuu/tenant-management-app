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
import { Roles } from '../auth/roles.decorator';
import { JwtUser } from '../auth/types/jwt-user.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Access } from '@/common/access/access.decorator';

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

  @Access('maintenance', 'id')
  @Get(':id')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getMaintenanceById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtUser,
  ) {
    return this.maintenanceService.getMaintenanceById(id);
  }

  @Access('tenant', 'id')
  @Get('tenant/:tenantId')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getTenantMaintenance(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @CurrentUser() user: JwtUser,
  ) {
    return this.maintenanceService.getMaintenanceByTenant(tenantId);
  }

  @Access('room', 'id')
  @Get('room/:roomId')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getRoomMaintenance(
    @Param('roomId', ParseIntPipe) roomId: number,
    @CurrentUser() user: JwtUser,
  ) {
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
