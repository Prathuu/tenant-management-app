import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateTenantDto } from './dto/create-tenant.dto';
import { AddPersonDto } from './dto/add-person.dto';
import { AssignRoomDto } from './dto/assign-room.dto';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async createTenant(dto: CreateTenantDto) {
    return this.prisma.tenant.create({
      data: dto,
    });
  }

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
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  async addPerson(tenantId: number, dto: AddPersonDto) {
    await this.getTenantById(tenantId);

    return this.prisma.person.create({
      data: {
        ...dto,
        tenantId,
      },
    });
  }

  async assignRoom(tenantId: number, dto: AssignRoomDto) {
    const room = await this.prisma.room.findUnique({
      where: { id: dto.roomId },
      include: {
        tenantRooms: {
          where: {
            endDate: null,
          },
        },
      },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.tenantRooms.length > 0) {
      throw new BadRequestException('Room already occupied');
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

  async endOccupancy(tenantRoomId: number) {
    return this.prisma.tenantRoom.update({
      where: { id: tenantRoomId },
      data: {
        endDate: new Date(),
      },
    });
  }

  async getRoomOccupancy(roomId: number) {
    return this.prisma.tenantRoom.findFirst({
      where: {
        roomId,
        endDate: null,
      },
      include: {
        tenant: true,
      },
    });
  }
}
