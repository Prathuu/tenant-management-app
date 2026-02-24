import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from '@prisma/prisma.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { JwtUser } from '../auth/types/jwt-user.type';
import { AccessService } from '@/common/access/access.service';

@Injectable()
export class LeaseService {
  constructor(
    private prisma: PrismaService,
    private accessService: AccessService,
  ) {}

  async createLease(dto: CreateLeaseDto) {
    const tenantRoom = await this.prisma.tenantRoom.findUnique({
      where: { id: dto.tenantRoomId },
      include: {
        tenant: true,
        room: true,
        lease: true,
      },
    });

    if (!tenantRoom) {
      throw new NotFoundException('TenantRoom not found');
    }

    if (tenantRoom.lease) {
      throw new BadRequestException('Lease already exists for this TenantRoom');
    }

    return this.prisma.lease.create({
      data: {
        tenantRoomId: dto.tenantRoomId,
        rentAmount: dto.rentAmount,
        depositAmount: dto.depositAmount,
        startDate: new Date(dto.startDate),
        status: 'ACTIVE',
      },
      include: {
        tenantRoom: {
          include: {
            tenant: true,
            room: {
              include: {
                floor: {
                  include: {
                    building: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getAllLeases() {
    return this.prisma.lease.findMany({
      include: {
        tenantRoom: {
          include: {
            tenant: true,
            room: {
              include: {
                floor: {
                  include: {
                    building: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getLeaseById(leaseId: number) {
    return this.prisma.lease.findUnique({
      where: { id: leaseId },
      include: {
        tenantRoom: {
          include: {
            tenant: true,
            room: true,
          },
        },
      },
    });
  }

  async getTenantLeases(tenantId: number) {
    return this.prisma.lease.findMany({
      where: {
        tenantRoom: { tenantId },
      },
      include: {
        tenantRoom: {
          include: {
            tenant: true,
            room: true,
          },
        },
      },
    });
  }

  async getRoomLeases(roomId: number) {
    return this.prisma.lease.findMany({
      where: {
        tenantRoom: {
          roomId: roomId,
        },
      },
      include: {
        tenantRoom: {
          include: {
            tenant: true,
            room: true,
          },
        },
      },
    });
  }

  async endLease(leaseId: number) {
    const lease = await this.prisma.lease.findUnique({
      where: { id: leaseId },
    });

    if (!lease) {
      throw new NotFoundException('Lease not found');
    }

    return this.prisma.lease.update({
      where: { id: leaseId },
      data: {
        endDate: new Date(),
        status: 'ENDED',
      },
    });
  }
}
