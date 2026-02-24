import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { AddPersonDto } from './dto/add-person.dto';
import { AssignRoomDto } from './dto/assign-room.dto';
import { AppException } from '@/common/exceptions/base.exception';
import { ExceptionCode } from '@/common/exceptions/exception-codes';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  // CREATE TENANT
  async createTenant(dto: CreateTenantDto) {
    return this.prisma.tenant.create({
      data: dto,
    });
  }

  // GET ALL TENANTS
  async getAllTenants() {
    return this.prisma.tenant.findMany({
      where: { deletedAt: null },
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
        ...dto,
        tenantId,
      },
    });
  }

  // ASSIGN ROOM
  async assignRoom(tenantId: number, dto: AssignRoomDto) {
    // verify tenant exists
    await this.getTenantById(tenantId);

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

    return this.prisma.tenantRoom.create({
      data: {
        tenantId,
        roomId: dto.roomId,
        agreedRent: dto.agreedRent,
        startDate: new Date(),
      },
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

    return this.prisma.tenantRoom.update({
      where: { id: tenantRoomId },
      data: {
        endDate: new Date(),
      },
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
