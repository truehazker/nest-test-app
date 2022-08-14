import { ApiProperty } from '@nestjs/swagger';

export class UsersLoginDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@mail.com',
  })
  email: string;
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  password: string;
}
