import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('authors')
export class AuthorsEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the author',
  })
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ApiProperty({ example: 'Joe', description: 'The name of the author' })
  @Column({ type: 'varchar', length: '42', unique: true })
  name: string;

  @ApiProperty({ example: 'Doe', description: 'The surname of the author' })
  @Column({ type: 'varchar', length: '42', unique: true })
  surname: string;
}
