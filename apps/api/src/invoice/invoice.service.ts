import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from '@prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceStatus, PaymentType } from '@prisma/client';
import { JwtUser } from '../auth/types/jwt-user.type';
import { AccessService } from '@/common/access/access.service';

@Injectable()
export class InvoiceService {
  constructor(
    private prisma: PrismaService,
    private accessService: AccessService,
  ) {}

  async createInvoice(dto: CreateInvoiceDto) {
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
      throw new NotFoundException('Lease not found');
    }

    const rentAmount = lease.rentAmount;

    return this.prisma.invoice.create({
      data: {
        tenantId: dto.tenantId,
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

  async getAllInvoices() {
    return this.prisma.invoice.findMany({
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
