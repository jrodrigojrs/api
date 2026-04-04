// auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret') || 'secret_default',
        signOptions: {
          expiresIn:
            (configService.get<string>('jwt.expiresIn') as StringValue) ||
            '30s',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, AuthService, JwtModule], // Exportando AuthService e JwtModule para serem usados em outros módulos
})
export class AuthModule {}
