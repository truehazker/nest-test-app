import { BooksDto } from '../../books/dtos/books.dto';
import { UsersDto } from '../../users/dtos/users.dto';

export interface BorrowsDto {
  status: 'borrowed' | 'returned' | 'requested' | 'rejected';
  addedAt: number;
  updatedAt: number;
  book: BooksDto;
  user: UsersDto;
}

export interface BorrowsSoftDto {
  status?: 'borrowed' | 'returned' | 'requested' | 'rejected';
  addedAt?: number;
  updatedAt?: number;
  book?: BooksDto;
  user?: UsersDto;
}
