import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from 'src/guard/admin/admin.guard';
import { JwtAuthGuard } from 'src/guard/jwt-guard/jwt-auth.guard';

@Controller('user')
@UseGuards(AdminGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id/role')
  async updateRole(@Param('id') id: number, @Body('role') role: string) {
    return this.userService.updateRole(id, role);
  }
}
