import {
  PrismaClient,
  WaterSource,
  InvoiceStatus,
  PaymentType,
  PaymentStatus,
  LeaseStatus,
  MaintenancePriority,
  MaintenanceStatus,
  UserRole,
  MeterType,
  OccupancyType,
} from '@prisma/client';

import * as bcrypt from 'bcrypt';
import { BUILDINGS } from './constants';

const prisma = new PrismaClient();
const SALT = 10;

async function hash(password: string) {
  return bcrypt.hash(password, SALT);
}

function monthsAgo(n: number) {
  return new Date(Date.now() - n * 30 * 86400000);
}

function monthsLater(n: number) {
  return new Date(Date.now() + n * 30 * 86400000);
}

function generateEmail(name: string, building: string) {
  return `${name.toLowerCase().replace(/\s+/g, '.')}.${building
    .toLowerCase()
    .replace(/\s+/g, '')}@app.com`;
}

async function createUser(
  email: string,
  name: string,
  role: UserRole,
  organizationId: number,
  tenantId?: number,
) {
  return prisma.user.create({
    data: {
      email,
      password: await hash('password123'),
      name,
      role,
      organizationId,
      tenantId,
    },
  });
}

async function createMeterWithHistory(roomId: number, meterNumber: string) {
  const meter = await prisma.meter.create({
    data: {
      meterNumber,
      roomId,
      type: MeterType.ELECTRICITY,
      isActive: true,
    },
  });

  let reading = 1000;

  for (let i = 6; i >= 0; i--) {
    reading += Math.floor(Math.random() * 200);

    await prisma.meterReading.create({
      data: {
        meterId: meter.id,
        reading,
        readingDate: monthsAgo(i),
      },
    });
  }
}

async function createTenantFlow(
  tenantName: string,
  phone: string,
  room: any,
  building: any,
  organizationId: number,
  occupancyType: OccupancyType,
) {
  const tenant = await prisma.tenant.create({
    data: {
      fullName: tenantName,
      phone,
      organizationId,
    },
  });

  await createUser(
    generateEmail(tenantName, building.name),
    tenantName,
    UserRole.TENANT,
    organizationId,
    tenant.id,
  );

  const tenantRoom = await prisma.tenantRoom.create({
    data: {
      tenant: { connect: { id: tenant.id } },
      room: { connect: { id: room.id } },
      buildingId: building.id,
      agreedRent: room.baseRent,
      startDate: monthsAgo(6),
      occupancyType,
    },
  });

  const lease = await prisma.lease.create({
    data: {
      tenantRoomId: tenantRoom.id,
      rentAmount: room.baseRent,
      depositAmount: room.baseRent * 2,
      startDate: monthsAgo(6),
      endDate: monthsLater(6),
      status: LeaseStatus.ACTIVE,
    },
  });

  for (let i = 5; i >= 0; i--) {
    const electricity = 1000 + Math.random() * 2000;
    const subtotal = room.baseRent + electricity;

    const invoice = await prisma.invoice.create({
      data: {
        tenantId: tenant.id,
        leaseId: lease.id,
        billingMonth: monthsAgo(i).getMonth() + 1,
        billingYear: monthsAgo(i).getFullYear(),
        dueDate: monthsAgo(i),
        subtotal,
        totalAmount: subtotal,
        status:
          i === 0
            ? InvoiceStatus.UNPAID
            : i === 1
              ? InvoiceStatus.PARTIAL
              : InvoiceStatus.PAID,
        items: {
          create: [
            {
              description: 'Rent',
              amount: room.baseRent,
              type: PaymentType.RENT,
            },
            {
              description: 'Electricity',
              amount: electricity,
              type: PaymentType.ELECTRICITY,
            },
          ],
        },
      },
    });

    if (i >= 2) {
      await prisma.payment.create({
        data: {
          tenantId: tenant.id,
          invoiceId: invoice.id,
          amount: subtotal,
          type: PaymentType.RENT,
          status: PaymentStatus.SUCCESS,
        },
      });
    }
  }

  await prisma.maintenanceRequest.create({
    data: {
      tenantId: tenant.id,
      roomId: room.id,
      title: 'Water leakage',
      description: 'Bathroom pipe leaking',
      priority: MaintenancePriority.HIGH,
      status: MaintenanceStatus.OPEN,
    },
  });

  return tenant;
}

