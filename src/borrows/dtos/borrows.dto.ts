import { BooksDto } from '../../books/dtos/books.dto';
import { UsersDto } from '../../users/dtos/users.dto';
import { BorrowsStatusEnum } from '../constants/borrows-status.const';

export class BorrowsDto {
  status: BorrowsStatusEnum;
  addedAt: number;
  updatedAt: number;
  book: BooksDto;
  user: UsersDto;
}

export class BorrowsSoftDto {
  status?: BorrowsStatusEnum;
  addedAt?: number;
  updatedAt?: number;
  book?: BooksDto;
  user?: UsersDto;
}
