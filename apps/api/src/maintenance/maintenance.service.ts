import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { MaintenanceStatus } from '@prisma/client';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  async createMaintenance(dto: CreateMaintenanceDto) {
    return this.prisma.maintenanceRequest.create({
      data: {
        tenantId: dto.tenantId,
        roomId: dto.roomId,
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        status: MaintenanceStatus.OPEN,
        notes: dto.notes,
      },
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
    });
  }

  async getAllMaintenanceRequests() {
    return this.prisma.maintenanceRequest.findMany({
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
    });
  }

  async getMaintenanceById(id: number) {
    const request = await this.prisma.maintenanceRequest.findUnique({
      where: { id },
      include: {
        tenant: true,
        room: true,
      },
    });

    if (!request) {
      throw new NotFoundException('Maintenance request not found');
    }

    return request;
  }

  async getMaintenanceByTenant(tenantId: number) {
    return this.prisma.maintenanceRequest.findMany({
      where: { tenantId },
      include: {
        room: true,
      },
    });
  }

  async getMaintenanceByRoom(roomId: number) {
    return this.prisma.maintenanceRequest.findMany({
      where: { roomId },
      include: {
        tenant: true,
      },
    });
  }

  async updateStatus(id: number, status: MaintenanceStatus) {
    return this.prisma.maintenanceRequest.update({
      where: { id },
      data: { status },
    });
  }
}
