import { Module } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { BorrowsController } from './borrows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowsEntity } from './borrows.entity';
import { BooksModule } from '../books/books.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [BorrowsService],
  controllers: [BorrowsController],
  imports: [
    TypeOrmModule.forFeature([BorrowsEntity]),
    BooksModule,
    UsersModule,
    AuthModule,
  ],
})
export class BorrowsModule {}
