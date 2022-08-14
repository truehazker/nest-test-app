import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BooksEntity } from '../books/books.entity';

@Entity('authors')
export class AuthorsEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the author',
  })
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ApiProperty({ example: 'Joe', description: 'The name of the author' })
  @Column({ type: 'varchar', length: '50' })
  name: string;

  @ApiProperty({ example: 'Doe', description: 'The surname of the author' })
  @Column({ type: 'varchar', length: '50' })
  surname: string;

  @OneToMany(() => BooksEntity, (book) => book.author)
  books: BooksEntity[];
}
