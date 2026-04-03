import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)], // 🔥 ESSENCIAL
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, AuthModule], // 🔥 ESSENCIAL
})
export class UsersModule {}
