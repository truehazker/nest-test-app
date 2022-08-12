import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiTags } from '@nestjs/swagger';
import { RoleDTO } from '../dtos/role.dto';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Get()
  async getAll(): Promise<RoleDTO[]> {
    return await this.roleService.getAll();
  }

  @Get('/:title')
  async getByTitle(@Param('title') title: string): Promise<RoleDTO> {
    title = title.toUpperCase();
    return await this.roleService.getByTitle(title);
  }

  @Post()
  async create(@Body() role: RoleDTO): Promise<RoleDTO> {
    return await this.roleService.create(role);
  }
}
