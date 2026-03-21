import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { AppException } from '@/common/exceptions/base.exception';
import { ExceptionCode } from '@/common/exceptions/exception-codes';
import { JwtUser } from '@/auth/types/jwt-user.type';

@Injectable()
export class LeaseService {
  constructor(private prisma: PrismaService) {}

  async createLease(dto: CreateLeaseDto, user: JwtUser) {
    const tenantRoom = await this.prisma.tenantRoom.findUnique({
      where: { id: dto.tenantRoomId },
      include: {
        tenant: true,
        room: true,
        leases: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (tenantRoom.tenant.organizationId !== user.organizationId) {
      throw new AppException(
        'Unauthorized access',
        ExceptionCode.FORBIDDEN,
        HttpStatus.FORBIDDEN,
      );
    }

    if (!tenantRoom) {
      throw new AppException(
        'TenantRoom not found',
        ExceptionCode.TENANT_ROOM_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (tenantRoom.leases.length > 0) {
      throw new AppException(
        'Active lease already exists for this TenantRoom',
        ExceptionCode.LEASE_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.lease.create({
      data: {
        tenantRoom: {
          connect: { id: dto.tenantRoomId },
        },
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

  async getAllLeases(user: JwtUser) {
    return this.prisma.lease.findMany({
      where: {
        tenantRoom: {
          tenant: {
            organizationId: user.organizationId,
          },
        },
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

  async getTenantLeases(tenantId: number, user: JwtUser) {
    return this.prisma.lease.findMany({
      where: {
        tenantRoom: {
          tenantId,
          tenant: {
            organizationId: user.organizationId,
          },
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
