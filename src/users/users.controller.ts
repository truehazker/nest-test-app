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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersEntity } from './users.entity';
import { UsersDto } from './dtos/users.dto';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({
    summary: 'Create a user',
  })
  @ApiResponse({
    status: 201,
    description: 'The created user',
    type: UsersEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() usersEntity: UsersDto): Promise<UsersDto> {
    return await this.userService.create(usersEntity);
  }

  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    description: 'The found users',
    type: [UsersEntity],
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<UsersDto[]> {
    return await this.userService.getAll();
  }

  @ApiOperation({
    summary: 'Get a user by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The found user',
    type: UsersEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UsersDto> {
    return await this.userService.getById(id);
  }

  @ApiOperation({
    summary: 'Update a user',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated user',
    type: UsersEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() usersEntity: UsersDto,
  ): Promise<UsersDto> {
    return await this.userService.update(id, usersEntity);
  }

  @ApiOperation({
    summary: 'Assign a role to a user',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated user',
    type: UsersEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/:role')
  async assignRole(
    @Param('id') id: number,
    @Param('role') role: string,
  ): Promise<UsersDto> {
    return await this.userService.assignRole(id, role);
  }

  @ApiOperation({
    summary: 'Remove the role from the user',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated user',
    type: UsersEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id/:role')
  async removeRole(
    @Param('id') id: number,
    @Param('role') role: string,
  ): Promise<UsersDto> {
    return await this.userService.removeRole(id, role);
  }

  @ApiOperation({
    summary: 'Delete a user',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.userService.delete(id);
  }
}
