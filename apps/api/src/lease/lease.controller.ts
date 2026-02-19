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

@Controller()
export class LeaseController {
  constructor(private leaseService: LeaseService) {}

  @Post('leases')
  createLease(@Body() dto: CreateLeaseDto) {
    return this.leaseService.createLease(dto);
  }

  @Get('leases')
  getAllLeases() {
    return this.leaseService.getAllLeases();
  }

  @Get('leases/:id')
  getLease(@Param('id', ParseIntPipe) id: number) {
    return this.leaseService.getLeaseById(id);
  }

  @Get('tenants/:tenantId/leases')
  getTenantLeases(@Param('tenantId', ParseIntPipe) tenantId: number) {
    return this.leaseService.getTenantLeases(tenantId);
  }

  @Get('rooms/:roomId/leases')
  getRoomLeases(@Param('roomId', ParseIntPipe) roomId: number) {
    return this.leaseService.getRoomLeases(roomId);
  }

  @Patch('leases/:leaseId/end')
  endLease(@Param('leaseId', ParseIntPipe) leaseId: number) {
    return this.leaseService.endLease(leaseId);
  }
}
