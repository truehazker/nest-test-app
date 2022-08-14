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

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() dto: BooksDto): Promise<BooksEntity> {
    return await this.booksService.create(dto);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<BooksEntity[]> {
    return await this.booksService.getAll();
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<BooksEntity> {
    return await this.booksService.getById(id);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/title/:title')
  async findByTitle(@Param('title') title: string): Promise<BooksEntity[]> {
    return await this.booksService.getByTitle(title);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/author/:author')
  async findByAuthor(@Param('author') author: string): Promise<BooksEntity[]> {
    return await this.booksService.getByAuthor(author);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: BooksDto,
  ): Promise<BooksEntity> {
    return await this.booksService.update(id, dto);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/author/:surname')
  async assignAuthor(
    @Param('id') id: number,
    @Param('surname') surname: string,
  ): Promise<BooksEntity> {
    return await this.booksService.assignAuthor(id, surname);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/author/remove')
  async removeAuthor(@Param('id') id: number): Promise<BooksEntity> {
    return await this.booksService.removeAuthor(id);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.booksService.delete(id);
  }
}
