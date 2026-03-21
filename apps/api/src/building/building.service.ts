import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { CreateFloorDto } from './dto/create-floor.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { PrismaService } from '@prisma/prisma.service';
import { AppException } from '@/common/exceptions/base.exception';
import { ExceptionCode } from '@/common/exceptions/exception-codes';

@Injectable()
export class BuildingService {
  constructor(private prisma: PrismaService) {}

  // Create building
  async createBuilding(dto: CreateBuildingDto) {
    return this.prisma.building.create({
      data: dto,
    });
  }

  // Get all buildings
  async getAllBuildings() {
    const buildings = await this.prisma.building.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        name: true,

        floors: {
          select: {
            rooms: {
              select: {
                id: true,
                tenant: {
                  select: { id: true },
                },
              },
            },
          },
        },
      },
    });

    return buildings.map((building) => {
      let totalRooms = 0;
      let occupiedRooms = 0;
      let totalTenants = 0;

      building.floors.forEach((floor) => {
        floor.rooms.forEach((room) => {
          totalRooms++;

          if (room.tenant) {
            occupiedRooms++;
            totalTenants++;
          }
        });
      });

      return {
        id: building.id,
        name: building.name,
        totalRooms,
        occupiedRooms,
        vacantRooms: totalRooms - occupiedRooms,
        totalTenants,
      };
    });
  }

  async getBuildingById(buildingId: number) {
    return this.prisma.building.findUnique({
      where: { id: buildingId },
      include: {
        floors: {
          include: {
            rooms: true,
          },
        },
      },
    });
  }

  // Create floor
  async createFloor(buildingId: number, dto: CreateFloorDto) {
    await this.getBuildingById(buildingId);

    return this.prisma.floor.create({
      data: {
        ...dto,
        buildingId,
      },
    });
  }

  // Get floors
  async getFloors(buildingId: number) {
    return this.prisma.floor.findMany({
      where: { buildingId },
      include: {
        rooms: true,
      },
    });
  }

  // Create room
  async createRoom(floorId: number, dto: CreateRoomDto) {
    const floor = await this.prisma.floor.findUnique({
      where: { id: floorId },
    });

    if (!floor) {
      throw new AppException(
        'Floor not found',
        ExceptionCode.BUILDING_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.room.create({
      data: {
        ...dto,
        floorId,
      },
    });
  }

  // Get rooms
  async getRooms(floorId: number) {
    return this.prisma.room.findMany({
      where: { floorId },
      include: {
        meter: true,
        tenantRooms: true,
      },
    });
  }
}
