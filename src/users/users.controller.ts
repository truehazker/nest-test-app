import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UsersDto } from './dtos/users.dto';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() usersEntity: UsersDto): Promise<UsersDto> {
    return await this.userService.create(usersEntity);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<UsersDto[]> {
    return await this.userService.getAll();
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UsersDto> {
    return await this.userService.getById(id);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() usersEntity: UsersDto,
  ): Promise<UsersDto> {
    return await this.userService.update(id, usersEntity);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/:role')
  async assignRole(
    @Param('id') id: number,
    @Param('role') role: string,
  ): Promise<UsersDto> {
    return await this.userService.assignRole(id, role);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id/:role')
  async removeRole(
    @Param('id') id: number,
    @Param('role') role: string,
  ): Promise<UsersDto> {
    return await this.userService.removeRole(id, role);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.userService.delete(id);
  }
}
