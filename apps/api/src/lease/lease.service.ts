import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { AppException } from '@/common/exceptions/base.exception';
import { ExceptionCode } from '@/common/exceptions/exception-codes';

@Injectable()
export class LeaseService {
  constructor(private prisma: PrismaService) {}

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
      throw new AppException(
        'TenantRoom not found',
        ExceptionCode.TENANT_ROOM_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (tenantRoom.lease) {
      throw new AppException(
        'Lease already exists for this TenantRoom',
        ExceptionCode.LEASE_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
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
      throw new AppException(
        'Lease not found',
        ExceptionCode.LEASE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
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
