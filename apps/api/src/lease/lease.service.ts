import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeaseDto } from './dto/create-lease.dto';

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
      throw new NotFoundException('TenantRoom not found');
    }

    if (tenantRoom.lease) {
      throw new BadRequestException('Lease already exists for this occupancy');
    }

    return this.prisma.lease.create({
      data: {
        tenantRoomId: dto.tenantRoomId,
        rentAmount: dto.rentAmount,
        depositAmount: dto.depositAmount,
        startDate: new Date(dto.startDate),
        status: 'ACTIVE',
      },
    });
  }

  async getAllLeases() {
    return this.prisma.lease.findMany({
      include: {
        tenant: true,
        room: true,
      },
    });
  }

  async getLeaseById(id: number) {
    const lease = await this.prisma.lease.findUnique({
      where: { id },
      include: {
        tenant: true,
        room: true,
      },
    });

    if (!lease) {
      throw new NotFoundException('Lease not found');
    }

    return lease;
  }

  async getTenantLeases(tenantId: number) {
    return this.prisma.lease.findMany({
      where: { tenantId },
      include: {
        room: true,
      },
    });
  }

  async getRoomLeases(roomId: number) {
    return this.prisma.lease.findMany({
      where: { roomId },
      include: {
        tenant: true,
      },
    });
  }

  async endLease(leaseId: number) {
    return this.prisma.lease.update({
      where: { id: leaseId },
      data: {
        endDate: new Date(),
        status: 'ENDED',
      },
    });
  }
}
