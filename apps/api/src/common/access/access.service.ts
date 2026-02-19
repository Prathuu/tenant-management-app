import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AccessService {
  constructor(private prisma: PrismaService) {}

  private bypass(userRole: string) {
    return userRole === 'OWNER' || userRole === 'MANAGER';
  }

  async validateBuildingAccess(
    userId: number,
    userRole: string,
    buildingId: number,
  ) {
    if (this.bypass(userRole)) return;

    const exists = await this.prisma.tenantRoom.findFirst({
      where: {
        tenant: { user: { id: userId } },
        room: { floor: { buildingId } },
        endDate: null,
      },
    });

    if (!exists) {
      throw new ForbiddenException('You do not have access to this building');
    }
  }

  async validateTenantAccess(
    userId: number,
    userRole: string,
    tenantId: number,
  ) {
    if (this.bypass(userRole)) return;

    const exists = await this.prisma.tenant.findFirst({
      where: {
        id: tenantId,
        user: { id: userId },
      },
    });

    if (!exists) {
      throw new ForbiddenException('You do not have access to this tenant');
    }
  }

  async validateInvoiceAccess(
    userId: number,
    userRole: string,
    invoiceId: number,
  ) {
    if (this.bypass(userRole)) return;

    const exists = await this.prisma.invoice.findFirst({
      where: {
        id: invoiceId,
        tenant: { user: { id: userId } },
      },
    });

    if (!exists) {
      throw new ForbiddenException('You do not have access to this invoice');
    }
  }

  async validateLeaseAccess(userId: number, userRole: string, leaseId: number) {
    if (this.bypass(userRole)) return;

    const exists = await this.prisma.lease.findFirst({
      where: {
        id: leaseId,
        tenantRoom: {
          tenant: { user: { id: userId } },
        },
      },
    });

    if (!exists) {
      throw new ForbiddenException('You do not have access to this lease');
    }
  }

  async validatePaymentAccess(
    userId: number,
    userRole: string,
    paymentId: number,
  ) {
    if (this.bypass(userRole)) return;

    const exists = await this.prisma.payment.findFirst({
      where: {
        id: paymentId,
        tenant: { user: { id: userId } },
      },
    });

    if (!exists) {
      throw new ForbiddenException('You do not have access to this payment');
    }
  }

  async validateRoomAccess(userId: number, userRole: string, roomId: number) {
    if (this.bypass(userRole)) return;

    const exists = await this.prisma.tenantRoom.findFirst({
      where: {
        roomId,
        tenant: { user: { id: userId } },
        endDate: null,
      },
    });

    if (!exists) {
      throw new ForbiddenException('You do not have access to this room');
    }
  }

  async validateMeterAccess(userId: number, userRole: string, meterId: number) {
    if (this.bypass(userRole)) return;

    const exists = await this.prisma.meter.findFirst({
      where: {
        id: meterId,
        room: {
          tenantRooms: {
            some: {
              tenant: { user: { id: userId } },
              endDate: null,
            },
          },
        },
      },
    });

    if (!exists) {
      throw new ForbiddenException('You do not have access to this meter');
    }
  }

  async validateMaintenanceAccess(
    userId: number,
    userRole: string,
    maintenanceId: number,
  ) {
    if (this.bypass(userRole)) return;

    const exists = await this.prisma.maintenanceRequest.findFirst({
      where: {
        id: maintenanceId,
        tenant: { user: { id: userId } },
      },
    });

    if (!exists) {
      throw new ForbiddenException(
        'You do not have access to this maintenance request',
      );
    }
  }
}
