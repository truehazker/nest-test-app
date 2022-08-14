import { ApiProperty } from '@nestjs/swagger';

export class AuthorsDto {
  @ApiProperty({
    description: 'Author name',
    example: 'Joe',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Author surname',
    example: 'Doe',
    type: String,
  })
  surname: string;
}
