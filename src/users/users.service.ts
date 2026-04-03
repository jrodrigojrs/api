import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserDto } from './dto/updateUser.dto.js';
import { UserDto, UserRole } from './dto/user.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Omit<UserDto, 'password' | 'pin'>[]> {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
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

  async findEmail(email: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    if (data.pin) {
      data.pin = await bcrypt.hash(data.pin, 10);
    }

    if (data.role) {
      const role = data.role.toUpperCase();

      if (!Object.values(UserRole).includes(role as UserRole)) {
        throw new NotFoundException('Invalid role');
      }

      data.role = role as UserRole;
    }

    const isUser = await this.findOne(id); // Check if user exists

    if (isUser) {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    }

    throw new NotFoundException('User not found');
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
