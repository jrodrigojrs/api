// auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { JwtStrategy } from './jwt/jwt.strategy.js';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // Use a secret from environment variables
      signOptions: { expiresIn: '1d' }, // expiração do token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, JwtStrategy],
  exports: [AuthGuard, AuthService, JwtModule], // Exportando AuthService e JwtModule para serem usados em outros módulos
})
export class AuthModule {}
