import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from '../dtos/user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // LocalAuthGuard appends the user to the request object.
  @Post('login')
  async login(@Request() req) {
    // The usage of @Request() is to get the user from the request object
    // and pass it to the authService.login() method.
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() dto: UserDTO) {
    return await this.authService.register(dto);
  }
}
