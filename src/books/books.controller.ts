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
import { BooksService } from './books.service';
import { Roles } from '../roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { BooksEntity } from './books.entity';
import { BooksDto } from './dtos/books.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({
    summary: 'Create the book',
  })
  @ApiResponse({
    status: 201,
    description: 'The created book',
    type: BooksEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: BooksDto): Promise<BooksEntity> {
    return await this.booksService.create(dto);
  }

  @ApiOperation({
    summary: 'Get all books',
  })
  @ApiResponse({
    status: 200,
    description: 'The books',
    type: [BooksEntity],
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<BooksEntity[]> {
    return await this.booksService.getAll();
  }

  @ApiOperation({
    summary: 'Get an book by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The found book',
    type: BooksEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<BooksEntity> {
    return await this.booksService.getById(id);
  }

  @ApiOperation({
    summary: 'Get an book by title',
  })
  @ApiResponse({
    status: 200,
    description: 'The found book',
    type: BooksEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/title/:title')
  async findByTitle(@Param('title') title: string): Promise<BooksEntity[]> {
    return await this.booksService.getByTitle(title);
  }

  @ApiOperation({
    summary: 'Get an book by author',
  })
  @ApiResponse({
    status: 200,
    description: 'The found book',
    type: BooksEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/author/:author')
  async findByAuthor(@Param('author') author: string): Promise<BooksEntity[]> {
    return await this.booksService.getByAuthor(author);
  }

  @ApiOperation({
    summary: 'Update the book',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated book',
    type: BooksEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: BooksDto,
  ): Promise<BooksEntity> {
    return await this.booksService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Assign the author to the book',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated book',
    type: BooksEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/author/:surname')
  async assignAuthor(
    @Param('id') id: number,
    @Param('surname') surname: string,
  ): Promise<BooksEntity> {
    return await this.booksService.assignAuthor(id, surname);
  }

  @ApiOperation({
    summary: 'Remove the author from the book',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated book',
    type: BooksEntity,
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/author/remove')
  async removeAuthor(@Param('id') id: number): Promise<BooksEntity> {
    return await this.booksService.removeAuthor(id);
  }

  @ApiOperation({
    summary: 'Delete the book',
  })
  @ApiResponse({
    status: 200,
    description: 'The deleted book',
  })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.booksService.delete(id);
  }
}
