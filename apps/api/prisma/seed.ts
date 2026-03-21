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
} from '@prisma/client';

import * as bcrypt from 'bcrypt';

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
      tenantId: tenant.id,
      roomId: room.id,
      buildingId: building.id,
      agreedRent: room.baseRent,
      startDate: monthsAgo(6),
    },
  });

  await prisma.room.update({
    where: { id: room.id },
    data: { isOccupied: true },
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

  // invoices
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

  for (let i = 0; i < tenants.length; i++) {
    if (Math.random() > 0.8) continue; // some rooms vacant
    await createTenantFlow(
      tenants[i],
      `90000000${i}`,
      rooms[i],
      building,
      org.id,
    );
  }
}

async function main() {
  const org = await prisma.organization.create({
    data: {
      name: 'Multiverse Housing Org',
    },
  });

  // 🦸 MARVEL
  await createBuildingSystem(org, 'Stark Tower', 'Tony Stark', 'Pepper Potts', [
    'Steve Rogers',
    'Natasha Romanoff',
    'Bruce Banner',
    'Thor Odinson',
    'Clint Barton',
    'Wanda Maximoff',
    'Vision',
    'Peter Parker',
  ]);

  await createBuildingSystem(
    org,
    'Xavier Institute',
    'Charles Xavier',
    'Logan',
    ['Jean Grey', 'Cyclops', 'Storm', 'Beast', 'Rogue', 'Gambit'],
  );

  // 🦇 DC
  await createBuildingSystem(org, 'Wayne Manor', 'Bruce Wayne', 'Alfred', [
    'Clark Kent',
    'Diana Prince',
    'Barry Allen',
    'Hal Jordan',
    'Arthur Curry',
  ]);

  await createBuildingSystem(org, 'Daily Planet', 'Perry White', 'Lois Lane', [
    'Jimmy Olsen',
    'Lex Luthor',
    'Supergirl',
    'Zatanna',
  ]);

  // 🏴‍☠️ ONE PIECE
  await createBuildingSystem(
    org,
    'Going Merry Residency',
    'Monkey D. Luffy',
    'Nami',
    [
      'Roronoa Zoro',
      'Usopp',
      'Sanji',
      'Tony Tony Chopper',
      'Nico Robin',
      'Franky',
      'Brook',
      'Jinbe',
    ],
  );

  // 🍥 NARUTO
  await createBuildingSystem(
    org,
    'Hidden Leaf Apartments',
    'Naruto Uzumaki',
    'Shikamaru',
    [
      'Sasuke Uchiha',
      'Sakura Haruno',
      'Kakashi Hatake',
      'Hinata Hyuga',
      'Rock Lee',
      'Neji Hyuga',
    ],
  );

  // ⚡ JJK
  await createBuildingSystem(
    org,
    'Tokyo Jujutsu Dorms',
    'Satoru Gojo',
    'Nanami',
    [
      'Yuji Itadori',
      'Megumi Fushiguro',
      'Nobara Kugisaki',
      'Yuta Okkotsu',
      'Maki Zenin',
    ],
  );

  console.log('🔥 MULTIVERSE SEED COMPLETE');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
