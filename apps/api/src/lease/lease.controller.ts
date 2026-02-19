import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { LeaseService } from './lease.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { Roles } from '../auth/roles.decorator';

@Controller()
export class LeaseController {
  constructor(private leaseService: LeaseService) {}

  @Post('leases')
  @Roles('OWNER', 'MANAGER')
  createLease(@Body() dto: CreateLeaseDto) {
    return this.leaseService.createLease(dto);
  }

  @Get('leases')
  @Roles('OWNER', 'MANAGER')
  getAllLeases() {
    return this.leaseService.getAllLeases();
  }

  @Get('leases/:id')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getLease(@Param('id', ParseIntPipe) id: number) {
    return this.leaseService.getLeaseById(id);
  }

  @Get('tenants/:tenantId/leases')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getTenantLeases(@Param('tenantId', ParseIntPipe) tenantId: number) {
    return this.leaseService.getTenantLeases(tenantId);
  }

  @Get('rooms/:roomId/leases')
  @Roles('OWNER', 'MANAGER')
  getRoomLeases(@Param('roomId', ParseIntPipe) roomId: number) {
    return this.leaseService.getRoomLeases(roomId);
  }

  @Patch('leases/:leaseId/end')
  @Roles('OWNER', 'MANAGER')
  endLease(@Param('leaseId', ParseIntPipe) leaseId: number) {
    return this.leaseService.endLease(leaseId);
  }
}
