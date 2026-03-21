import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { AddPersonDto } from './dto/add-person.dto';
import { AssignRoomDto } from './dto/assign-room.dto';
import { AppException } from '@/common/exceptions/base.exception';
import { ExceptionCode } from '@/common/exceptions/exception-codes';
import { JwtUser } from '@/auth/types/jwt-user.type';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  // CREATE TENANT
  async createTenant(dto: CreateTenantDto, user: JwtUser) {
    return this.prisma.tenant.create({
      data: {
        fullName: dto.fullName,
        phone: dto.phone,
        email: dto.email,

        organization: {
          connect: { id: user.organizationId },
        },
      },
    });
  }

  // GET ALL TENANTS
  async getAllTenants(user: JwtUser) {
    return this.prisma.tenant.findMany({
      where: {
        deletedAt: null,
        organizationId: user.organizationId,
      },
      include: {
        persons: true,
        tenantRooms: {
          where: { endDate: null },
          include: {
            room: true,
          },
        },
      },
    });
  }

  // GET TENANT BY ID
  async getTenantById(tenantId: number) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        persons: true,
        tenantRooms: {
          include: {
            room: true,
          },
        },
      },
    });

    if (!tenant) {
      throw new AppException(
        'Tenant not found',
        ExceptionCode.TENANT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return tenant;
  }

  // ADD PERSON
  async addPerson(tenantId: number, dto: AddPersonDto) {
    await this.getTenantById(tenantId);

    return this.prisma.person.create({
      data: {
        fullName: dto.fullName,
        age: dto.age,
        relation: dto.relation,

        tenant: {
          connect: { id: tenantId },
        },
      },
    });
  }

  // ASSIGN ROOM
  async assignRoom(tenantId: number, dto: AssignRoomDto) {
    const tenant = await this.getTenantById(tenantId);

    const room = await this.prisma.room.findUnique({
      where: { id: dto.roomId },
      include: {
        tenantRooms: {
          where: { endDate: null },
        },
      },
    });

    if (!room) {
      throw new AppException(
        'Room not found',
        ExceptionCode.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (room.tenantRooms.length > 0) {
      throw new AppException(
        'Room already occupied',
        ExceptionCode.VALIDATION_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const tenantRoom = await tx.tenantRoom.create({
        data: {
          tenant: {
            connect: { id: tenantId },
          },
          room: {
            connect: { id: dto.roomId },
          },
          buildingId: room.buildingId,
          agreedRent: dto.agreedRent,
          startDate: new Date(),
        },
      });

      await tx.room.update({
        where: { id: dto.roomId },
        data: { isOccupied: true },
      });

      return tenantRoom;
    });
  }

  // END OCCUPANCY
  async endOccupancy(tenantRoomId: number) {
    const tenantRoom = await this.prisma.tenantRoom.findUnique({
      where: { id: tenantRoomId },
    });

    if (!tenantRoom) {
      throw new AppException(
        'Tenant room assignment not found',
        ExceptionCode.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (tenantRoom.endDate) {
      throw new AppException(
        'Occupancy already ended',
        ExceptionCode.VALIDATION_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.tenantRoom.update({
        where: { id: tenantRoomId },
        data: {
          endDate: new Date(),
        },
      });

      await tx.room.update({
        where: { id: updated.roomId },
        data: { isOccupied: false },
      });

      return updated;
    });
  }

  // GET ROOM OCCUPANCY
  async getRoomOccupancy(roomId: number) {
    const occupancy = await this.prisma.tenantRoom.findFirst({
      where: {
        roomId,
        endDate: null,
      },
      include: {
        tenant: true,
      },
    });

    if (!occupancy) {
      throw new AppException(
        'Room is currently vacant',
        ExceptionCode.RESOURCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return occupancy;
  }
}
