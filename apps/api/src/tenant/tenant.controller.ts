import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { AddPersonDto } from './dto/add-person.dto';
import { AssignRoomsDto } from './dto/assign-rooms.dto';

/**
 * TenantController
 * ----------------
 * Handles HTTP requests related to tenants and occupants
 */
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  // ============================
  // Tenant
  // ============================

  @Post()
  createTenant(@Body() dto: CreateTenantDto) {
    return this.tenantService.createTenant(dto);
  }

  // ============================
  // Person
  // ============================

  @Post(':tenantId/persons')
  addPerson(
    @Param('tenantId') tenantId: string,
    @Body() dto: AddPersonDto,
  ) {
    return this.tenantService.addPerson(Number(tenantId), dto);
  }

  @Get(':tenantId/persons')
  getPersons(@Param('tenantId') tenantId: string) {
    return this.tenantService.getPersonsByTenant(Number(tenantId));
  }

  // ============================
  // Room Assignment
  // ============================

  @Post(':tenantId/rooms')
  assignRooms(
    @Param('tenantId') tenantId: string,
    @Body() dto: AssignRoomsDto,
  ) {
    return this.tenantService.assignRooms(Number(tenantId), dto.roomIds);
  }

  // ============================
  // Occupancy
  // ============================

  @Get('rooms/:roomId/occupancy')
  getRoomOccupancy(@Param('roomId') roomId: string) {
    return this.tenantService.getRoomOccupancy(Number(roomId));
  }
}
