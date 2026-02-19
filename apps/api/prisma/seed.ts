import {
  PrismaClient,
  WaterSource,
  InvoiceStatus,
  PaymentType,
  PaymentStatus,
  LeaseStatus,
} from '@prisma/client';

const prisma = new PrismaClient();

const BILL_MONTH = 1;
const BILL_YEAR = 2026;

async function createBuildingWithTenants(
  buildingName: string,
  ownerName: string,
  tenantsData: { name: string; phone: string }[],
) {
  const building = await prisma.building.create({
    data: {
      name: buildingName,
      address: `${buildingName} Address`,
      ownerName,
      waterSource: WaterSource.BOTH,
      hasLift: true,
      securityAvailable: true,
      powerBackup: true,
    },
  });

  const floors = await Promise.all(
    [0, 1, 2].map((code) =>
      prisma.floor.create({
        data: {
          name: code === 0 ? 'GROUND' : `FLOOR ${code}`,
          code,
          buildingId: building.id,
        },
      }),
    ),
  );

  const rooms: {
    room: any;
    meter: any;
  }[] = [];

  for (const floor of floors) {
    for (let i = 1; i <= 3; i++) {
      const room = await prisma.room.create({
        data: {
          roomNumber: `${floor.code}${String(i).padStart(2, '0')}`,
          baseRent: 20000 + floor.code * 5000,
          floorId: floor.id,
        },
      });

      const meter = await prisma.meter.create({
        data: {
          meterNumber: `${buildingName}-${room.roomNumber}`,
          roomId: room.id,
        },
      });

      // initial meter reading
      await prisma.meterReading.create({
        data: {
          meterId: meter.id,
          reading: Math.floor(Math.random() * 1000) + 1000,
          readingDate: new Date(),
        },
      });

      rooms.push({ room, meter });
    }
  }

  const tenants = [];

  for (const t of tenantsData) {
    const tenant = await prisma.tenant.create({
      data: {
        fullName: t.name,
        phone: t.phone,
      },
    });

    tenants.push(tenant);
  }

  for (let i = 0; i < tenants.length; i++) {
    const tenant = tenants[i];
    const roomData = rooms[i];

    // Create TenantRoom (occupancy)
    const tenantRoom = await prisma.tenantRoom.create({
      data: {
        tenantId: tenant.id,
        roomId: roomData.room.id,
        agreedRent: roomData.room.baseRent,
        startDate: new Date(),
      },
    });

    // Create Lease (correct structure)
    const lease = await prisma.lease.create({
      data: {
        tenantRoomId: tenantRoom.id,
        rentAmount: roomData.room.baseRent,
        depositAmount: roomData.room.baseRent * 2,
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        status: LeaseStatus.ACTIVE,
      },
    });

    const electricityAmount = Math.floor(Math.random() * 3000) + 1000;

    // Create Invoice
    const invoice = await prisma.invoice.create({
      data: {
        tenantId: tenant.id,
        leaseId: lease.id,
        billingMonth: BILL_MONTH,
        billingYear: BILL_YEAR,
        dueDate: new Date(),
        subtotal: roomData.room.baseRent + electricityAmount,
        totalAmount: roomData.room.baseRent + electricityAmount,
        status: InvoiceStatus.UNPAID,

        items: {
          create: [
            {
              description: 'Rent',
              amount: roomData.room.baseRent,
              type: PaymentType.RENT,
            },
            {
              description: 'Electricity',
              amount: electricityAmount,
              type: PaymentType.ELECTRICITY,
            },
          ],
        },
      },
    });

    // Create Payment
    await prisma.payment.create({
      data: {
        tenantId: tenant.id,
        invoiceId: invoice.id,
        amount: roomData.room.baseRent,
        type: PaymentType.RENT,
        status: PaymentStatus.SUCCESS,
      },
    });
  }
}

async function main() {
  console.log('Seeding Avengers...');

  await createBuildingWithTenants('Stark Tower', 'Tony Stark', [
    { name: 'Tony Stark', phone: '9000000001' },
    { name: 'Steve Rogers', phone: '9000000002' },
    { name: 'Natasha Romanoff', phone: '9000000003' },
    { name: 'Bruce Banner', phone: '9000000004' },
    { name: 'Peter Parker', phone: '9000000005' },
  ]);

  console.log('Seeding Justice League...');

  await createBuildingWithTenants('Wayne Manor', 'Bruce Wayne', [
    { name: 'Bruce Wayne', phone: '9000000101' },
    { name: 'Clark Kent', phone: '9000000102' },
    { name: 'Diana Prince', phone: '9000000103' },
    { name: 'Barry Allen', phone: '9000000104' },
    { name: 'Arthur Curry', phone: '9000000105' },
  ]);

  console.log('Seeding complete.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
