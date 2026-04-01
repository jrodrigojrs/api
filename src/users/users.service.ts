import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UserDto } from './dto/user.dto.js';
import { UpdateUserDto } from './dto/updateUser.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserDto[]> {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllActive(): Promise<UserDto[]> {
    return this.prisma.user.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      if (data.pin) {
        data.pin = await bcrypt.hash(data.pin, 10);
      }

      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({
        where: { id },
      });

      return { message: 'User deleted' };
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}
