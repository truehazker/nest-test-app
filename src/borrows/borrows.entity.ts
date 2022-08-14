import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UsersEntity } from '../users/users.entity';
import { BooksEntity } from '../books/books.entity';

@Entity('borrows')
export class BorrowsEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the borrow',
  })
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ApiProperty({
    example: 'The lord of the rings',
    description: 'The title of the book',
  })
  @Column({
    type: 'varchar',
    enum: ['borrowed', 'returned', 'requested', 'rejected'],
  })
  status: 'borrowed' | 'returned' | 'requested' | 'rejected';

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  issuedAt: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  expectedAt: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  returnedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.borrows)
  user: UsersEntity;

  @ManyToOne(() => BooksEntity, (book) => book.borrows)
  book: BooksEntity;
}
