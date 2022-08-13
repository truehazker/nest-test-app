export interface BorrowsDto {
  status: 'borrowed' | 'returned' | 'requested';
  bookId: number;
  userId: number;
}
