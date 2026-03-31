import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global() // 🔥 deixa disponível em toda aplicação
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
