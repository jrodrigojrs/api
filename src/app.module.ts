import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    PrismaModule, // 🔥 aqui
    UsersModule,
  ],
})
export class AppModule {}
