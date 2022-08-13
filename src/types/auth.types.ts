export type JwtPayload = {
  email: string;
  sub: number;
  iat: number;
  exp: number;
};

export type JwtResponse = {
  access_token: string;
};
