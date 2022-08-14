import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  email: string;
  sub: number;
  roles: string[];
}

export class JwtDecoded {
  email: string;
  sub: number;
  roles: string[];
  iat: number;
  exp: number;
}

export class JwtResponse {
  @ApiProperty({
    description: 'JWT token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  access_token: string;
}
