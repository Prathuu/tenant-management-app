import { Injectable, HttpStatus } from '@nestjs/common';
import { AppException } from '../exceptions/base.exception';
import { ExceptionCode } from '../exceptions/exception-codes';
import { PrismaService } from '@prisma/prisma.service';

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
      throw new AppException(
        'You do not have access to this building',
        ExceptionCode.FORBIDDEN,
        HttpStatus.FORBIDDEN,
      );
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
      throw new AppException(
        'You do not have access to this tenant',
        ExceptionCode.FORBIDDEN,
        HttpStatus.FORBIDDEN,
      );
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
      throw new AppException(
        'You do not have access to this invoice',
        ExceptionCode.FORBIDDEN,
        HttpStatus.FORBIDDEN,
      );
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
      throw new AppException(
        'You do not have access to this lease',
        ExceptionCode.FORBIDDEN,
        HttpStatus.FORBIDDEN,
      );
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
      throw new AppException(
        'You do not have access to this payment',
        ExceptionCode.FORBIDDEN,
        HttpStatus.FORBIDDEN,
      );
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
      throw new AppException(
        'You do not have access to this room',
        ExceptionCode.FORBIDDEN,
        HttpStatus.FORBIDDEN,
      );
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
      throw new AppException(
        'You do not have access to this meter',
        ExceptionCode.FORBIDDEN,
        HttpStatus.FORBIDDEN,
      );
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
      throw new AppException(
        'You do not have access to this maintenance request',
        ExceptionCode.FORBIDDEN,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
