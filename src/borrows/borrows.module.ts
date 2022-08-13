import { Module } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { BorrowsController } from './borrows.controller';

@Module({
  providers: [BorrowsService],
  controllers: [BorrowsController],
})
export class BorrowsModule {}
