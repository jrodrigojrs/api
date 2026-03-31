import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import * as bcrypt from 'bcrypt';

type SafeUser = Omit<CreateUserDto, 'password'>;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // 🔹 FIND ALL
  async findAll(): Promise<SafeUser[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return users.map((user) => this.removePassword(user));
  }

  // 🔹 FIND ONE
  async findOne(id: string): Promise<SafeUser> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.removePassword(user);
  }

  // 🔹 FIND BY EMAIL (para auth)
  async findByEmail(email: string): Promise<CreateUserDto | null> {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  // 🔹 UPDATE
  async update(id: string, updateUserDto: UpdateUserDto): Promise<SafeUser> {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const data: UpdateUserDto = {
      ...updateUserDto,
    };

    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    if (updateUserDto.email) {
      data.email = updateUserDto.email.toLowerCase();
    }

    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return this.removePassword(user);
  }

  // 🔹 DELETE
  async remove(id: string): Promise<{ message: string }> {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'Usuário removido com sucesso' };
  }

  // 🔒 REMOVE PASSWORD (tipado)
  private removePassword(user: CreateUserDto): SafeUser {
    return user;
  }
}
