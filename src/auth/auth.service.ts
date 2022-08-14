import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../users/users.entity';
import { JwtDecoded, JwtPayload, JwtResponse } from './dtos/auth.dto';
import { UsersLoginDto } from '../users/dtos/users-login.dto';
import { UsersRegisterDto } from '../users/dtos/users-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: UsersLoginDto): Promise<JwtResponse> {
    const user = await this.usersService.getByEmail(dto.email);
    if (!user) throw new HttpException('Invalid credentials', 401);

    return await this.generateToken(user);
  }

  async register(dto: UsersRegisterDto): Promise<JwtResponse> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt); // hash password with salt
    dto.password = hash; // save hash in password field
    const user = await this.usersService.create(dto);
    return await this.generateToken(user);
  }

  async validateUser(email: string, password: string): Promise<UsersEntity> {
    const user = await this.usersService.getByEmail(email);
    if (!user) throw new HttpException('Invalid credentials', 401);

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching)
      throw new HttpException('Invalid credentials', 401);

    return user;
  }

  private async generateToken(user: UsersEntity): Promise<JwtResponse> {
    const mappedRoles = user.roles.map((role) => role.title); // Convert from RolesEntity[] to string[]
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      roles: mappedRoles,
    };
    const response: JwtResponse = {
      access_token: this.jwtService.sign(payload),
    };
    return response;
  }

  // Refreshes the token if it is not expired.
  async refresh(userId: number): Promise<JwtResponse> {
    const user = await this.usersService.getById(userId);
    if (!user) throw new HttpException('User not found', 404);

    return await this.generateToken(user);
  }

  async decodeJwt(jwtRaw: string): Promise<JwtDecoded> {
    // TODO: Refactor this method using decorators
    const jwtToken = jwtRaw.replace('Bearer ', '').trim();
    const decodedJwtAccessToken: JwtDecoded = this.jwtService.decode(
      jwtToken,
    ) as JwtDecoded;

    return decodedJwtAccessToken;
  }
}
