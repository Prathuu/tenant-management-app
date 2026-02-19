import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { MeterService } from './meter.service';
import { CreateMeterDto } from './dto/create-meter.dto';
import { CreateMeterReadingDto } from './dto/create-meter-reading.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtUser } from '../auth/types/jwt-user.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Access } from '../common/access/access.decorator';

@Controller()
export class MeterController {
  constructor(private meterService: MeterService) {}

  @Post('rooms/:roomId/meter')
  @Roles('OWNER', 'MANAGER')
  createMeter(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Body() dto: CreateMeterDto,
  ) {
    return this.meterService.createMeter(roomId, dto);
  }

  @Access('meter', 'roomId')
  @Get('rooms/:roomId/meter')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getMeter(
    @Param('roomId', ParseIntPipe) roomId: number,
    @CurrentUser() user: JwtUser,
  ) {
    return this.meterService.getMeterByRoom(roomId);
  }

  @Post('meters/:meterId/readings')
  @Roles('OWNER', 'MANAGER')
  addReading(
    @Param('meterId', ParseIntPipe) meterId: number,
    @Body() dto: CreateMeterReadingDto,
  ) {
    return this.meterService.addReading(meterId, dto);
  }

  @Access('meter', 'id')
  @Get('meters/:meterId/readings')
  @Roles('OWNER', 'MANAGER', 'TENANT')
  getReadings(
    @Param('meterId', ParseIntPipe) meterId: number,
    @CurrentUser() user: JwtUser,
  ) {
    return this.meterService.getReadings(meterId);
  }

  @Get('buildings/:buildingId/meters')
  @Roles('OWNER', 'MANAGER')
  getMetersByBuilding(@Param('buildingId', ParseIntPipe) buildingId: number) {
    return this.meterService.getMetersByBuilding(buildingId);
  }
}
