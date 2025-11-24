const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main(){
  await prisma.booking.deleteMany();
  await prisma.post.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  const pw = await bcrypt.hash('password123', 10);

  const alice = await prisma.user.create({
    data: { email: 'alice@example.com', name: 'Alice Wellness', password: pw, bio: 'Yoga instructor' }
  });
  const bob = await prisma.user.create({
    data: { email: 'bob@example.com', name: 'Bob Runner', password: pw, bio: 'Runner & coach' }
  });

  const event = await prisma.event.create({
    data: {
      externalId: 'seed-1',
      externalSource: 'seed',
      title: 'Sunrise Yoga',
      description: 'Vinyasa flow — all levels',
      startAt: new Date(Date.now() + 24*3600*1000),
      endAt: new Date(Date.now() + 25*3600*1000),
      priceCents: 2000,
      capacity: 20,
      lat: 40.7128,
      lng: -74.0060,
      address: 'Central Park',
      hostId: alice.id
    }
  });

  await prisma.booking.create({ data: { userId: bob.id, eventId: event.id, status: 'confirmed' }});
  await prisma.post.createMany({
    data: [
      { authorId: alice.id, content: 'Class tomorrow at sunrise! Bring your mat.' },
      { authorId: bob.id, content: 'Trail run this weekend — join me!' }
    ]
  });

  console.log('Seed complete');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(()=>prisma.$disconnect());