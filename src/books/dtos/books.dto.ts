import { ApiProperty } from '@nestjs/swagger';

export class BooksDto {
  @ApiProperty({
    description: 'Book title',
    example: 'Lord of the rings',
  })
  title: string;
}
