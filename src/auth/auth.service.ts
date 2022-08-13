import { HttpException, Injectable } from '@nestjs/common';
import { UserDTO, UserPartialDTO } from '../dtos/user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: UserPartialDTO): Promise<{ access_token: string }> {
    const user = await this.usersService.getByEmail(dto.email);
    return await this.generateToken(user);
  }

  async register(dto: UserDTO) {
    const twin = await this.usersService.getByEmail(dto.email);
    if (twin) {
      throw new HttpException('Email already in use', 409);
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt); // hash password with salt
    dto.password = hash; // save hash in password field
    const user = await this.usersService.create(dto);
    return await this.generateToken(user);
  }

  async validateUser(email: string, password: string): Promise<UsersEntity> {
    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new HttpException('Invalid credentials', 401);
    }

    return user;
  }

  private async generateToken(
    user: UsersEntity,
  ): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
