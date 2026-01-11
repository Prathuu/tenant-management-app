import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * BuildingService
 * ----------------
 * Handles all building-related business logic:
 * - Buildings
 * - Floors
 * - Rooms
 */
@Injectable()
export class BuildingService {
  constructor(private readonly prisma: PrismaService) {}

  // ============================
  // Building
  // ============================

  /**
   * Create a new building
   */
  createBuilding(data: {
    name: string;
    address: string;
    ownerName: string;
    ownerPhone?: string;
    ownerEmail?: string;
    yearBuilt?: number;
    hasLift?: boolean;
    parkingSlots?: number;
    powerBackup?: boolean;
    waterSource?: any;
    securityAvailable?: boolean;
  }) {
    return this.prisma.building.create({ data });
  }

  /**
   * Get all buildings
   */
  async getAllBuildings() {
    const buildings = await this.prisma.building.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        floors: {
          include: {
            rooms: {
              include: {
                tenantRooms: {
                  where: { endDate: null },
                  include: {
                    tenant: {
                      include: {
                        persons: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return buildings.map((b) => {
      const floorsCount = b.floors.length;

      const rooms = b.floors.flatMap((f) => f.rooms);
      const totalRooms = rooms.length;

      const occupiedRooms = rooms.filter(
        (r) => r.tenantRooms.length > 0,
      ).length;

      const peopleCount = rooms.reduce((sum, room) => {
        return (
          sum +
          room.tenantRooms.reduce((s, tr) => s + tr.tenant.persons.length, 0)
        );
      }, 0);

      return {
        // ✅ original building info
        id: b.id,
        name: b.name,
        address: b.address,
        ownerName: b.ownerName,
        ownerPhone: b.ownerPhone,
        ownerEmail: b.ownerEmail,
        yearBuilt: b.yearBuilt,
        hasLift: b.hasLift,
        parkingSlots: b.parkingSlots,
        powerBackup: b.powerBackup,
        waterSource: b.waterSource,
        securityAvailable: b.securityAvailable,
        createdAt: b.createdAt,

        // ✅ derived summary info
        floorsCount,
        totalRooms,
        occupiedRooms,
        peopleCount,
      };
    });
  }

  /**
   * Get building by ID
   */

  async getBuildingById(id: number) {
    return this.prisma.building.findUnique({
      where: { id },
      include: {
        floors: {
          orderBy: { code: 'asc' },
          include: {
            rooms: {
              orderBy: { roomNumber: 'asc' },
              include: {
                tenantRooms: {
                  where: { endDate: null },
                  include: {
                    tenant: {
                      include: {
                        persons: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  // ============================
  // Floors & Rooms
  // ============================

  /**
   * Create floors and auto-generate rooms
   * Room numbers are generated based on floor code
   */
  async addFloors(
    buildingId: number,
    floors: {
      name: string;
      code: number;
      roomCount: number;
    }[],
  ) {
    const building = await this.prisma.building.findUnique({
      where: { id: buildingId },
    });

    if (!building) {
      throw new NotFoundException('Building not found');
    }

    for (const floor of floors) {
      const createdFloor = await this.prisma.floor.create({
        data: {
          name: floor.name,
          code: floor.code,
          building: {
            connect: { id: buildingId },
          },
        },
      });

      const roomsData = Array.from({ length: floor.roomCount }, (_, index) => ({
        roomNumber:
          floor.code === 0
            ? `00${index + 1}`
            : `${floor.code}${String(index + 1).padStart(2, '0')}`,
        baseRent: 0,
        floorId: createdFloor.id,
      }));

      await this.prisma.room.createMany({
        data: roomsData,
      });
    }

    return { message: 'Floors and rooms created successfully' };
  }

  // ============================
  // Read Queries
  // ============================

  /**
   * Get all floors of a building
   */
  getFloorsByBuilding(buildingId: number) {
    return this.prisma.floor.findMany({
      where: { buildingId },
      orderBy: { code: 'asc' },
    });
  }

  /**
   * Get rooms of a floor
   */
  getRoomsByFloor(floorId: number) {
    return this.prisma.room.findMany({
      where: { floorId },
      orderBy: { roomNumber: 'asc' },
    });
  }
}
