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
import { Roles } from '../auth/roles.decorator';
import { JwtUser } from '../auth/types/jwt-user.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Access } from '@/common/access/access.decorator';

@Controller('buildings')
export class BuildingController {
  constructor(private buildingService: BuildingService) {}

  // Create building
  @Post()
  @Roles('OWNER')
  createBuilding(@Body() dto: CreateBuildingDto, @CurrentUser() user: JwtUser) {
    return this.buildingService.createBuilding(dto, user);
  }

  // Get all buildings
  @Get()
  @Roles('OWNER', 'MANAGER')
  getAllBuildings(@CurrentUser() user: JwtUser) {
    return this.buildingService.getAllBuildings(user);
  }

  @Access('building', 'id')
  @Get(':id')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getBuilding(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtUser,
  ) {
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
