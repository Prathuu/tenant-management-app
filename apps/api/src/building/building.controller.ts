import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { CreateFloorDto } from './dto/create-floor.dto';

/**
 * BuildingController
 * ------------------
 * Handles HTTP routes related to buildings, floors, and rooms
 */
@Controller('buildings')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  // ============================
  // Building
  // ============================

  @Post()
  create(@Body() dto: CreateBuildingDto) {
    return this.buildingService.createBuilding(dto);
  }

  @Get()
  getAll() {
    return this.buildingService.getAllBuildings();
  }

  /**
   * Get building by ID (with floors, rooms, tenants, persons)
   */
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.buildingService.getBuildingById(Number(id));
  }

  // ============================
  // Floors & Rooms
  // ============================

  @Post(':buildingId/floors')
  addFloors(
    @Param('buildingId') buildingId: string,
    @Body() floors: CreateFloorDto[],
  ) {
    return this.buildingService.addFloors(Number(buildingId), floors);
  }

  @Get(':buildingId/floors')
  getFloors(@Param('buildingId') buildingId: string) {
    return this.buildingService.getFloorsByBuilding(Number(buildingId));
  }

  @Get('floors/:floorId/rooms')
  getRooms(@Param('floorId') floorId: string) {
    return this.buildingService.getRoomsByFloor(Number(floorId));
  }
}
