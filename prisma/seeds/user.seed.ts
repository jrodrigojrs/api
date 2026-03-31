import { PrismaClient } from '@/generated/prisma/client.js';
import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: PrismaClient) {
  console.log('🌱 Seeding users...');

  const adminEmail = 'admin@gmail.com';

  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existing) {
    const hashedPassword = await bcrypt.hash('admin', 10);

    await prisma.user.create({
      data: {
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        pin: '1234',
        role: 'ADMIN',
        active: true,
      },
    });

    console.log('✅ Admin criado');
  } else {
    console.log('ℹ️ Admin já existe');
  }
}
