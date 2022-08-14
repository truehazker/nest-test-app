import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AuthorsEntity } from '../authors/authors.entity';
import { BorrowsEntity } from '../borrows/borrows.entity';

@Entity('books')
export class BooksEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the book',
    type: Number,
  })
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ApiProperty({
    example: 'The lord of the rings',
    description: 'The title of the book',
    type: String,
  })
  @Column({ type: 'varchar', length: '42', unique: true })
  title: string;

  @ManyToOne(() => AuthorsEntity, (author) => author.books, {})
  author: AuthorsEntity;

  @OneToMany(() => BorrowsEntity, (borrow) => borrow.book, {
    cascade: true,
  })
  borrows: BorrowsEntity[];
}
