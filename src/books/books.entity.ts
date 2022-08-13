import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('books')
export class BooksEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the book',
  })
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ApiProperty({
    example: 'The lord of the rings',
    description: 'The title of the book',
  })
  @Column({ type: 'varchar', length: '42', unique: true })
  title: string;
}
