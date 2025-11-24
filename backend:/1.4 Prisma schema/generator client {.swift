generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String   @id @default(uuid())
  email        String   @unique
  name         String?
  password     String
  bio          String?  @default("")
  profileImage String?  @default("")
  createdAt    DateTime @default(now())

  events       Event[]  @relation("hostEvents")
  bookings     Booking[]
  posts        Post[]
}

model Event {
  id             String   @id @default(uuid())
  externalId     String?
  externalSource String?
  title          String
  description    String?
  category       String?
  startAt        DateTime
  endAt          DateTime?
  priceCents     Int      @default(0)
  capacity       Int?
  lat            Float?
  lng            Float?
  address        String?
  hostId         String?
  host           User?    @relation(fields: [hostId], references: [id], name: "hostEvents")
  createdAt      DateTime @default(now())
  bookings       Booking[]

  @@unique([externalId, externalSource])
}

model Booking {
  id         String   @id @default(uuid())
  userId     String
  eventId    String
  status     String   @default("pending")
  createdAt  DateTime @default(now())
  user       User     @relation(fields: [userId], references: [id])
  event      Event    @relation(fields: [eventId], references: [id])
}

model Post {
  id        String   @id @default(uuid())
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  content   String
  imageUrl  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}