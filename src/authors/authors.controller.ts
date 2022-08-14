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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { AuthorsEntity } from './authors.entity';
import { AuthorsDto } from './dtos/authors.dto';
import { Roles } from '../roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/guards/roles.guard';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @ApiOperation({
    summary: 'Create the author',
  })
  @ApiResponse({
    status: 201,
    description: 'The created author',
    type: AuthorsEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: AuthorsDto): Promise<AuthorsEntity> {
    return await this.authorsService.create(dto);
  }

  @ApiOperation({
    summary: 'Get all authors',
  })
  @ApiResponse({
    status: 200,
    description: 'The authors',
    type: [AuthorsEntity],
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<AuthorsEntity[]> {
    return await this.authorsService.getAll();
  }

  @ApiOperation({
    summary: 'Get an author by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The found author',
    type: AuthorsEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<AuthorsEntity> {
    return await this.authorsService.getById(id);
  }

  @ApiOperation({
    summary: 'Get an author by surname',
  })
  @ApiResponse({
    status: 200,
    description: 'The found author',
    type: AuthorsEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/surname/:surname')
  async findBySurname(
    @Param('surname') surname: string,
  ): Promise<AuthorsEntity> {
    return await this.authorsService.getBySurname(surname);
  }

  @ApiOperation({
    summary: 'Update an author',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated author',
    type: AuthorsEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: AuthorsDto,
  ): Promise<AuthorsEntity> {
    return await this.authorsService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Delete an author',
  })
  @ApiResponse({
    status: 200,
    description: 'The deleted author',
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.authorsService.delete(id);
  }
}
