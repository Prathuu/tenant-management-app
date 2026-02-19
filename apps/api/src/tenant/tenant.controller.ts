import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { TenantService } from './tenant.service';

import { CreateTenantDto } from './dto/create-tenant.dto';
import { AddPersonDto } from './dto/add-person.dto';
import { AssignRoomDto } from './dto/assign-room.dto';

@Controller()
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Post('tenants')
  createTenant(@Body() dto: CreateTenantDto) {
    return this.tenantService.createTenant(dto);
  }

  @Get('tenants')
  getAllTenants() {
    return this.tenantService.getAllTenants();
  }

  @Get('tenants/:tenantId')
  getTenant(@Param('tenantId', ParseIntPipe) tenantId: number) {
    return this.tenantService.getTenantById(tenantId);
  }

  @Post('tenants/:tenantId/persons')
  addPerson(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Body() dto: AddPersonDto,
  ) {
    return this.tenantService.addPerson(tenantId, dto);
  }

  @Post('tenants/:tenantId/rooms')
  assignRoom(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Body() dto: AssignRoomDto,
  ) {
    return this.tenantService.assignRoom(tenantId, dto);
  }

  @Patch('tenant-rooms/:tenantRoomId/end')
  endOccupancy(@Param('tenantRoomId', ParseIntPipe) tenantRoomId: number) {
    return this.tenantService.endOccupancy(tenantRoomId);
  }

  @Get('rooms/:roomId/occupancy')
  getOccupancy(@Param('roomId', ParseIntPipe) roomId: number) {
    return this.tenantService.getRoomOccupancy(roomId);
  }
}
