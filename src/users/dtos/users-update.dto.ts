import { ApiProperty } from '@nestjs/swagger';

export class UsersUpdateDto {
  @ApiProperty({
    description: 'User name',
    example: 'Joe',
  })
  name?: string;
  @ApiProperty({
    description: 'User surname',
    example: 'Doe',
  })
  surname?: string;
  @ApiProperty({
    description: 'User birth date',
    example: '01.01.2000',
  })
  birthdate?: Date;
  @ApiProperty({
    description: 'User passport',
    example: '123456789',
  })
  passport?: number;
  @ApiProperty({
    description: 'User email',
    example: 'user@mail.com',
  })
  email?: string;
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  password?: string;
}
