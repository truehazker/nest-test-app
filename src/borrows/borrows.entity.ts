import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UsersEntity } from '../users/users.entity';
import { BooksEntity } from '../books/books.entity';
import { BorrowsStatusEnum } from './constants/borrows-status.const';

@Entity('borrows')
export class BorrowsEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the borrow',
    type: Number,
  })
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ApiProperty({
    example: 'The lord of the rings',
    description: 'The title of the book',
    type: BorrowsStatusEnum,
  })
  @Column({
    type: 'varchar',
    enum: BorrowsStatusEnum,
  })
  status: BorrowsStatusEnum;

  @ApiProperty({
    example: '01.01.2020',
    description: 'The date of the creation',
    type: Date,
  })
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty({
    example: '01.01.2020',
    description: 'The date of the issue',
    type: Date,
  })
  @Column({
    type: 'datetime',
    nullable: true,
  })
  issuedAt: Date;

  @ApiProperty({
    example: '01.01.2020',
    description: 'The date of the expected return',
    type: Date,
  })
  @Column({
    type: 'datetime',
    nullable: true,
  })
  expectedAt: Date;

  @ApiProperty({
    example: '01.01.2020',
    description: 'The date of the real return',
    type: Date,
  })
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
