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
import { ApiTags } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { AuthorsEntity } from './authors.entity';
import { AuthorsDto } from './dtos/authors.dto';
import { Roles } from '../roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { RolesEnum } from '../roles/constants/roles.const';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: AuthorsDto): Promise<AuthorsEntity> {
    return await this.authorsService.create(dto);
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<AuthorsEntity[]> {
    return await this.authorsService.getAll();
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<AuthorsEntity> {
    return await this.authorsService.getById(id);
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/surname/:surname')
  async findBySurname(
    @Param('surname') surname: string,
  ): Promise<AuthorsEntity> {
    return await this.authorsService.getBySurname(surname);
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: AuthorsDto,
  ): Promise<AuthorsEntity> {
    return await this.authorsService.update(id, dto);
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.authorsService.delete(id);
  }
}
