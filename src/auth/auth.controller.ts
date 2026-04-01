// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';

import { SignInDto } from './dto/signin.dto.js';
import { SignUpDto } from './dto/signup.dto.js';

@Controller('auth') // rota base: /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() data: SignInDto) {
    return this.authService.signin(data);
  }

  @Post('signup')
  signup(@Body() data: SignUpDto) {
    return this.authService.signup(data);
  }
}
