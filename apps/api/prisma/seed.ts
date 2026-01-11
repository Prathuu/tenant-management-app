import {
  PrismaClient,
  PersonRelation,
  WaterSource,
  PaymentType,
  BillStatus,
} from '@prisma/client';

const prisma = new PrismaClient();

async function seedAvengers() {
  const building = await prisma.building.create({
    data: {
      name: 'Stark Tower',
      address: '200 Park Avenue, New York',
      ownerName: 'Tony Stark',
      hasLift: true,
      parkingSlots: 25,
      powerBackup: true,
      waterSource: WaterSource.BOTH,
      securityAvailable: true,
      yearBuilt: 2012,
    },
  });

  const floors = await Promise.all([
    prisma.floor.create({ data: { name: 'GROUND', code: 0, buildingId: building.id } }),
    prisma.floor.create({ data: { name: 'SECOND', code: 2, buildingId: building.id } }),
    prisma.floor.create({ data: { name: 'THIRD', code: 3, buildingId: building.id } }),
    prisma.floor.create({ data: { name: 'FOURTH', code: 4, buildingId: building.id } }),
  ]);

  const rooms: any[] = [];
  for (const floor of floors) {
    for (let i = 1; i <= 3; i++) {
      rooms.push(
        await prisma.room.create({
          data: {
            roomNumber:
              floor.code === 0
                ? `00${i}`
                : `${floor.code}${String(i).padStart(2, '0')}`,
            baseRent: 22000 + floor.code * 3000,
            floorId: floor.id,
          },
        }),
      );
    }
  }

  const tenants = await Promise.all([
    prisma.tenant.create({ data: { fullName: 'Tony Stark', phone: '9000000001' } }),
    prisma.tenant.create({ data: { fullName: 'Steve Rogers', phone: '9000000002' } }),
    prisma.tenant.create({ data: { fullName: 'Natasha Romanoff', phone: '9000000003' } }),
    prisma.tenant.create({ data: { fullName: 'Bruce Banner', phone: '9000000004' } }),
    prisma.tenant.create({ data: { fullName: 'Peter Parker', phone: '9000000005' } }),
  ]);

  await prisma.person.createMany({
    data: [
      { fullName: 'Pepper Potts', relation: PersonRelation.SPOUSE, tenantId: tenants[0].id },
      { fullName: 'May Parker', relation: PersonRelation.PARENT, tenantId: tenants[4].id },
      { fullName: 'MJ Watson', relation: PersonRelation.SPOUSE, tenantId: tenants[4].id },
    ],
  });

  await prisma.tenantRoom.createMany({
    data: [
      { tenantId: tenants[0].id, roomId: rooms[0].id, agreedRent: 65000, startDate: new Date() },
      { tenantId: tenants[0].id, roomId: rooms[1].id, agreedRent: 55000, startDate: new Date() },

      { tenantId: tenants[1].id, roomId: rooms[3].id, agreedRent: 22000, startDate: new Date() },

      { tenantId: tenants[2].id, roomId: rooms[4].id, agreedRent: 26000, startDate: new Date() },

      { tenantId: tenants[3].id, roomId: rooms[5].id, agreedRent: 24000, startDate: new Date() },

      { tenantId: tenants[4].id, roomId: rooms[6].id, agreedRent: 18000, startDate: new Date() },
    ],
  });

  for (const tenant of tenants) {
    const rooms = await prisma.tenantRoom.findMany({
      where: { tenantId: tenant.id, endDate: null },
    });

    const total = rooms.reduce((s, r) => s + r.agreedRent, 0);

    await prisma.bill.create({
      data: {
        tenantId: tenant.id,
        month: 1,
        year: 2026,
        totalAmount: total,
        status: BillStatus.UNPAID,
      },
    });
  }
}

async function seedJusticeLeague() {
  const building = await prisma.building.create({
    data: {
      name: 'Wayne Manor Residences',
      address: '1007 Mountain Drive, Gotham',
      ownerName: 'Bruce Wayne',
      hasLift: true,
      parkingSlots: 30,
      powerBackup: true,
      waterSource: WaterSource.BOTH,
      securityAvailable: true,
      yearBuilt: 1995,
    },
  });

  const floors = await Promise.all([
    prisma.floor.create({ data: { name: 'GROUND', code: 0, buildingId: building.id } }),
    prisma.floor.create({ data: { name: 'SECOND', code: 2, buildingId: building.id } }),
    prisma.floor.create({ data: { name: 'THIRD', code: 3, buildingId: building.id } }),
  ]);

  const rooms: any[] = [];
  for (const floor of floors) {
    for (let i = 1; i <= 2; i++) {
      rooms.push(
        await prisma.room.create({
          data: {
            roomNumber:
              floor.code === 0
                ? `00${i}`
                : `${floor.code}${String(i).padStart(2, '0')}`,
            baseRent: 20000 + floor.code * 2500,
            floorId: floor.id,
          },
        }),
      );
    }
  }

  const tenants = await Promise.all([
    prisma.tenant.create({ data: { fullName: 'Bruce Wayne', phone: '9000000101' } }),
    prisma.tenant.create({ data: { fullName: 'Clark Kent', phone: '9000000102' } }),
    prisma.tenant.create({ data: { fullName: 'Diana Prince', phone: '9000000103' } }),
    prisma.tenant.create({ data: { fullName: 'Barry Allen', phone: '9000000104' } }),
  ]);

  await prisma.person.createMany({
    data: [
      { fullName: 'Alfred Pennyworth', relation: PersonRelation.PARENT, tenantId: tenants[0].id },
      { fullName: 'Lois Lane', relation: PersonRelation.SPOUSE, tenantId: tenants[1].id },
      { fullName: 'Steve Trevor', relation: PersonRelation.SPOUSE, tenantId: tenants[2].id },
    ],
  });

  await prisma.tenantRoom.createMany({
    data: [
      { tenantId: tenants[0].id, roomId: rooms[0].id, agreedRent: 70000, startDate: new Date() },
      { tenantId: tenants[1].id, roomId: rooms[2].id, agreedRent: 26000, startDate: new Date() },
      { tenantId: tenants[2].id, roomId: rooms[3].id, agreedRent: 30000, startDate: new Date() },
      { tenantId: tenants[3].id, roomId: rooms[4].id, agreedRent: 18000, startDate: new Date() },
    ],
  });
}

async function main() {
  await seedAvengers();
  await seedJusticeLeague();
  console.log('🦸 Avengers + 🦇 Justice League FULL dataset seeded');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
