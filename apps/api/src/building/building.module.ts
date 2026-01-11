import { Module } from '@nestjs/common';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';

/**
 * BuildingModule
 * ----------------
 * Responsible for:
 * - Buildings
 * - Floors
 * - Rooms
 *
 * Purely structural data (no people / billing logic here).
 */
@Module({
  controllers: [BuildingController],
  providers: [BuildingService],
})
export class BuildingModule {}
