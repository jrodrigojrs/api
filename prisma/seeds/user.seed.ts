import { PrismaClient, Role } from '@/generated/prisma/client.js';
import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: PrismaClient) {
  console.log('🌱 Seeding users...');

  // 🔐 dados via env (fallback padrão)
  const adminEmail = 'admin@gmail.com';
  const testEmail = 'user@gmail.com';

  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin';
  const adminPin = process.env.ADMIN_PIN ?? '1234';

  const userPassword = process.env.USER_PASSWORD ?? 'user';
  const userPin = process.env.USER_PIN ?? '1234';

  // ⚡ hash em paralelo
  const [
    adminHashedPassword,
    adminHashedPin,
    userHashedPassword,
    userHashedPin,
  ] = await Promise.all([
    bcrypt.hash(adminPassword, 10),
    bcrypt.hash(adminPin, 10),
    bcrypt.hash(userPassword, 10),
    bcrypt.hash(userPin, 10),
  ]);

  // 👑 ADMIN
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Admin',
      email: adminEmail,
      password: adminHashedPassword,
      pin: adminHashedPin,
      role: Role.ADMIN,
      isActive: true,
    },
  });

  // 👤 USER TESTE
  await prisma.user.upsert({
    where: { email: testEmail },
    update: {},
    create: {
      name: 'Usuário Teste',
      email: testEmail,
      password: userHashedPassword,
      pin: userHashedPin,
      role: Role.USER,
      isActive: true,
    },
  });

  console.log('✅ Admin e usuário de teste garantidos');
}
