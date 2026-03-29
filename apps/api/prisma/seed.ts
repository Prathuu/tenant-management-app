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

// ---------------- UTILS ----------------

const hash = (p: string) => bcrypt.hash(p, SALT);

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const monthsAgo = (n: number) => new Date(Date.now() - n * 30 * 86400000);

const monthsLater = (n: number) => new Date(Date.now() + n * 30 * 86400000);

const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const generateEmail = (name: string, building: string) =>
  `${name.toLowerCase().replace(/\s+/g, '.')}.${building
    .toLowerCase()
    .replace(/\s+/g, '')}@app.com`;

// ---------------- USERS ----------------

async function createUser(
  email: string,
  name: string,
  role: UserRole,
  orgId: number,
  tenantId?: number,
) {
  return prisma.user.create({
    data: {
      email,
      password: await hash('password123'),
      name,
      role,
      organizationId: orgId,
      tenantId,
    },
  });
}

// ---------------- METERS ----------------

async function createMeters(roomId: number, base: string) {
  const types = [MeterType.ELECTRICITY, MeterType.WATER];

  for (const type of types) {
    const meter = await prisma.meter.create({
      data: {
        meterNumber: `${base}-${type}`,
        roomId,
        type,
      },
    });

    let reading = rand(500, 1000);

    for (let i = 6; i >= 0; i--) {
      reading += rand(50, 200);

      await prisma.meterReading.create({
        data: {
          meterId: meter.id,
          reading,
          readingDate: monthsAgo(i),
        },
      });
    }
  }
}

// ---------------- PAYMENTS ----------------

function randomPaymentStatus() {
  const r = Math.random();
  if (r > 0.8) return PaymentStatus.FAILED;
  if (r > 0.6) return PaymentStatus.PENDING;
  return PaymentStatus.SUCCESS;
}

// ---------------- TENANT FLOW ----------------

async function assignTenantToRoom(
  tenantId: number,
  room: any,
  building: any,
  occupancyType: OccupancyType,
) {
  const startOffset = rand(0, 6);

  const tenantRoom = await prisma.tenantRoom.create({
    data: {
      tenantId,
      roomId: room.id,
      buildingId: building.id,
      agreedRent: room.baseRent,
      startDate: monthsAgo(startOffset),
      occupancyType,
    },
  });

  // mark occupied
  await prisma.room.update({
    where: { id: room.id },
    data: { isOccupied: true },
  });

  return tenantRoom;
}

async function createTenant(
  name: string,
  phone: string,
  orgId: number,
  building: any,
) {
  const tenant = await prisma.tenant.create({
    data: {
      fullName: name,
      phone,
      organizationId: orgId,
    },
  });

  await createUser(
    generateEmail(name, building.name),
    name,
    UserRole.TENANT,
    orgId,
    tenant.id,
  );

  return tenant;
}

// ---------------- LEASE + BILLING ----------------

async function createLeaseAndBilling(tenant: any, tenantRoom: any, room: any) {
  const leaseStatus =
    Math.random() > 0.8 ? LeaseStatus.ENDED : LeaseStatus.ACTIVE;

  const lease = await prisma.lease.create({
    data: {
      tenantRoomId: tenantRoom.id,
      rentAmount: room.baseRent,
      depositAmount: room.baseRent * 2,
      startDate: tenantRoom.startDate,
      endDate:
        leaseStatus === LeaseStatus.ENDED ? monthsAgo(1) : monthsLater(6),
      status: leaseStatus,
    },
  });

  for (let i = 5; i >= 0; i--) {
    const electricity = rand(500, 2000);
    const water = rand(200, 800);

    const subtotal = room.baseRent + electricity + water;

    const invoice = await prisma.invoice.create({
      data: {
        tenantId: tenant.id,
        leaseId: lease.id,
        billingMonth: monthsAgo(i).getMonth() + 1,
        billingYear: monthsAgo(i).getFullYear(),
        dueDate: monthsAgo(i),
        subtotal,
        totalAmount: subtotal,
        status: pick([
          InvoiceStatus.PAID,
          InvoiceStatus.PARTIAL,
          InvoiceStatus.UNPAID,
        ]),
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
            { description: 'Water', amount: water, type: PaymentType.WATER },
          ],
        },
      },
    });

    const status = randomPaymentStatus();

    await prisma.payment.create({
      data: {
        tenantId: tenant.id,
        invoiceId: invoice.id,
        amount:
          status === PaymentStatus.SUCCESS
            ? subtotal
            : subtotal * Math.random(),
        type: PaymentType.RENT,
        status,
        paymentDate: monthsAgo(i - rand(0, 2)),
      },
    });
  }
}

