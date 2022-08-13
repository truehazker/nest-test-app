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
import { ApiTags } from '@nestjs/swagger';
import { RolesDto } from './dtos/roles.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() role: RolesDto): Promise<RolesDto> {
    return await this.roleService.create(role);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll(): Promise<RolesDto[]> {
    return await this.roleService.getAll();
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:title')
  async getByTitle(@Param('title') title: string): Promise<RolesDto> {
    title = title.toUpperCase();
    return await this.roleService.getByTitle(title);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() role: RolesDto,
  ): Promise<RolesDto> {
    return await this.roleService.update(id, role);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<RolesDto> {
    return await this.roleService.delete(id);
  }
}
