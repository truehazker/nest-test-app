import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UsersDto } from './dtos/users.dto';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesEnum } from '../roles/constants/roles.const';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<UsersDto[]> {
    return await this.userService.getAll();
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UsersDto> {
    return await this.userService.getById(id);
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() usersEntity: UsersDto,
  ): Promise<UsersDto> {
    return await this.userService.update(id, usersEntity);
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/role/:role')
  async assignRole(
    @Param('id') id: number,
    @Param('role') role: RolesEnum,
  ): Promise<UsersDto> {
    return await this.userService.assignRole(id, role);
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id/role/:role')
  async removeRole(
    @Param('id') id: number,
    @Param('role') role: string,
  ): Promise<UsersDto> {
    return await this.userService.removeRole(id, role);
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.userService.delete(id);
  }
}
