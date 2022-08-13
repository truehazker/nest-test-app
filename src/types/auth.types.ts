export type JwtPayload = {
  email: string;
  sub: number;
  roles: string[];
};

export type JwtDecoded = {
  email: string;
  sub: number;
  roles: string[];
  iat: number;
  exp: number;
};

export type JwtResponse = {
  access_token: string;
};
