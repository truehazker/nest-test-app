import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesDto } from './dtos/roles.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesEnum } from './constants/roles.const';
import { RolesEntity } from './roles.entity';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiBody({ type: RolesDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully created',
    type: RolesDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Role with this title already exists',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() role: RolesDto): Promise<RolesEntity> {
    return await this.roleService.create(role);
  }

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'All roles',
    type: [RolesDto],
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll(): Promise<RolesEntity[]> {
    return await this.roleService.getAll();
  }

  @ApiOperation({ summary: 'Get role by title' })
  @ApiResponse({
    status: 200,
    description: 'Found role',
    type: RolesDto,
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('title/:title')
  async getByTitle(@Param('title') title: RolesEnum): Promise<RolesEntity> {
    return await this.roleService.getByTitle(title);
  }

  @ApiOperation({ summary: 'Get role by id' })
  @ApiResponse({
    status: 200,
    description: 'Found role',
    type: RolesDto,
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('id/:id')
  async getById(@Param('id') id: number): Promise<RolesEntity> {
    return await this.roleService.getById(id);
  }

  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({
    status: 200,
    description: 'Updated role',
    type: RolesDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() role: RolesDto,
  ): Promise<RolesEntity> {
    return await this.roleService.update(id, role);
  }

  @ApiOperation({ summary: 'Delete role' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<RolesEntity> {
    return await this.roleService.delete(id);
  }
}
