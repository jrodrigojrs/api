import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignInDto } from './dto/signin.dto.js';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK) // Retorna 200 OK em vez de 201 Created
  async signin(@Body() { email, password }: SignInDto) {
    return await this.authService.signIn(email, password);
  }
}
