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
  access_token: string;
}
