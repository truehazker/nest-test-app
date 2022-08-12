import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesEntity } from './roles.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Get()
  async getAll(): Promise<RolesEntity[]> {
    return await this.roleService.getAll();
  }

  @Get('/:title')
  async getByTitle(@Param('title') title: string): Promise<RolesEntity> {
    return await this.roleService.getByTitle(title);
  }

  @Post()
  async create(@Body() role: RolesEntity): Promise<RolesEntity> {
    return await this.roleService.create(role);
  }
}
