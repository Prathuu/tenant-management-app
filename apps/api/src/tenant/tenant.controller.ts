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
import { Roles } from '@/auth/roles.decorator';
import { JwtUser } from '@/auth/types/jwt-user.type';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';

@Controller()
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Post('tenants')
  @Roles('OWNER', 'MANAGER')
  createTenant(@Body() dto: CreateTenantDto, @CurrentUser() user: JwtUser) {
    return this.tenantService.createTenant(dto, user);
  }

  @Get('tenants')
  @Roles('OWNER', 'MANAGER')
  getAllTenants(@CurrentUser() user: JwtUser) {
    return this.tenantService.getAllTenants(user);
  }

  @Get('tenants/:tenantId')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getTenant(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @CurrentUser() user: JwtUser,
  ) {
    return this.tenantService.getTenantById(tenantId);
  }

  @Post('tenants/:tenantId/persons')
  @Roles('OWNER', 'MANAGER')
  addPerson(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Body() dto: AddPersonDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.tenantService.addPerson(tenantId, dto);
  }

  @Post('tenants/:tenantId/rooms')
  @Roles('OWNER', 'MANAGER')
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
