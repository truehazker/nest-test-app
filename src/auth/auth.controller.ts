import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtResponse } from './dtos/auth.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersRegisterDto } from '../users/dtos/users-register.dto';
import { UsersLoginDto } from '../users/dtos/users-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: UsersLoginDto })
  @ApiResponse({
    status: 201,
    description: 'Successful login',
    type: JwtResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @UseGuards(LocalAuthGuard) // LocalAuthGuard appends the user to the request object.
  @Post('login')
  async login(@Request() req): Promise<JwtResponse> {
    // The usage of @Request() is to get the user from the request object
    // and pass it to the authService.login() method.
    return await this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Register' })
  @ApiResponse({
    status: 200,
    description: 'Successful registration',
    type: JwtResponse,
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  @Post('register')
  async register(@Body() dto: UsersRegisterDto): Promise<JwtResponse> {
    return await this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Successfully refreshed token',
    type: JwtResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) // The JwtAuthGuard is used to verify the token.
  @Post('refresh')
  async refresh(@Request() req): Promise<JwtResponse> {
    // @Request() is used to get Bearer token from the Headers of the request object.
    const decodedJwtAccessToken = await this.authService.decodeJwt(
      req.headers.authorization,
    );
    const userId = decodedJwtAccessToken.sub; // get the user id from the token

    return await this.authService.refresh(userId); // return the new token
  }
}
