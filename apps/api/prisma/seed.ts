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

async function createUser(
  email: string,
  name: string,
  role: UserRole,
  tenantId?: number,
) {
  return prisma.user.create({
    data: {
      email,
      password: await hash('password123'),
      name,
      role,
      tenantId,
    },
  });
}

async function createMeterWithHistory(roomId: number, meterNumber: string) {
  const meter = await prisma.meter.create({
    data: {
      meterNumber,
      roomId,
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

  return meter;
}

async function createTenantFlow(
  tenantName: string,
  phone: string,
  roomId: number,
  buildingName: string,
  rent: number,
) {
  const tenant = await prisma.tenant.create({
    data: {
      fullName: tenantName,
      phone,
    },
  });

  await createUser(
    `${tenantName.replace(' ', '').toLowerCase()}@${buildingName}.com`,
    tenantName,
    UserRole.TENANT,
    tenant.id,
  );

  const tenantRoom = await prisma.tenantRoom.create({
    data: {
      tenantId: tenant.id,
      roomId,
      agreedRent: rent,
      startDate: monthsAgo(6),
    },
  });

  const lease = await prisma.lease.create({
    data: {
      tenantRoomId: tenantRoom.id,
      rentAmount: rent,
      depositAmount: rent * 2,
      startDate: monthsAgo(6),
      endDate: monthsLater(6),
      status: LeaseStatus.ACTIVE,
    },
  });

  // create invoices history
  for (let i = 5; i >= 0; i--) {
    const electricity = 1000 + Math.random() * 2000;

    const subtotal = rent + electricity;

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
              amount: rent,
              type: PaymentType.RENT,
            },
            {
              description: 'Electricity',
              amount: electricity,
              type: PaymentType.ELECTRICITY,
            },
            ...(i === 0
              ? [
                  {
                    description: 'Penalty',
                    amount: 500,
                    type: PaymentType.PENALTY,
                  },
                ]
              : []),
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
          transactionId: `TXN-${Math.random()}`,
        },
      });
    }

    if (i === 1) {
      await prisma.payment.create({
        data: {
          tenantId: tenant.id,
          invoiceId: invoice.id,
          amount: rent,
          type: PaymentType.RENT,
          status: PaymentStatus.SUCCESS,
        },
      });
    }
  }

  // maintenance requests
  await prisma.maintenanceRequest.create({
    data: {
      tenantId: tenant.id,
      roomId,
      title: 'Water leakage',
      description: 'Bathroom pipe leaking',
      priority: MaintenancePriority.HIGH,
      status: MaintenanceStatus.OPEN,
    },
  });

  await prisma.maintenanceRequest.create({
    data: {
      tenantId: tenant.id,
      roomId,
      title: 'AC repair',
      description: 'AC not cooling',
      priority: MaintenancePriority.MEDIUM,
      status: MaintenanceStatus.RESOLVED,
    },
  });

  return tenant;
}

async function createBuildingSystem(
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
      waterSource: WaterSource.BOTH,
      hasLift: true,
      securityAvailable: true,
      parkingSlots: 100,
      powerBackup: true,
    },
  });

  await createUser(`${owner}@${name}.com`, owner, UserRole.OWNER);
  await createUser(`${manager}@${name}.com`, manager, UserRole.MANAGER);

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
        },
      });

      await createMeterWithHistory(room.id, `${name}-${room.roomNumber}`);

      rooms.push(room);
    }
  }

  for (let i = 0; i < tenants.length; i++) {
    await createTenantFlow(
      tenants[i],
      `90000000${i}`,
      rooms[i].id,
      name,
      rooms[i].baseRent,
    );
  }
}

async function main() {
  // MARVEL SIDE
  await createBuildingSystem('Stark Tower', 'Tony Stark', 'Pepper Potts', [
    'Steve Rogers',
    'Natasha Romanoff',
    'Bruce Banner',
    'Thor Odinson',
    'Peter Parker',
    'Wanda Maximoff',
  ]);

  await createBuildingSystem('Avengers Compound', 'Tony Stark', 'Nick Fury', [
    'Clint Barton',
    'Sam Wilson',
    'Bucky Barnes',
    'Vision',
    'Scott Lang',
    'Carol Danvers',
  ]);

  await createBuildingSystem(
    'Xavier Institute',
    'Charles Xavier',
    'Hank McCoy',
    ['Jean Grey', 'Scott Summers', 'Logan', 'Storm', 'Rogue', 'Nightcrawler'],
  );

  // DC SIDE
  await createBuildingSystem(
    'Wayne Manor',
    'Bruce Wayne',
    'Alfred Pennyworth',
    [
      'Clark Kent',
      'Diana Prince',
      'Barry Allen',
      'Arthur Curry',
      'Hal Jordan',
      'Victor Stone',
    ],
  );

  await createBuildingSystem(
    'Wayne Enterprises Tower',
    'Bruce Wayne',
    'Lucius Fox',
    [
      'Selina Kyle',
      'Jason Todd',
      'Dick Grayson',
      'Tim Drake',
      'Barbara Gordon',
    ],
  );

  await createBuildingSystem('Daily Planet', 'Bruce Wayne', 'Lois Lane', [
    'Jimmy Olsen',
    'Kara Danvers',
    'Oliver Queen',
    'John Constantine',
  ]);

  console.log('🔥 FULL CINEMATIC UNIVERSE SEEDED SUCCESSFULLY');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
