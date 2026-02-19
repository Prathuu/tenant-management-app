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

@Controller()
export class MeterController {
  constructor(private meterService: MeterService) {}

  @Post('rooms/:roomId/meter')
  createMeter(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Body() dto: CreateMeterDto,
  ) {
    return this.meterService.createMeter(roomId, dto);
  }

  @Get('rooms/:roomId/meter')
  getMeter(@Param('roomId', ParseIntPipe) roomId: number) {
    return this.meterService.getMeterByRoom(roomId);
  }

  @Post('meters/:meterId/readings')
  addReading(
    @Param('meterId', ParseIntPipe) meterId: number,
    @Body() dto: CreateMeterReadingDto,
  ) {
    return this.meterService.addReading(meterId, dto);
  }

  @Get('meters/:meterId/readings')
  getReadings(@Param('meterId', ParseIntPipe) meterId: number) {
    return this.meterService.getReadings(meterId);
  }

  @Get('buildings/:buildingId/meters')
  getMetersByBuilding(@Param('buildingId', ParseIntPipe) buildingId: number) {
    return this.meterService.getMetersByBuilding(buildingId);
  }
}