// ---------------- MAINTENANCE ----------------

async function createMaintenance(tenant: any, room: any) {
  const issues = [
    'Water leakage',
    'AC not working',
    'Fan issue',
    'Pipe blockage',
    'Power outage',
  ];

  const count = rand(1, 3);

  for (let i = 0; i < count; i++) {
    await prisma.maintenanceRequest.create({
      data: {
        tenantId: tenant.id,
        roomId: room.id,
        title: pick(issues),
        description: 'Auto-generated issue',
        priority: pick(Object.values(MaintenancePriority)),
        status: pick(Object.values(MaintenanceStatus)),
      },
    });
  }
}

// ---------------- BUILDING ----------------

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
      parkingSlots: 50,
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

  // floors + rooms
  const rooms: any[] = [];

  for (let f = 0; f < 4; f++) {
    const floor = await prisma.floor.create({
      data: {
        name: f === 0 ? 'GROUND' : `FLOOR ${f}`,
        code: f,
        buildingId: building.id,
      },
    });

    for (let r = 1; r <= 4; r++) {
      const room = await prisma.room.create({
        data: {
          roomNumber: `${f}${String(r).padStart(2, '0')}`,
          baseRent: 12000 + f * 3000,
          floorId: floor.id,
          buildingId: building.id,
        },
      });

      await createMeters(room.id, `${name}-${room.roomNumber}`);
      rooms.push(room);
    }
  }

  // tenant allocation
  let i = 0;

  while (i < tenants.length) {
    const room = pick(rooms);
    const occupancy = pick(Object.values(OccupancyType));

    if (occupancy === OccupancyType.SINGLE) {
      const tenant = await createTenant(
        tenants[i],
        `9000${i}`,
        org.id,
        building,
      );

      const tr = await assignTenantToRoom(tenant.id, room, building, occupancy);

      await createLeaseAndBilling(tenant, tr, room);
      await createMaintenance(tenant, room);

      i++;
    } else if (occupancy === OccupancyType.SHARED) {
      const groupSize = rand(2, 3);

      for (let j = 0; j < groupSize && tenants[i]; j++) {
        const tenant = await createTenant(
          tenants[i],
          `9000${i}`,
          org.id,
          building,
        );

        const tr = await assignTenantToRoom(
          tenant.id,
          room,
          building,
          occupancy,
        );

        await createLeaseAndBilling(tenant, tr, room);
        await createMaintenance(tenant, room);

        i++;
      }
    } else {
      const tenant = await createTenant(
        tenants[i],
        `9000${i}`,
        org.id,
        building,
      );

      const tr = await assignTenantToRoom(tenant.id, room, building, occupancy);

      // family members
      const size = rand(2, 4);

      for (let k = 0; k < size; k++) {
        await prisma.person.create({
          data: {
            fullName: `${tenants[i]} Member ${k + 1}`,
            relation: k === 0 ? 'SPOUSE' : 'CHILD',
            tenantId: tenant.id,
          },
        });
      }

      await createLeaseAndBilling(tenant, tr, room);
      await createMaintenance(tenant, room);

      i++;
    }
  }

  // stats
  const totalRooms = await prisma.room.count({
    where: { buildingId: building.id },
  });
  const occupiedRooms = await prisma.room.count({
    where: { buildingId: building.id, isOccupied: true },
  });

  const totalTenants = await prisma.tenant.count({
    where: { organizationId: org.id },
  });

  await prisma.buildingStats.create({
    data: {
      buildingId: building.id,
      totalRooms,
      occupiedRooms,
      totalTenants,
      totalResidents: totalTenants * 2,
    },
  });
}

// ---------------- MAIN ----------------

async function main() {
  const org = await prisma.organization.create({
    data: { name: 'Multiverse Housing Org' },
  });

  for (const b of BUILDINGS) {
    await createBuildingSystem(org, b.name, b.owner, b.manager, b.tenants);
  }

  console.log('🔥 REALISTIC SEED COMPLETE');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
