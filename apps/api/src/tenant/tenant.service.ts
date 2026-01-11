import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonRelation } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * TenantService
 * -------------
 * Contains all business logic related to:
 * - Tenants
 * - Persons (occupants)
 * - Room assignments
 * - Occupancy queries
 */
@Injectable()
export class TenantService {
  constructor(private readonly prisma: PrismaService) {}

  // ============================
  // Tenant
  // ============================

  /**
   * Create a new tenant (rent-paying entity)
   */
  createTenant(data: {
    fullName: string;
    phone: string;
    email?: string;
  }) {
    return this.prisma.tenant.create({
      data,
    });
  }

  // ============================
  // Person (family / roommates)
  // ============================

  /**
   * Add a person under a tenant
   * Uses relation `connect` to ensure tenant exists
   */
  addPerson(
    tenantId: number,
    data: {
      fullName: string;
      age?: number;
      relation?: PersonRelation;
    },
  ) {
    return this.prisma.person.create({
      data: {
        fullName: data.fullName,
        age: data.age,
        relation: data.relation,
        tenant: {
          connect: { id: tenantId },
        },
      },
    });
  }

  /**
   * Get all persons belonging to a tenant
   */
  getPersonsByTenant(tenantId: number) {
    return this.prisma.person.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'asc' },
    });
  }

  // ============================
  // Room Assignment
  // ============================

  /**
   * Assign one or more rooms to a tenant
   * Each assignment creates a TenantRoom entry
   */
  async assignRooms(tenantId: number, roomIds: number[]) {
    return this.prisma.$transaction(
      roomIds.map((roomId) =>
        this.prisma.tenantRoom.create({
          data: {
            startDate: new Date(),
            agreedRent: 0, // must be updated later by owner
            tenant: {
              connect: { id: tenantId },
            },
            room: {
              connect: { id: roomId },
            },
          },
        }),
      ),
    );
  }

  /**
   * Vacate a tenant-room association
   * We never delete history, only mark endDate
   */
  vacateRoom(tenantRoomId: number) {
    return this.prisma.tenantRoom.update({
      where: { id: tenantRoomId },
      data: { endDate: new Date() },
    });
  }

  // ============================
  // Occupancy Queries
  // ============================

  /**
   * Get full occupancy details of a room
   * Includes:
   * - Active tenants
   * - Persons living under each tenant
   */
  async getRoomOccupancy(roomId: number) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
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
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }
}
