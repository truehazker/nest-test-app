import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { RolesService } from '../roles/roles.service';
import { UserDTO } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private roleService: RolesService,
  ) {}

  async getAll(): Promise<UserDTO[]> {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async create(users: UserDTO): Promise<UserDTO> {
    const _ = await this.roleService.getByTitle('USER');
    users.roles = [_];
    return await this.userRepository.save(users);
  }

  async getByEmail(email: string): Promise<UserDTO> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
