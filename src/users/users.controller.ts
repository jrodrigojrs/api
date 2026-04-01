import { Body, Controller, Get, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UpdateUserDto } from './dto/updateUser.dto.js';
import { UserRole } from './dto/user.dto.js';
import { Roles } from './../common/decorators/roles.decorator.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get()
  async findAllActive() {
    return this.usersService.findAllActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
