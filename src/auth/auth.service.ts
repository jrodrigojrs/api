// auth.service.ts
import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto.js';
import { SignUpDto } from './dto/signup.dto.js';

@Injectable()
export class AuthService {
  async signin(data: SignInDto) {
    // lógica: validar usuário, gerar JWT
    return { message: 'signin' };
  }

  async signup(data: SignUpDto) {
    // lógica: criar usuário
    return { message: 'signup' };
  }
}
