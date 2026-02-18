import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { BuildingService } from './building.service';

import { CreateBuildingDto } from './dto/create-building.dto';
import { CreateFloorDto } from './dto/create-floor.dto';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller()
export class BuildingController {
  constructor(private buildingService: BuildingService) {}

  // Create building
  @Post('buildings')
  createBuilding(@Body() dto: CreateBuildingDto) {
    return this.buildingService.createBuilding(dto);
  }

  // Get all buildings
  @Get('buildings')
  getAllBuildings() {
    return this.buildingService.getAllBuildings();
  }

  // Get building
  @Get('buildings/:id')
  getBuilding(@Param('id', ParseIntPipe) id: number) {
    return this.buildingService.getBuildingById(id);
  }

  // Create floor
  @Post('buildings/:buildingId/floors')
  createFloor(
    @Param('buildingId', ParseIntPipe) buildingId: number,
    @Body() dto: CreateFloorDto,
  ) {
    return this.buildingService.createFloor(buildingId, dto);
  }

  // Get floors
  @Get('buildings/:buildingId/floors')
  getFloors(@Param('buildingId', ParseIntPipe) buildingId: number) {
    return this.buildingService.getFloors(buildingId);
  }

  // Create room
  @Post('floors/:floorId/rooms')
  createRoom(
    @Param('floorId', ParseIntPipe) floorId: number,
    @Body() dto: CreateRoomDto,
  ) {
    return this.buildingService.createRoom(floorId, dto);
  }

  // Get rooms
  @Get('floors/:floorId/rooms')
  getRooms(@Param('floorId', ParseIntPipe) floorId: number) {
    return this.buildingService.getRooms(floorId);
  }
}
