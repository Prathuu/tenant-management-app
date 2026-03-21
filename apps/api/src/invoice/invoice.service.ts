import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceStatus, PaymentType } from '@prisma/client';
import { AppException } from '@/common/exceptions/base.exception';
import { ExceptionCode } from '@/common/exceptions/exception-codes';
import { JwtUser } from '@/auth/types/jwt-user.type';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async createInvoice(dto: CreateInvoiceDto, user: JwtUser) {
    const lease = await this.prisma.lease.findUnique({
      where: { id: dto.leaseId },
      include: {
        tenantRoom: {
          include: {
            tenant: true,
            room: true,
          },
        },
      },
    });

    if (!lease) {
      throw new AppException(
        'Lease not found',
        ExceptionCode.LEASE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    // 🔐 ORG CHECK
    if (lease.tenantRoom.tenant.organizationId !== user.organizationId) {
      throw new AppException(
        'Unauthorized',
        ExceptionCode.FORBIDDEN,
        HttpStatus.FORBIDDEN,
      );
    }

    // 🚫 DUPLICATE CHECK
    const existing = await this.prisma.invoice.findFirst({
      where: {
        leaseId: dto.leaseId,
        billingMonth: dto.billingMonth,
        billingYear: dto.billingYear,
      },
    });

    if (existing) {
      throw new AppException(
        'Invoice already exists for this period',
        ExceptionCode.VALIDATION_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }

    const rentAmount = lease.rentAmount;

    return this.prisma.invoice.create({
      data: {
        tenantId: lease.tenantRoom.tenantId, // ✅ FIXED
        leaseId: dto.leaseId,

        billingMonth: dto.billingMonth,
        billingYear: dto.billingYear,
        dueDate: new Date(dto.dueDate),

        subtotal: rentAmount,
        totalAmount: rentAmount,
        status: InvoiceStatus.UNPAID,

        items: {
          create: [
            {
              description: 'Monthly Rent',
              amount: rentAmount,
              type: PaymentType.RENT,
            },
          ],
        },
      },
      include: {
        tenant: true,
        lease: {
          include: {
            tenantRoom: {
              include: {
                room: true,
              },
            },
          },
        },
        items: true,
      },
    });
  }

  async getAllInvoices(user: JwtUser) {
    return this.prisma.invoice.findMany({
      where: {
        tenant: {
          organizationId: user.organizationId,
        },
      },
      include: {
        tenant: true,
        lease: {
          include: {
            tenantRoom: {
              include: {
                room: true,
              },
            },
          },
        },
        items: true,
        payments: true,
      },
    });
  }

  async getInvoiceById(invoiceId: number) {
    return this.prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        items: true,
        tenant: true,
      },
    });
  }

  async getInvoicesByTenant(tenantId: number) {
    return this.prisma.invoice.findMany({
      where: { tenantId },
      include: {
        items: true,
        payments: true,
      },
    });
  }

  async getInvoicesByLease(leaseId: number) {
    return this.prisma.invoice.findMany({
      where: { leaseId },
      include: {
        items: true,
        payments: true,
      },
    });
  }
}
