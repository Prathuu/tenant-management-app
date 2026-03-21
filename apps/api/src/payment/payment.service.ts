import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InvoiceStatus } from '@prisma/client';
import { ExceptionCode } from '@/common/exceptions/exception-codes';
import { AppException } from '@/common/exceptions/base.exception';
import { JwtUser } from '@/auth/types/jwt-user.type';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(dto: CreatePaymentDto, user: JwtUser) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: dto.invoiceId },
      include: {
        payments: true,
      },
    });

    if (!invoice) {
      throw new AppException(
        'Invoice not found',
        ExceptionCode.INVOICE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const tenant = await this.prisma.tenant.findUnique({
      where: { id: invoice.tenantId },
    });

    if (tenant?.organizationId !== user.organizationId) {
      throw new AppException(
        'Unauthorized',
        ExceptionCode.FORBIDDEN,
        HttpStatus.FORBIDDEN,
      );
    }

    const totalPaid =
      invoice.payments.reduce((sum, p) => sum + p.amount, 0) + dto.amount;

    if (totalPaid > invoice.totalAmount) {
      throw new AppException(
        'Payment exceeds invoice total',
        ExceptionCode.PAYMENT_EXCEEDS_INVOICE_TOTAL,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          tenantId: invoice.tenantId, // ✅ FIXED
          invoiceId: dto.invoiceId,
          amount: dto.amount,
          type: dto.type,
          status: dto.status,
        },
      });

      let newStatus: InvoiceStatus = InvoiceStatus.UNPAID;

      if (totalPaid === invoice.totalAmount) {
        newStatus = InvoiceStatus.PAID;
      } else if (totalPaid > 0) {
        newStatus = InvoiceStatus.PARTIAL;
      }

      await tx.invoice.update({
        where: { id: dto.invoiceId },
        data: {
          status: newStatus,
        },
      });

      return payment;
    });
  }

  async getAllPayments(user: JwtUser) {
    return this.prisma.payment.findMany({
      where: {
        tenant: {
          organizationId: user.organizationId,
        },
      },
      include: {
        tenant: true,
        invoice: true,
      },
    });
  }

  async getPaymentById(paymentId: number) {
    return this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        tenant: true,
        invoice: true,
      },
    });
  }

  async getPaymentsByTenant(tenantId: number) {
    return this.prisma.payment.findMany({
      where: { tenantId },
      include: {
        tenant: true,
        invoice: true,
      },
    });
  }

  async getPaymentsByInvoice(invoiceId: number) {
    return this.prisma.payment.findMany({
      where: { invoiceId },
      include: {
        tenant: true,
        invoice: true,
      },
    });
  }
}
