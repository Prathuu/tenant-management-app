import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BillStatus, PaymentStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * BillingService
 * --------------
 * Handles:
 * - Monthly bill generation
 * - Rent aggregation
 * - Payments
 */
@Injectable()
export class BillingService {
  constructor(private readonly prisma: PrismaService) {}

  // ============================
  // Bills
  // ============================

  /**
   * Generate monthly bill for a tenant
   * - Aggregates agreed rent from all active rooms
   * - Prevents duplicate bills
   */
  async generateBill(tenantId: number, month: number, year: number) {
    const existingBill = await this.prisma.bill.findUnique({
      where: {
        tenantId_month_year: {
          tenantId,
          month,
          year,
        },
      },
    });

    if (existingBill) {
      throw new BadRequestException('Bill already exists for this month');
    }

    const activeRooms = await this.prisma.tenantRoom.findMany({
      where: {
        tenantId,
        endDate: null,
      },
    });

    if (activeRooms.length === 0) {
      throw new BadRequestException('Tenant has no active rooms');
    }

    const totalRent = activeRooms.reduce(
      (sum, room) => sum + room.agreedRent,
      0,
    );

    return this.prisma.bill.create({
      data: {
        tenant: { connect: { id: tenantId } },
        month,
        year,
        totalAmount: totalRent,
      },
    });
  }

  /**
   * Get all bills of a tenant
   */
  getBillsByTenant(tenantId: number) {
    return this.prisma.bill.findMany({
      where: { tenantId },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });
  }

  // ============================
  // Payments
  // ============================

  /**
   * Record a payment against tenant
   * Automatically updates bill status if applicable
   */
  async addPayment(
    tenantId: number,
    data: {
      amount: number;
      type: any;
    },
  ) {
    const payment = await this.prisma.payment.create({
      data: {
        amount: data.amount,
        type: data.type,
        status: PaymentStatus.SUCCESS,
        tenant: { connect: { id: tenantId } },
      },
    });

    // Apply payment to latest unpaid bill (simple logic for now)
    const bill = await this.prisma.bill.findFirst({
      where: {
        tenantId,
        status: { in: [BillStatus.UNPAID, BillStatus.PARTIAL] },
      },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });

    if (!bill) return payment;

    const newPaidAmount = bill.paidAmount + data.amount;

    let status: BillStatus = BillStatus.PARTIAL;

    if (newPaidAmount >= bill.totalAmount) {
      status = BillStatus.PAID;
    }

    await this.prisma.bill.update({
      where: { id: bill.id },
      data: {
        paidAmount: newPaidAmount,
        status,
      },
    });

    return payment;
  }
}
