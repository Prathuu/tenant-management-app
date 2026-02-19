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

@UseGuards(JwtAuthGuard)
@Controller('buildings')
export class BuildingController {
  constructor(private buildingService: BuildingService) {}

  // Create building
  @Post()
  createBuilding(@Body() dto: CreateBuildingDto) {
    return this.buildingService.createBuilding(dto);
  }

  // Get all buildings
  @Get()
  getAllBuildings() {
    return this.buildingService.getAllBuildings();
  }

  // Get single building
  @Get(':id')
  getBuilding(@Param('id', ParseIntPipe) id: number) {
    return this.buildingService.getBuildingById(id);
  }

  // Create floor
  @Post(':buildingId/floors')
  createFloor(
    @Param('buildingId', ParseIntPipe) buildingId: number,
    @Body() dto: CreateFloorDto,
  ) {
    return this.buildingService.createFloor(buildingId, dto);
  }

  // Get floors
  @Get(':buildingId/floors')
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
