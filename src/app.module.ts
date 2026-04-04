import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import jwtConfig from './config/jwt/jwt.config.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';

const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [jwtConfig as any],
};

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    PrismaModule, // 🔥 aqui
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
