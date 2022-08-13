import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersDto } from '../users/dtos/users.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtDecoded } from './types/auth.type';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard) // LocalAuthGuard appends the user to the request object.
  @Post('login')
  async login(@Request() req) {
    // The usage of @Request() is to get the user from the request object
    // and pass it to the authService.login() method.
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() dto: UsersDto) {
    return await this.authService.register(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Request() body) {
    // @Request() is used to get Bearer token from the Headers of the request object.
    const jwtToken = body.headers.authorization.replace('Bearer ', '').trim(); // get the token from the headers and remove the Bearer prefix
    const decodedJwtAccessToken: JwtDecoded = this.jwtService.decode(
      jwtToken,
    ) as JwtDecoded; // decode the token
    const userId = decodedJwtAccessToken.sub; // get the user id from the token

    return await this.authService.refresh(userId); // return the new token
  }
}
