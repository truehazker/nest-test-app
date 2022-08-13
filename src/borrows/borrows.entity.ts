import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
  @Column({ type: 'enum', enum: ['borrowed', 'returned', 'requested'] })
  status: string;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the book',
  })
  @Column({ type: 'integer' })
  bookId: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the user',
  })
  @Column({ type: 'integer' })
  userId: number;
}