async function createFamilyFlow(
  tenantName: string,
  room: any,
  building: any,
  organizationId: number,
  index: number,
) {
  const tenant = await createTenantFlow(
    tenantName,
    `90000000${index}`,
    room,
    building,
    organizationId,
    OccupancyType.FAMILY,
  );

  const familySize = 2 + Math.floor(Math.random() * 2);

  for (let i = 0; i < familySize; i++) {
    await prisma.person.create({
      data: {
        fullName: `${tenantName} Member ${i + 1}`,
        relation: i === 0 ? 'SPOUSE' : 'CHILD',
        tenantId: tenant.id,
      },
    });
  }
}

async function createBuildingSystem(
  org: any,
  name: string,
  owner: string,
  manager: string,
  tenants: string[],
) {
  const building = await prisma.building.create({
    data: {
      name,
      address: `${name}, Earth`,
      ownerName: owner,
      organizationId: org.id,
      waterSource: WaterSource.BOTH,
      hasLift: true,
      securityAvailable: true,
      parkingSlots: 100,
      powerBackup: true,
    },
  });

  await createUser(generateEmail(owner, name), owner, UserRole.OWNER, org.id);
  await createUser(
    generateEmail(manager, name),
    manager,
    UserRole.MANAGER,
    org.id,
  );

  const floors = [];

  for (let f = 0; f < 4; f++) {
    floors.push(
      await prisma.floor.create({
        data: {
          name: f === 0 ? 'GROUND' : `FLOOR ${f}`,
          code: f,
          buildingId: building.id,
        },
      }),
    );
  }

  const rooms = [];

  for (const floor of floors) {
    for (let r = 1; r <= 4; r++) {
      const room = await prisma.room.create({
        data: {
          roomNumber: `${floor.code}${String(r).padStart(2, '0')}`,
          baseRent: 15000 + floor.code * 5000,
          floorId: floor.id,
          buildingId: building.id,
        },
      });

      await createMeterWithHistory(room.id, `${name}-${room.roomNumber}`);
      rooms.push(room);
    }
  }

  let i = 0;

  while (i < tenants.length) {
    const room = rooms[i];
    if (!room) break;

    if (Math.random() > 0.8) {
      i++;
      continue;
    }

    const occupancyType =
      Math.random() > 0.7
        ? OccupancyType.FAMILY
        : Math.random() > 0.4
          ? OccupancyType.SHARED
          : OccupancyType.SINGLE;

    if (occupancyType === OccupancyType.SINGLE) {
      await createTenantFlow(
        tenants[i],
        `90000000${i}`,
        room,
        building,
        org.id,
        OccupancyType.SINGLE,
      );
      i++;
    } else if (occupancyType === OccupancyType.SHARED) {
      const groupSize = 2;

      for (let j = 0; j < groupSize; j++) {
        if (!tenants[i + j]) break;

        await createTenantFlow(
          tenants[i + j],
          `90000000${i + j}`,
          room,
          building,
          org.id,
          OccupancyType.SHARED,
        );
      }

      i += groupSize;
    } else {
      await createFamilyFlow(tenants[i], room, building, org.id, i);
      i++;
    }
  }
}

async function main() {
  const org = await prisma.organization.create({
    data: {
      name: 'Multiverse Housing Org',
    },
  });

  for (const b of BUILDINGS) {
    await createBuildingSystem(org, b.name, b.owner, b.manager, b.tenants);
  }

  console.log('🔥 SEED COMPLETE');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
