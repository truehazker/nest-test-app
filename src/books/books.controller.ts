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
import { BooksService } from './books.service';
import { Roles } from '../roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { BooksEntity } from './books.entity';
import { BooksDto } from './dtos/books.dto';
import { RolesEnum } from '../roles/constants/roles.const';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({ summary: 'Create a book' })
  @ApiBody({ type: BooksDto })
  @ApiResponse({
    status: 201,
    description: 'Successful creation',
    type: BooksEntity,
  })
  @ApiResponse({
    status: 409,
    description: 'Book with this title already exists',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: BooksDto): Promise<BooksEntity> {
    return await this.booksService.create(dto);
  }

  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({
    status: 200,
    description: 'All books',
    type: [BooksEntity],
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<BooksEntity[]> {
    return await this.booksService.getAll();
  }

  @ApiOperation({ summary: 'Get a book by id' })
  @ApiResponse({
    status: 200,
    description: 'Found book',
    type: BooksEntity,
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<BooksEntity> {
    return await this.booksService.getById(id);
  }

  @ApiOperation({ summary: 'Get a book by title' })
  @ApiResponse({
    status: 200,
    description: 'Found book',
    type: BooksEntity,
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/title/:title')
  async findByTitle(@Param('title') title: string): Promise<BooksEntity[]> {
    return await this.booksService.getByTitle(title);
  }

  @ApiOperation({ summary: 'Get all books by author' })
  @ApiResponse({
    status: 200,
    description: 'Found books',
    type: [BooksEntity],
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/author/:surname')
  async findByAuthor(@Param('surname') author: string): Promise<BooksEntity[]> {
    return await this.booksService.getByAuthor(author);
  }

  @ApiOperation({ summary: 'Update a book' })
  @ApiResponse({
    status: 200,
    description: 'Successful update',
    type: BooksEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: BooksDto,
  ): Promise<BooksEntity> {
    return await this.booksService.update(id, dto);
  }

  @ApiOperation({ summary: 'Assign author to a book' })
  @ApiResponse({
    status: 200,
    description: 'Author assigned',
    type: BooksEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  @ApiResponse({
    status: 404,
    description: 'Author not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/author/:surname')
  async assignAuthor(
    @Param('id') id: number,
    @Param('surname') surname: string,
  ): Promise<BooksEntity> {
    return await this.booksService.assignAuthor(id, surname);
  }

  @ApiOperation({ summary: 'Remove author from a book' })
  @ApiResponse({
    status: 200,
    description: 'Author removed',
    type: BooksEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id/author')
  async removeAuthor(@Param('id') id: number): Promise<BooksEntity> {
    return await this.booksService.removeAuthor(id);
  }

  @ApiOperation({ summary: 'Delete a book' })
  @ApiResponse({
    status: 200,
    description: 'Successful deletion',
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.booksService.delete(id);
  }
}
