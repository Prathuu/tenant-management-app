import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InvoiceStatus } from '@prisma/client';
import { ExceptionCode } from '@/common/exceptions/exception-codes';
import { AppException } from '@/common/exceptions/base.exception';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(dto: CreatePaymentDto) {
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

    const totalPaid =
      invoice.payments.reduce((sum, p) => sum + p.amount, 0) + dto.amount;

    if (totalPaid > invoice.totalAmount) {
      throw new AppException(
        'Payment exceeds invoice total',
        ExceptionCode.PAYMENT_EXCEEDS_INVOICE_TOTAL,
        HttpStatus.BAD_REQUEST,
      );
    }

    const payment = await this.prisma.payment.create({
      data: {
        tenantId: dto.tenantId,
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

    await this.prisma.invoice.update({
      where: { id: dto.invoiceId },
      data: {
        status: newStatus,
      },
    });

    return payment;
  }

  async getAllPayments() {
    return this.prisma.payment.findMany({
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
