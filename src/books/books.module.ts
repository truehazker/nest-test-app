import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksEntity } from './books.entity';
import { AuthorsModule } from '../authors/authors.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [TypeOrmModule.forFeature([BooksEntity]), AuthorsModule, AuthModule], // Import AuthorsModule to use it inside BooksService
  exports: [BooksService], // Export BooksService to use BooksModule inside AuthorsModule
})
export class BooksModule {}
