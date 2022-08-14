import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsEntity } from './authors.entity';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [TypeOrmModule.forFeature([AuthorsEntity])], // Import AuthorsEntity to use it inside AuthorsService
  exports: [AuthorsService], // Export AuthorsService to use AuthorsModule inside BooksModule
})
export class AuthorsModule {}
