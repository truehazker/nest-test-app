import { ApiProperty } from '@nestjs/swagger';

export class UsersUpdateDto {
  @ApiProperty({
    description: 'User name',
    example: 'Joe',
    type: String,
  })
  name?: string;
  @ApiProperty({
    description: 'User surname',
    example: 'Doe',
    type: String,
  })
  surname?: string;
  @ApiProperty({
    description: 'User birth date',
    example: '01.01.2000',
    type: Date,
  })
  birthdate?: Date;
  @ApiProperty({
    description: 'User passport',
    example: '123456789',
    type: Number,
  })
  passport?: number;
  @ApiProperty({
    description: 'User email',
    example: 'user@mail.com',
    type: String,
  })
  email?: string;
}
