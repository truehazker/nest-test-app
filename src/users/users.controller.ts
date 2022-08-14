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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesEnum } from '../roles/constants/roles.const';
import { UsersEntity } from './users.entity';
import { UsersUpdateDto } from './dtos/users-update.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'All users',
    type: [UsersEntity],
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll(): Promise<UsersEntity[]> {
    return await this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'Found user',
    type: UsersEntity,
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UsersEntity> {
    return await this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated user',
    type: UsersEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() usersEntity: UsersUpdateDto,
  ): Promise<UsersEntity> {
    return await this.userService.update(id, usersEntity);
  }

  @ApiOperation({ summary: 'Assign role to user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully assigned role',
    type: UsersEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/role/:role')
  async assignRole(
    @Param('id') id: number,
    @Param('role') role: RolesEnum,
  ): Promise<UsersEntity> {
    return await this.userService.assignRole(id, role);
  }

  @ApiOperation({ summary: 'Remove role from user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully removed role',
    type: UsersEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id/role/:role')
  async removeRole(
    @Param('id') id: number,
    @Param('role') role: string,
  ): Promise<UsersEntity> {
    return await this.userService.removeRole(id, role);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted user',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.userService.delete(id);
  }
}
