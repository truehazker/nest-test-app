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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { AuthorsEntity } from './authors.entity';
import { AuthorsDto } from './dtos/authors.dto';
import { Roles } from '../roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { RolesEnum } from '../roles/constants/roles.const';
import { BooksDto } from '../books/dtos/books.dto';
import { BooksEntity } from '../books/books.entity';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Create an author' })
  @ApiBody({ type: BooksDto })
  @ApiResponse({
    status: 201,
    description: 'Successful creation',
    type: AuthorsEntity,
  })
  @ApiResponse({
    status: 409,
    description: 'Author with this surname already exists',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: AuthorsDto): Promise<AuthorsEntity> {
    return await this.authorsService.create(dto);
  }

  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({
    status: 200,
    description: 'All authors',
    type: [AuthorsEntity],
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<AuthorsEntity[]> {
    return await this.authorsService.getAll();
  }

  @ApiOperation({ summary: 'Get an author by id' })
  @ApiResponse({
    status: 200,
    description: 'Found author',
    type: AuthorsEntity,
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<AuthorsEntity> {
    return await this.authorsService.getById(id);
  }

  @ApiOperation({ summary: 'Get an author by surname' })
  @ApiResponse({
    status: 200,
    description: 'Found author',
    type: AuthorsEntity,
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/surname/:surname')
  async findBySurname(
    @Param('surname') surname: string,
  ): Promise<AuthorsEntity> {
    return await this.authorsService.getBySurname(surname);
  }

  @ApiOperation({ summary: 'Update an author' })
  @ApiResponse({
    status: 200,
    description: 'Successful update',
    type: BooksEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Author not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: AuthorsDto,
  ): Promise<AuthorsEntity> {
    return await this.authorsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete an author' })
  @ApiResponse({
    status: 200,
    description: 'Successful deletion',
  })
  @ApiResponse({
    status: 404,
    description: 'Author not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.authorsService.delete(id);
  }
}
