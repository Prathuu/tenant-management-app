import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

import { BuildingService } from './building.service';

import { CreateBuildingDto } from './dto/create-building.dto';
import { CreateFloorDto } from './dto/create-floor.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('buildings')
export class BuildingController {
  constructor(private buildingService: BuildingService) {}

  // Create building
  @Post()
  @Roles('OWNER')
  createBuilding(@Body() dto: CreateBuildingDto) {
    return this.buildingService.createBuilding(dto);
  }

  // Get all buildings
  @Get()
  @Roles('OWNER', 'MANAGER')
  getAllBuildings() {
    return this.buildingService.getAllBuildings();
  }

  // Get single building
  @Get(':id')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getBuilding(@Param('id', ParseIntPipe) id: number) {
    return this.buildingService.getBuildingById(id);
  }

  // Create floor
  @Post(':buildingId/floors')
  @Roles('OWNER', 'MANAGER')
  createFloor(
    @Param('buildingId', ParseIntPipe) buildingId: number,
    @Body() dto: CreateFloorDto,
  ) {
    return this.buildingService.createFloor(buildingId, dto);
  }

  // Get floors
  @Get(':buildingId/floors')
  @Roles('OWNER', 'MANAGER')
  getFloors(@Param('buildingId', ParseIntPipe) buildingId: number) {
    return this.buildingService.getFloors(buildingId);
  }

  // Create room
  @Post('floors/:floorId/rooms')
  @Roles('OWNER', 'MANAGER')
  createRoom(
    @Param('floorId', ParseIntPipe) floorId: number,
    @Body() dto: CreateRoomDto,
  ) {
    return this.buildingService.createRoom(floorId, dto);
  }

  // Get rooms
  @Get('floors/:floorId/rooms')
  @Roles('OWNER', 'MANAGER')
  getRooms(@Param('floorId', ParseIntPipe) floorId: number) {
    return this.buildingService.getRooms(floorId);
  }
}
